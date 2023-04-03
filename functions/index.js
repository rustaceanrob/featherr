const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const admin = require('firebase-admin');
admin.initializeApp();

// system messages
const askSystemMessage = "You are an assistant that answers questions for users. " +    
                         "You follow this set of guidelines when answering user questions: " + 
                         "- Answer the question in as much detail as required. " + 
                         "- Answer the question in one response only. " + 
                         "- Limit all excess prose. " + 
                         "- Do not respond to derogatory questions."

// const citationSystemMessage = "You are an assistant that provides citations for media content. " + 
//                               "You follow these citation guidelines: " + 
//                               "- Provide only the citation with no additional prose. " + 
//                               "- Do not add an any information to the citation if you are uncertain of its validity. " +
//                               "- Adhere to the citation type and versioning requested by the user."

const codeSystemMessage = "You are a programming assistant that produces programs for users. " + 
                          "You follow these guidelines when producing the code: " +
                          "- Provide only the code with no additional prose. " + 
                          "- Provide any necessary comments in the code only. " + 
                          "- Program in the language or framework provided by the user. " + 
                          "- If there are multiple solutions to the question, you provide the solution you see fit."

const debugSystemMessage = "You are a programming assistant that helps debug user errors in a readable way. " +
                           "You follow these guidelines when debugging the errors: " +
                           "- Provide only explanation and debug steps for the error with no additional prose. " +
                           "- If there are multiple ways to debug the error. You provide the simplest one."

const summarySystemMessage = "You are an assistant that provides detailed summaries of books for users. " +    
                            "You follow this set of guidelines when summarizing books and chapters of books: " + 
                            "- Provide as much detail of the book or chapter as asked by the user. " + 
                            "- Summarize the book or chapter in one response only. " + 
                            "- Limit all additional prose."

const tldrSystemMessage = "You are an assistant that provides detailed summaries of text. " +    
                            "You follow this set of guidelines when summarizing text: " + 
                            "- Provide as much detail of the text as asked by the user. " + 
                            "- Summarize the text in one response only. " + 
                            "- Limit all additional prose."

const mathSystemMessage = "You are a mathematics assistant that provides detailed solutions for problems a user provides. " +
                            "You follow this set of guidelines when solving their problem: " +
                            "- Answer the question in one response only. " +
                            "- List all the steps required to solve the problem. " + 
                            "- Quickly remark on any theorems, equations, constants, or facts used to solve the problem. " + 
                            "- Provide all necessary calculations or proofs required to solve the problem. " + 
                            "- Provide the solution in LaTeX format. Use '$' for the inline LaTeX delimiter and '$$' for the block LaTeX delimiter. " + //
                            "- Do not add any additional prose."

const writingSystemMessage = "You are a writing assistant. You follow this set of guidelines when interacting with users: " +
                            "- Write what was asked of you in as much detail as required. " + 
                            "- Produce one response only. " + 
                            "- Limit all excess prose. " + 
                            "- Do not respond to derogatory requests."

// utility functions, admin/DB 
const costPrecondition = (cost) => {
    if (cost < 1) {
        throw new functions.https.HttpsError('failed-precondition', 'Invalid credit cost.');
    }
} 

const checkCreditPrecondition = (id, cost) => {
    const usersRef = admin.firestore().collection("users").doc(id)
    const credits = usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            const currentCredits = docSnapshot.data().credits
            if (currentCredits - cost < 0) {
                throw new functions.https.HttpsError('failed-precondition', 'Insuficient credits.');
            }
        } else {
            throw new functions.https.HttpsError('failed-precondition', 'Insuficient credits.');
        }
    });
}

const checkAuthPrecondition = (context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
}

//payments and credits
exports.resetCredits = functions.pubsub.schedule('1 * 1 * *').timeZone('America/New_York').onRun((context) => {
    const usersRef = admin.firestore().collection('users');
    const batch = admin.firestore().batch();
    return usersRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.credits < 25) {
          const userRef = usersRef.doc(doc.id);
          batch.set(userRef, { "credits": 25 }); //or update
        }
      });
      return batch.commit();
    });
  });

