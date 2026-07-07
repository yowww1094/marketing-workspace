import { createOpenAI } from '@ai-sdk/openai';
import { LanguageModel } from 'ai';

export function getAIProvider(modelName: string): LanguageModel {
  if (!process.env.NVIDIA_API_KEY) {
    throw new Error('NVIDIA_API_KEY is missing in environment variables. Please restart your dev server.');
  }

  // We exclusively use NVIDIA NIM endpoints for all models
  const nvidia = createOpenAI({
    baseURL: 'https://integrate.api.nvidia.com/v1',
    apiKey: process.env.NVIDIA_API_KEY,
  });
  
  return nvidia.chat(modelName);
}
