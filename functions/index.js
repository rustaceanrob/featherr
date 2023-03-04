const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");


exports.getChapterByTitleAndAuthor = functions.https.onCall((data, context) => {
    const prompt = `Please summarize Chapter ${data.chapter} of ${data.title} by ${data.author}. `; 
    let specification;
    if (data.subject === 'technical') {
        specification = 'Can you please give the technical details of the important points.';
    } else {
        specification = '';
    }
    const closing = 'If you cannot find the book specified earlier, please say "I do not have any records of that book."'
    const input = prompt + specification + closing; 
    const configuration = new Configuration({
        apiKey: process.env.AI,
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
    const input = beginning + data.prompt;
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

exports.getCitation = functions.https.onCall((data, context) => {
    const beginning = `I need an ${data.citeType} version ${data.version} citation for this ${data.mediaTpye}: `
    let media = ""
    if (data.author !== '') {
        media = `${data.title} by ${data.author}. `
    } else {
        media = data.title + ". "
    }
    let publishYear = ''
    if (data.pubYear !== '') {
        publishYear = `The work was published in ${data.pubYear}.`
    }
    let pageRange = ''
    if (data.pageRange !== '') {
        pageRange = ` I used pages ${data.from} to ${data.to}.`
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

