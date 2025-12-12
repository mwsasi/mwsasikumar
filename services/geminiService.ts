import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFood = async (foodQuery: string): Promise<NutritionData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the nutritional value for a standard serving size of: "${foodQuery}". 
      If the input is not a recognized food item (e.g., 'brick', 'laptop', 'anger'), set isValidFood to false.
      Provide realistic estimates if exact data is variable.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValidFood: { type: Type.BOOLEAN },
            foodName: { type: Type.STRING },
            servingSize: { type: Type.STRING, description: "e.g., '1 medium apple (182g)'" },
            calories: { type: Type.NUMBER },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.NUMBER, description: "in grams" },
                carbs: { type: Type.NUMBER, description: "in grams" },
                fat: { type: Type.NUMBER, description: "in grams" },
              },
              required: ["protein", "carbs", "fat"],
            },
            details: {
              type: Type.OBJECT,
              properties: {
                fiber: { type: Type.NUMBER, description: "in grams" },
                sugar: { type: Type.NUMBER, description: "in grams" },
                sodium: { type: Type.NUMBER, description: "in milligrams" },
                cholesterol: { type: Type.NUMBER, description: "in milligrams" },
              },
              required: ["fiber", "sugar", "sodium", "cholesterol"],
            },
            summary: { type: Type.STRING, description: "A brief, 1-2 sentence nutritional overview." },
            healthTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 short, bullet-point style health facts or tips about this food.",
            },
          },
          required: ["isValidFood", "foodName", "servingSize", "calories", "macros", "details", "summary", "healthTips"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as NutritionData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};