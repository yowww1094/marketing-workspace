export * from './schemas';
export * from './client';

import { generateObject } from 'ai';
import { getAIProvider } from './client';
import { JobSchemas } from './schemas';

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

  const { object } = await generateObject({
    model,
    schema,
    system: config.system_prompt,
    prompt: `Analyze the following context and generate the required JSON structure.\n\nContext Data:\n${JSON.stringify(contextData, null, 2)}`,
    temperature: config.temperature,
  });

  return object;
}
export {};
