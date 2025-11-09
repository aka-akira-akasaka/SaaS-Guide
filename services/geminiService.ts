import type { GoogleGenAI } from '@google/genai';
import type { ModelId } from '../types';

/**
 * Calls the Gemini API with a text prompt and an image.
 * @param ai - The initialized GoogleGenAI instance.
 * @param prompt - The user's text prompt.
 * @param base64Data - The base64 encoded image data.
 * @param mimeType - The MIME type of the image.
 * @param modelName - The name of the model to use.
 * @returns The generated text response from the model.
 */
export const getAiResponse = async (
  ai: GoogleGenAI,
  prompt: string,
  base64Data: string,
  mimeType: string,
  modelName: ModelId
): Promise<string> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: prompt,
    };
    
    const systemInstruction = "You are an expert AI assistant for SaaS applications. Your goal is to guide users on how to perform tasks based on a screenshot of their current screen and their question. Provide clear, concise, and step-by-step instructions. Be helpful and encouraging.";

    const response = await ai.models.generateContent({
        model: modelName,
        contents: { parts: [textPart, imagePart] },
        config: {
          systemInstruction: systemInstruction,
        }
    });

    return response.text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error('An unknown error occurred while contacting the Gemini API.');
  }
};