exports.updateCreditsOnSuccess = functions.https.onRequest(async (req, res) => {
    const apiKey = functions.config().stripe.restrictedkey
    const whSec = functions.config().stripe.signer
    const stripe = require('stripe')(apiKey);
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, whSec);
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const stripeId = paymentIntent.customer;
            let limit = 2000
            let statementDescription = paymentIntent.statement_descriptor;
            if (!statementDescription) {
                limit = 10000
                if (paymentIntent.amount_received === 1000) {
                    statementDescription = 'FEATHERR SMALL CRED'
                } else if (paymentIntent.amount_received === 2000) {
                    statementDescription = 'FEATHERR LARGE CRED'
                } else {
                    statementDescription = ''
                }
            }
            const customersRef = admin.firestore().collection('customers'); // costly?
            const querySnapshot = await customersRef.where('stripeId', '==', stripeId).get();
            if (querySnapshot.empty) {
                res.status(404).send('Customer not found. Data out of sync?')
            } else {
                const uid = querySnapshot.docs[0].id;
                const usersRef = admin.firestore().collection("users").doc(uid)
                let credits = 0;
                switch (statementDescription) {
                    case 'FEATHERR LITE PAYMENT':
                    credits = 200;
                    break;
                    case 'FEATHERR BOLD PAYMENT':
                    credits = 450;
                    break;
                    case 'FEATHERR PRO PAYMENT':
                        limit = 10000;
                        credits = 1200;
                    break;
                    case 'FEATHERR SMALL CRED':
                    credits = 500;
                    break;
                    case 'FEATHERR LARGE CRED':
                    credits = 1000;
                    break;
                    default:
                    // Handle invalid payment types
                    break;
                }
                usersRef.get().then((docSnapshot) => {
                    const currentCredits = docSnapshot.data().credits
                    if (currentCredits > limit)  {
                        credits = 0 // do not add more credits when greater than 2000
                    }
                    usersRef.set({"credits": currentCredits + credits})
                })
            }     
        }
    } catch(error) {
        functions.logger.log("Failure to verify Webhook signature or find customer.")
        functions.logger.log(error)
        return res.sendStatus(400)
    }
    res.sendStatus(200);
  });

exports.decrementCredits = functions.https.onCall((data, context) => {
    checkAuthPrecondition(context)
    const usersRef = admin.firestore().collection("users").doc(context.auth.uid)
    const credits = usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            const currentCredits = docSnapshot.data().credits
            const newCredits = usersRef.set({"credits": currentCredits - data.cost})
            return currentCredits - data.cost
        } else {
            throw new functions.https.HttpsError('failed-condition', 'The function must be called ' +
                                                                            'by a registered user.');
        }
    });
    return credits
})

exports.doesNeedUser = functions.https.onCall((data, context) => {
    checkAuthPrecondition(context)
    const usersRef = admin.firestore().collection("users").doc(context.auth.uid)
    const info = usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            const credits = docSnapshot.data().credits
            return {credits: credits, page: ""}
        } else {
            const setCredits = usersRef.set({"credits": 150})
            return {credits: 150,  page: "About"}  // after credits are set this is necessarily true
        }
    });
    return info
})


exports.giveFeedback = functions.https.onCall((data, context) => {
    checkAuthPrecondition(context)
    const feedback = data.indicator
    const newDoc = admin.firestore().collection("feedback").doc().set({"feedback": feedback})
})

// Open AI calls
exports.getChapterByTitleAndAuthor = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    costPrecondition(data.cost)
    checkAuthPrecondition(context)
    checkCreditPrecondition(context.auth.uid, data.cost)
    let prompt;
    if (data.chapter === "") {
        prompt = `Please summarize ${data.title} by ${data.author}.`; 
    } else {
        prompt = `Please summarize Chapter ${data.chapter} of ${data.title} by ${data.author}.`; 
    }
    let specification;
    if (data.subject === 'technical') {
        specification = ' Can you please give the technical details of the important points.';
    } else if (data.subject === 'character') {
        specification = ' Can you please give the details of character development.';
    } else if (data.subject === 'growth') {
        specification = ' Can you please give the main takeaways and action items.';
    } else {
        specification = ' Can you please give as much detail as possible.';
    }
    const input = prompt + specification;
    const promptLength = data.promptLength;
    const temperature = data.temperature;
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": summarySystemMessage}, 
                   {"role": "user", "content": input}], 
        temperature: temperature,
        max_tokens: promptLength,
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})

