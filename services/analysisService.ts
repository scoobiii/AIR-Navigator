import { analyzeEventWithGemini } from './llm/gemini';
import { analyzeEventWithLlama } from './llm/llama';
import type { ServiceEvent, GeminiAnalysis } from '../types';

export type LlmType = 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'llama-4-maverick';

export const analyzeEvent = async (
  event: ServiceEvent,
  llm: LlmType,
  locale: string
): Promise<GeminiAnalysis> => {
  if (llm.startsWith('gemini')) {
    return analyzeEventWithGemini(event, locale, llm);
  } else if (llm === 'llama-4-maverick') {
    return analyzeEventWithLlama(event, locale);
  } else {
    throw new Error(`Unsupported LLM type: ${llm}`);
  }
};