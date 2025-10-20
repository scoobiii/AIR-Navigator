import { GoogleGenAI, Type } from "@google/genai";
import type { ServiceEvent, GeminiAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        logExplanation: {
            type: Type.STRING,
            description: "A clear, concise explanation of the event log, suitable for both technical and non-technical stakeholders. Explain the sequence of events and the impact.",
        },
        permanentSolution: {
            type: Type.STRING,
            description: "A detailed proposal for a permanent architectural or procedural solution to prevent this type of failure in the future. Include specific technical recommendations.",
        },
        testScenarios: {
            type: Type.ARRAY,
            description: "A comprehensive list of test scenarios to detect vulnerabilities and stress points related to this failure. Include chaos engineering, load testing, and security vulnerability scenarios.",
            items: {
                type: Type.STRING,
            },
        },
    },
    required: ["logExplanation", "permanentSolution", "testScenarios"],
};


export const analyzeEventWithGemini = async (event: ServiceEvent, locale: string, llm: string): Promise<GeminiAnalysis> => {
    
    const languageInstruction = `Please provide your entire response in the following language: ${locale}.`;
    
    const prompt = `
    As a world-class Senior Site Reliability Engineer (SRE) and cloud security expert, analyze the following cloud service failure event.
    ${languageInstruction}

    Event Details:
    - Service: ${event.service}
    - Region: ${event.region}
    - Description: ${event.description}
    - Start Time: ${event.startTime}
    - Last Update Time: ${event.lastUpdateTime}
    ${event.rawLog ? `- Raw Log Snippet:\n${event.rawLog}` : ''}

    Your task is to provide a structured analysis in JSON format. Generate the following:
    1.  **logExplanation**: A clear explanation of the event, its impact, and the root cause based on the provided logs and description.
    2.  **permanentSolution**: A robust, long-term solution to prevent recurrence.
    3.  **testScenarios**: A diverse and comprehensive list of at least 10 detailed test scenarios to validate the fix and identify other potential vulnerabilities in the service.
    `;

    try {
        const response = await ai.models.generateContent({
            model: llm, // Use the selected model for the API call
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        if (parsedData.logExplanation && parsedData.permanentSolution && Array.isArray(parsedData.testScenarios)) {
            return parsedData as GeminiAnalysis;
        } else {
            throw new Error("Gemini response is missing required fields.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from Gemini. Please check the console for more details.");
    }
};