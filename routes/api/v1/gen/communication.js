const express = require('express');
const { Together} = require('together-ai');
const router = express.Router();

const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY,
});

router.post('/translation', async(req, res) => {

    const {context, reqLanguage, resLanguage, textToBeTranslated} = req.body;

    const system_prompt = 
    `You are a multilingual language translating expert.
    In the following prompt you will be provided with the 
    text that needs to be translated from one language to 
    the other, following context which will also be provided
    in the following prompts. Do not hallucinate.`;


    const user_prompt = 
    `You are tasked to translate the following text from 
    ${reqLanguage} language to ${resLanguage}. The context 
    of the provided text is ${context}
    
    Text that you need to translate ${textToBeTranslated}
    Respond only with JSON object containing the translated text.`;

    try {
        const apiResponse = await together.chat.completions.create({
            messages: [
                {role: "system", content: system_prompt},
                {role: "user", content: user_prompt}
            ],
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            temperature: 0.7,
        });

        const responseMessage = apiResponse.choices[0].message.content;

        const jsonMatch = responseMessage.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No valid JSON found in the response');
        }

        const jsonString = jsonMatch[0];
        const responseInJson = JSON.parse(jsonString);

        res.status(200).json(responseInJson);
    } catch (error) {
        console.error('Error: ', error.responseMessage?.data || error.message);
        res.status(500).json({error: 'Failed to generate translated response'});
    }
})

module.exports = router;