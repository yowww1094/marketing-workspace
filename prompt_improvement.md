# Prompt Engineering Strategy

The current AI outputs feel unsatisfying because our system prompts are extremely short and generic. For example, the personas prompt is currently:
*"You are an expert consumer psychologist. Create 3 detailed buyer personas for this product based on the market research and competitor analysis. Return structured JSON."*

While the `Zod` schemas enforce the *shape* of the JSON (ensuring the app doesn't crash), they do nothing to enforce the *quality, depth, or creativity* of the actual text. To get premium, actionable marketing intelligence from Llama 3.1 70B, we need to completely overhaul our system prompts.

## Why the current prompts fail:
1. **Lack of Frameworks**: We aren't telling the AI *how* to think. (e.g., using Jobs-to-be-Done for personas, or Porter's Five Forces for market research).
2. **Missing Constraints**: We don't specify tone, length, or formatting rules.
3. **No Chain of Thought**: We immediately ask for JSON. Large Language Models (LLMs) perform significantly better when allowed to "think" and reason before outputting the final format.
4. **Weak Role prompting**: Saying "You are an expert" is a start, but we need to define the expert's philosophy and methodology.

## Proposed Strategy: The "PRO" Framework

We should rewrite every single `system_prompt` in the database to follow a rigorous structure:

### 1. Persona & Context (The "Who")
Define the exact persona, their tone, and their world-class standards.
*Example: "You are an elite Silicon Valley CMO who specializes in hyper-growth SaaS. You reject generic marketing fluff and focus on sharp, counter-intuitive positioning."*

### 2. Task & Methodology (The "How")
Give the AI specific marketing frameworks to apply.
*Example: "Apply the 'Jobs to be Done' framework. Do not just list 'they want to save time'. Explain the underlying emotional and social jobs the customer is trying to hire this product for."*

### 3. Rules & Constraints (The "What not to do")
Prevent the AI from using generic LLM speak.
*Example: "NEVER use the words 'game-changer', 'revolutionary', or 'innovative'. Avoid buzzwords. Keep copy punchy and direct."*

### 4. Step-by-Step Reasoning (Chain of Thought)
Even though we are using `generateObject` to get JSON, we can add a `reasoning` or `analysis` string field to every Zod schema. By forcing the AI to write out its reasoning *before* outputting the final arrays/strings, the quality of the final data skyrockets.

## Example: Before vs After (Personas)

**Before:**
> "You are an expert consumer psychologist. Create 3 detailed buyer personas for this product based on the market research and competitor analysis. Return structured JSON."

**After (Proposed):**
> "You are a world-class Consumer Psychologist and Product Marketer. Your goal is to construct 3 hyper-realistic buyer personas for the provided product. 
> 
> INSTRUCTIONS & METHODOLOGY:
> 1. Use the 'Jobs-to-be-Done' framework. What underlying emotional, functional, and social jobs are they hiring this product for?
> 2. Be highly specific. Do not use generic pain points like 'lack of time'. Instead, use specific, visceral pain points like 'spends 4 hours every Sunday manually reconciling spreadsheets'.
> 3. Identify the psychological 'buying triggers' — the exact moment or event that pushes them from 'just looking' to 'ready to buy'.
> 
> TONE & STYLE:
> - Analytical, precise, and highly empathetic.
> - NO marketing fluff or buzzwords (e.g., 'synergy', 'game-changer').
> 
> First, output a 'reasoning' field where you analyze the product and market to decide which 3 personas make the most strategic sense. Then, output the detailed personas."

## Options for Implementation

1. **Option A (Quick Win)**: Rewrite all the `system_prompts` in our database seed file using this framework to instantly improve the output quality.
2. **Option B (Schema Changes)**: Update our Zod schemas in `packages/ai/src/schemas.ts` to include a `reasoning` field for every job. This forces the AI to think before it writes, massively improving quality, but requires slight frontend tweaks to hide the reasoning from the user.
3. **Option C**: Use a specific marketing framework (like StoryBrand, Jobs-to-be-Done, etc.) to force the AI to use across all prompts.
