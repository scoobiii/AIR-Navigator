import type { ServiceEvent, GeminiAnalysis } from '../../types';

// WARNING: This is a DIRECT API call from the browser.
// Modern web browsers will likely block this request due to the CORS (Cross-Origin Resource Sharing) security policy.
// For a production application, a backend proxy is the correct solution to this problem.
// This implementation is a simplified version as requested, to demonstrate the direct API call structure.

const NVIDIA_API_KEY = "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";
const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

export const analyzeEventWithLlama = async (event: ServiceEvent, locale: string): Promise<GeminiAnalysis> => {
    
    const languageInstruction = `Please provide your entire response in the following language: ${locale}.`;

    const userPrompt = `
    As a world-class Senior Site Reliability Engineer (SRE) and cloud security expert, analyze the following cloud service failure event.
    Your response MUST be a single, valid JSON object, and nothing else. Do not include any text before or after the JSON.
    The JSON object must conform to this structure:
    {
      "logExplanation": "string",
      "permanentSolution": "string",
      "testScenarios": ["string", "string", ...]
    }
    
    ${languageInstruction}

    Event Details:
    - Service: ${event.service}
    - Region: ${event.region}
    - Description: ${event.description}
    - Start Time: ${event.startTime}
    - Last Update Time: ${event.lastUpdateTime}
    ${event.rawLog ? `- Raw Log Snippet:\n${event.rawLog}` : ''}

    Now, generate the JSON analysis.
    `;

    const payload = {
        "model": "meta/llama-4-maverick-17b-128e-instruct",
        "messages": [{"role":"user","content": userPrompt}],
        "max_tokens": 1024,
        "temperature": 1.00,
        "top_p": 1.00,
        "frequency_penalty": 0.00,
        "presence_penalty": 0.00,
        "stream": false
    };

    try {
        const response = await fetch(NVIDIA_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NVIDIA_API_KEY}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`NVIDIA API Error: ${response.status} ${response.statusText}. Details: ${errorBody}`);
        }

        const data = await response.json();
        const contentString = data.choices[0]?.message?.content;

        if (!contentString) {
            throw new Error("Received an empty response from the Llama API.");
        }

        try {
            const parsedAnalysis = JSON.parse(contentString);
            if (parsedAnalysis.logExplanation && parsedAnalysis.permanentSolution && Array.isArray(parsedAnalysis.testScenarios)) {
                return parsedAnalysis as GeminiAnalysis;
            } else {
                throw new Error("Llama API response is missing required fields.");
            }
        } catch (parseError) {
            console.error("Failed to parse Llama API response:", contentString);
            throw new Error("Failed to parse the Llama API response as valid JSON.");
        }

    } catch (error) {
        console.error("Error calling Llama API directly:", error);
        throw new Error(`Failed to fetch from the Llama API: ${(error as Error).message}. This is likely a CORS issue.`);
    }
};