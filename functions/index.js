const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.getChapterByTitleAndAuthor = functions.https.onCall((data, context) => {
    const prompt = `Please summarize Chapter ${data.chapter} of ${data.title} by ${data.author}.`;
    let specification;
    if (data.subject === 'technical') {
        specification = 'Can you please give the technical details of the important points of the chapter.';
    } else {
        specification = '';
    }
    const closing = 'If you cannot find the book specified earlier, please say "I do not have any records of that book."'
    const input = prompt + specification + closing; 
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 300,
        temperature: 0.3,
        n: 1,
    }).then((response) => {
        functions.logger.info(response.data.choices, {structuredData: true});
        return response.data.choices;
    })
    return aiRes
})

exports.getCodeFromGPT = functions.https.onCall((data, context) => {
    let beginning;
    if (data.language !== '') {
        beginning = `I am writing code in ${data.language}.`
    } else {
        beginning = ""
    }
    const closing = 'If you cannot program what I have asked, please say "I cannot program that."'
    const input = beginning + data.prompt + closing;
    functions.logger.info("input: " + input);
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    const aiRes = openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 700,
        temperature: 0.1,
        n: 1,
    }).then((response) => {
        functions.logger.info(response.data.choices, {structuredData: true});
        return response.data.choices;
    })
    return aiRes
})