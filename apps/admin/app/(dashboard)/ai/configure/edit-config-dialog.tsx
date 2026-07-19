'use client';

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marketing-workspace/ui/components/ui/dialog';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { Textarea } from '@marketing-workspace/ui/components/ui/textarea';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { AIJobConfig } from '@/lib/ai-config';
import { updateAIJobConfig } from './actions';
import { Loader2 } from 'lucide-react';

const AVAILABLE_MODELS = [
  { provider: 'openai', model_name: 'gpt-4o', label: 'OpenAI GPT-4o' },
  { provider: 'anthropic', model_name: 'claude-3-5-sonnet', label: 'Anthropic Claude 3.5 Sonnet' },
  { provider: 'nvidia', model_name: 'meta/llama-3.1-70b-instruct', label: 'NVIDIA LLaMA-3.1 70B' },
  { provider: 'nvidia', model_name: 'meta/llama-3.2-90b-vision-instruct', label: 'NVIDIA LLaMA-3.2 90B Vision' },
  { provider: 'google', model_name: 'gemini-1.5-pro', label: 'Google Gemini 1.5 Pro' },
];

interface EditConfigDialogProps {
  config: AIJobConfig | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditConfigDialog({ config, open, onOpenChange }: EditConfigDialogProps) {
  const [isPending, startTransition] = useTransition();

  if (!config) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // The provider is determined by the selected model combo.
    const selectedCombo = formData.get('model_combo') as string;
    const [provider, model_name] = selectedCombo.split(':::');
    
    formData.append('provider', provider || '');
    formData.append('model_name', model_name || '');

    startTransition(async () => {
      try {
        await updateAIJobConfig(formData);
        onOpenChange(false);
      } catch (err) {
        console.error(err);
        alert('Failed to update config.');
      }
    });
  };

  const currentCombo = `${config.provider}:::${config.model_name}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-zinc-900 capitalize">
            Configure {config.job_type.replace('_', ' ')}
          </DialogTitle>
          <DialogDescription>
            Update the underlying AI model and system instructions for this workflow step.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="job_type" value={config.job_type} />

          <div className="space-y-2">
            <Label htmlFor="model_combo" className="text-zinc-900 font-medium">Model Selection</Label>
            <select 
              id="model_combo" 
              name="model_combo" 
              defaultValue={currentCombo}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {AVAILABLE_MODELS.map(m => (
                <option key={`${m.provider}:::${m.model_name}`} value={`${m.provider}:::${m.model_name}`}>
                  {m.label} ({m.model_name})
                </option>
              ))}
              {/* If current isn't in list, add it */}
              {!AVAILABLE_MODELS.some(m => m.provider === config.provider && m.model_name === config.model_name) && (
                <option value={currentCombo}>
                  Custom ({config.provider}: {config.model_name})
                </option>
              )}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="system_prompt" className="text-zinc-900 font-medium">System Prompt</Label>
            <Textarea 
              id="system_prompt" 
              name="system_prompt" 
              defaultValue={config.system_prompt}
              className="min-h-[150px] font-mono text-xs bg-zinc-50"
              required
            />
            <p className="text-xs text-zinc-500">The core instructions that guide the model's output formatting and tone.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature" className="text-zinc-900 font-medium">Temperature</Label>
            <Input 
              id="temperature" 
              name="temperature" 
              type="number" 
              step="0.1" 
              min="0" 
              max="2" 
              defaultValue={config.temperature}
              className="w-[120px]"
              required
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-100">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Configuration
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
