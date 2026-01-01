import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData } from "../types.ts";

export const analyzeFood = async (foodQuery: string): Promise<NutritionData> => {
  // Use a local check to ensure the key exists before attempting connection
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Missing Gemini API Key. Please configure the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the nutritional value for a standard serving size of: "${foodQuery}". 
      If the input is not a recognized food item, set isValidFood to false.
      Otherwise, provide detailed nutritional estimates for a typical portion.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValidFood: { type: Type.BOOLEAN },
            foodName: { type: Type.STRING },
            servingSize: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fat: { type: Type.NUMBER },
              },
              required: ["protein", "carbs", "fat"],
            },
            details: {
              type: Type.OBJECT,
              properties: {
                fiber: { type: Type.NUMBER },
                sugar: { type: Type.NUMBER },
                sodium: { type: Type.NUMBER },
                cholesterol: { type: Type.NUMBER },
              },
              required: ["fiber", "sugar", "sodium", "cholesterol"],
            },
            summary: { type: Type.STRING },
            healthTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["isValidFood", "foodName", "servingSize", "calories", "macros", "details", "summary", "healthTips"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("The AI returned an empty response.");
    }

    return JSON.parse(text) as NutritionData;
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    if (error.message?.includes("API_KEY_INVALID")) {
      throw new Error("Invalid API Key. Please verify your Gemini API credentials.");
    }
    throw error;
  }
};