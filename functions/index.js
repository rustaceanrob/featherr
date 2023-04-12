const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const admin = require('firebase-admin');
admin.initializeApp();

// system messages

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

const tldrSystemMessage = "You are an assistant that provides detailed summaries of text. " +    
                            "You follow this set of guidelines when summarizing text: " + 
                            "- Provide as much detail of the text as asked by the user. " + 
                            "- Summarize the text in one response only. " + 
                            "- Limit all additional prose."

const mathSystemMessage = "You are a mathematics assistant that provides detailed solutions for problems a user provides. " +
                            "You follow this set of guidelines when solving their problem: " +
                            "- Answer the question in one response only. " +
                            "- Show all steps with precise detail. " + 
                            // "- Quickly remark on any theorems, equations, constants, or facts used to solve the problem. " + 
                            // "- Provide all necessary calculations or proofs required to solve the problem. " + 
                            "- Provide the solution in LaTeX format. Use '$' for the inline LaTeX delimiter and '$$' for the block LaTeX delimiter. " + 
                            "- Do not add any additional prose."

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
            let limit = 1000
            let credits = 10
            const customersRef = admin.firestore().collection('customers'); // costly?
            const querySnapshot = await customersRef.where('stripeId', '==', stripeId).get();
            if (querySnapshot.empty) {
                res.status(404).send('Customer not found. Data out of sync?')
            } else {
                const uid = querySnapshot.docs[0].id;
                const usersRef = admin.firestore().collection("users").doc(uid)

                usersRef.get().then((docSnapshot) => {
                    const currentCredits = docSnapshot.data().credits
                    if (currentCredits > limit)  {
                        credits = 0 // do not add more credits when greater than 1000
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

exports.decrementCredits = functions.https.onCall(async (data, context) => {
    checkAuthPrecondition(context)
    const uid = context.auth.uid;
    const userRef = admin.firestore().collection('users').doc(uid);
    const customerRef = admin.firestore().collection('customers').doc(uid).collection('subscriptions');
  
    let credits = 0;
  
    // Get all active subscriptions
    const activeSubscriptions = await customerRef.where('status', '==', 'active').get();
  
    // If there are active subscriptions, don't subtract credits
    if (!activeSubscriptions.empty) {
      const userDoc = await userRef.get();
      credits = userDoc.data().credits;
    } else {
      // Subtract credits if there are no active subscriptions
      const userDoc = await userRef.get();
      credits = userDoc.data().credits - data.cost;
      await userRef.update({ credits: credits });
    }
  
    return credits;
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
    const prompt = data.prompt
    const solution = data.solution
    const feedback = data.indicator
    const newDoc = admin.firestore().collection("feedback").doc().set({"prompt": prompt, "solution":solution, "feedback": feedback})
})

//Open AI Calls
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
        fullPrompt = data.prompt + ". Provide code examples."
    } else {
        fullPrompt = data.prompt + " Provide code examples." 
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
    let lastChar = data.prompt[data.prompt.length - 1]
    let fullPrompt
    if (!(lastChar === '.' || lastChar === "?")) {
        fullPrompt = data.prompt + "."
    } else {
        fullPrompt = data.prompt
    }
    const input = fullPrompt
    functions.logger.log(input)
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": mathSystemMessage}, 
                   {"role": "user", "content": "List the steps to solve the following."},
                   {"role": "user", "content": "Provide a solution when possible."},
                   {"role": "user", "content": input}], 
        temperature: 0 //0.0005          
    }).then((response) => {
        return response.data.choices[0].message;
    })
    return aiRes
})
