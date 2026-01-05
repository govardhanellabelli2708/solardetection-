import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

// Define the response schema for strict JSON output
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    category: {
      type: Type.STRING,
      enum: ["Normal", "Microcrack", "Finger Interruption", "Broken Cell", "Hotspot"],
      description: "The classification of the solar cell defect.",
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence score between 0 and 100.",
    },
    description: {
      type: Type.STRING,
      description: "A detailed technical description of the visual features observing in the EL image.",
    },
    recommendation: {
      type: Type.STRING,
      description: "Actionable advice for maintenance or quality assurance.",
    },
  },
  required: ["category", "confidence", "description", "recommendation"],
};

export const analyzeImage = async (base64Image: string, mimeType: string = "image/jpeg"): Promise<AnalysisResult> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY is not defined");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-3-flash-preview for balanced speed and multimodal capabilities
    const modelId = 'gemini-3-flash-preview';

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: `Analyze this Electroluminescence (EL) image of a solar cell. 
            Classify it into one of these specific categories based on standard PV defects:
            1. Normal (No major defects)
            2. Microcrack (Fine dark lines)
            3. Finger Interruption (Broken grid lines)
            4. Broken Cell (Large cracks or separated pieces)
            5. Hotspot (Bright glowing areas indicating current concentration)
            
            Provide a technical description and maintenance recommendation.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2, // Low temperature for more deterministic/analytical results
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(resultText) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};