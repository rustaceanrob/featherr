const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const admin = require('firebase-admin');
admin.initializeApp();
// Admin/DB
exports.doesNeedUser = functions.https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const usersRef = admin.firestore().collection("users").doc(context.auth.uid)
    const credits = usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            return docSnapshot.data().credits
        } else {
            const setCredits = usersRef.set({"credits": 100})
            return 100 // after credits are set this is necessarily true
        }
    });
    return credits
})

// Open AI calls

exports.getChapterByTitleAndAuthor = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
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
    functions.logger.info("input: " + input); 
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: promptLength,
        temperature: temperature,
        n: 1
    }).then((response) => {
        functions.logger.info(response.data.choices, {structuredData: true});
        return response.data.choices;
    }).catch((error) => {
        return error
    })
    return aiRes
})

exports.getCodeFromGPT = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
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
    const input = beginning + fullPrompt;
    functions.logger.info("input: " + input);
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 900,
        temperature: 0.1,
        n: 1,
    }).then((response) => {
        functions.logger.info(response.data.choices, {structuredData: true});
        return response.data.choices;
    })
    return aiRes
})

exports.getDebug = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const beginning= 'I am having a problem with my code: ';
    const input = beginning + '\n' + data.codePrompt + '\n' + 'How do I fix it?';
    functions.logger.info("input: " + input);
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 300,
        temperature: 0.1,
        n: 1,
    }).then((response) => {
        functions.logger.info(response.data.choices, {structuredData: true});
        return response.data.choices;
    })
    return aiRes
})

exports.getCitation = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
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
    let publishYear = ''
    if (data.pubYear !== '') {
        publishYear = `The work was published in ${data.pubYear}. `
    }
    let pageRange = ''
    if (data.from !== '') {
        pageRange = `I used pages ${data.from} to ${data.to}. `
    }
    const input = beginning + media + publishYear + pageRange;
    functions.logger.info("input: " + input);
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
        functions.logger.info(response.data.choices, {structuredData: true});
        return response.data.choices;
    })
    return aiRes
})

exports.getAnswer = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
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
    const aiRes = openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: promptLength,
        temperature: creativity,
        n: 1
    }).then((response) => {
        functions.logger.info(response.data.choices, {structuredData: true});
        return response.data.choices;
    })
    return aiRes
})

exports.getTLDR = functions.runWith({ secrets: ["AI"] }).https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }
    const input = data.prompt + '\n\nTl;dr';
    const creativity = data.temperature;
    const promptLength = data.tldrLength;
    const configuration = new Configuration({
        apiKey: process.env.AI,
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: promptLength,
        temperature: creativity,
        n: 1
    }).then((response) => {
        functions.logger.info(response.data.choices, {structuredData: true});
        return response.data.choices;
    })
    return aiRes
})

