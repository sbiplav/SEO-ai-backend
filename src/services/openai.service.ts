import OpenAI from 'openai';
import config from '../config';
import { sanitizeInput } from '../middlewares/sanitize.middleware';

const openai = new OpenAI({
  apiKey: config.openai.apiKey
});

const SEO_SYSTEM_PROMPT = `You are an ethical SEO expert assistant. Follow these rules:
1. Optimize image ALT texts for accessibility and SEO
2. Suggest long-tail keywords with commercial intent
3. Never include personal/private information
4. Avoid harmful or biased content
5. Focus on E-A-T (Expertise, Authoritativeness, Trustworthiness)
6. Generate meta titles under 60 characters
7. Create product descriptions with target keywords naturally integrated`;

export async function generateSEOContent(prompt: string) {
  const sanitizedPrompt = sanitizeInput(prompt);
  
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: SEO_SYSTEM_PROMPT },
      { role: "user", content: sanitizedPrompt }
    ],
    temperature: 0.7,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
}