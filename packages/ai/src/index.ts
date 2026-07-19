export * from './schemas';
export * from './client';

import { generateObject } from 'ai';
import { getAIProvider } from './client';
import { JobSchemas } from './schemas';
import { logError, logInfo } from '@marketing-workspace/monitoring';

export interface AIJobConfig {
  provider: string;
  model_name: string;
  system_prompt: string;
  temperature: number;
}

export async function executeAIJob(
  jobType: string,
  config: AIJobConfig,
  contextData: any
) {
  const model = getAIProvider(config.model_name);
  const schema = JobSchemas[jobType];

  if (!schema) {
    throw new Error(`No Zod schema defined for job type: ${jobType}`);
  }

  logInfo('AI Job execution started', { metadata: { jobType, model: config.model_name, provider: config.provider } });
  const startTime = Date.now();

  try {
    const { object } = await generateObject({
      model,
      schema,
      system: config.system_prompt,
      prompt: `Analyze the following context and generate the required JSON structure.\n\nContext Data:\n${JSON.stringify(contextData, null, 2)}`,
      temperature: config.temperature,
    });

    const durationMs = Date.now() - startTime;
    logInfo('AI Job execution completed', { metadata: { jobType, durationMs } });

    return object;
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    logError(error, { 
      metadata: { 
        jobType, 
        durationMs,
        provider: config.provider,
        model: config.model_name,
        error_name: error?.name,
        error_message: error?.message,
      } 
    });
    throw error;
  }
}
export {};