exports.getCodeFromGPT = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    costPrecondition(data.cost)
    checkAuthPrecondition(context)
    checkCreditPrecondition(context.auth.uid, data.cost)
    let beginning;
    if (data.language !== '') {
        beginning = `I am writing code in ${data.language}. `
    } else {
        beginning = ""
    }
    let lastChar = data.prompt[data.prompt.length - 1]
    let fullPrompt;
    if (!(lastChar === '.' || lastChar === "?")) {
        fullPrompt = data.prompt + "?"
    } else {
        fullPrompt = data.prompt
    } 
    let comments;
    if (data.comments === "None") {
        comments = " Do not add additional comments."
    }
    const input = beginning + fullPrompt + comments;
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": codeSystemMessage}, 
                   {"role": "user", "content": input}],
        max_tokens: 2000, 
        temperature: 0.1,
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})

exports.getDebug = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    costPrecondition(data.cost)
    checkAuthPrecondition(context)
    checkCreditPrecondition(context.auth.uid, data.cost)
    
    const beginning= 'I am having a problem with my code: ';
    const input = beginning + '\n' + data.codePrompt + '\n' + 'How do I fix it?';
    functions.logger.info("input: " + input);
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": debugSystemMessage}, 
                   {"role": "user", "content": input}],
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})

//change back to davinci
exports.getCitation = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    costPrecondition(data.cost)
    checkAuthPrecondition(context)
    checkCreditPrecondition(context.auth.uid, data.cost)
    let beginning;
    if (data.mediaType === "") {
        beginning = `I need an ${data.citeType} version ${data.version} citation for this: `
    } else {
        beginning = `I need an ${data.citeType} version ${data.version} citation for this ${data.mediaType}: `
    }
    let media = ""
    if (data.author !== '') {
        media = `${data.title} by ${data.author}. `
    } else {
        media = data.title + ". "
    }
    let publisher = ""
    if (data.publisher !== '') {
        publisher = `The work was published by ${data.publisher}. `
    }
    let publishYear = ''
    if (data.pubYear !== '') {
        publishYear = `The work was published in ${data.pubYear}. `
    }
    let pageRange = ''
    if (data.from !== '') {
        pageRange = `I used pages ${data.from} to ${data.to}. `
    }
    const input = beginning + media + publisher + publishYear + pageRange;
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 200,
        temperature: 0.1,
        n: 1,
    }).then((response) => {
        return response.data.choices[0];
    })
    return aiRes
})

exports.getAnswer = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    costPrecondition(data.cost)
    checkAuthPrecondition(context)
    checkCreditPrecondition(context.auth.uid, data.cost)
    let prompt;
    if (data.topic === "Book") {
        prompt = `I am reading ${data.title}. `
    } else {
        prompt = `I am reading about ${data.topic}. `
    }
    const input = prompt + data.question + data.detail;
    const creativity = data.temperature;
    const promptLength = data.promptLength;
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const mod = openai.createModeration({
        input: input,
    }).then((response) => {
        if (response.data.results[0].flagged) {
            throw new functions.https.HttpsError('failed-precondition', 'Moderation flag');
        }
    })
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": askSystemMessage}, 
                   {"role": "user", "content": input}], 
        temperature: creativity,
        max_tokens: promptLength,
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})

exports.getTLDR = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    costPrecondition(data.cost)
    checkAuthPrecondition(context)
    checkCreditPrecondition(context.auth.uid, data.cost)
    let summaryStyling = ""
    if (data.style === "Notes") {
        summaryStyling = " Please return the summary in a note-taking format with bullet points."
    }
    const input = data.prompt + '\n\nTl;dr' + summaryStyling;
    const creativity = data.temperature;
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": tldrSystemMessage}, 
                   {"role": "user", "content": input}], 
        temperature: creativity,
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})

exports.getMath = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    costPrecondition(data.cost)
    checkAuthPrecondition(context)
    checkCreditPrecondition(context.auth.uid, data.cost)
    const input = data.prompt
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": mathSystemMessage}, 
                   {"role": "user", "content": "List the steps to solve the following."},
                   {"role": "user", "content": input}], 
        temperature: 0.0005           
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})

exports.getWriting = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    costPrecondition(data.cost)
    checkAuthPrecondition(context)
    checkCreditPrecondition(context.auth.uid, data.cost)
    let userContext;
    if (data.userContext === "") {
        userContext = "";
    } else {
        userContext = "Here is some contextual information before I ask my question: " + data.userContext + "\n";
    }
    const input = userContext + data.prompt
    const temperature = data.creativity
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const mod = openai.createModeration({
        input: input,
    }).then((response) => {
        if (response.data.results[0].flagged) {
            throw new functions.https.HttpsError('failed-precondition', 'Moderation flag');
        }
    })
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": writingSystemMessage}, 
                   {"role": "user", "content": input}], 
        temperature: temperature,
        max_tokens: 2500,           
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})