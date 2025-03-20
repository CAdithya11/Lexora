import { GoogleGenerativeAI } from '@google/generative-ai';

export default function PersonaMatcher() {
    const apiKey = process.env.AIzaSyCQUQ9sYtjSjasfpps4bK00hUkqdMwSDV0;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp-image-generation",
        systemInstruction: "you are the career guidance AI your name is Mentor AI your job is matching undergraduate students with their career persona according to their skills and aspirations",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    async function run() {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage("Say hi 10 times");
        console.log(result.response.text());
    }

    run();
}
