import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData } from "../types.ts";

export const analyzeFood = async (foodQuery: string): Promise<NutritionData> => {
  // Re-initialize inside to ensure API_KEY is correctly pulled from environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
      throw new Error("Empty response from Gemini API");
    }

    return JSON.parse(text) as NutritionData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};