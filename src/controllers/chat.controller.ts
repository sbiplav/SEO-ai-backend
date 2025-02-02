import { Request, Response } from 'express';
import { generateSEOContent } from '../services/openai.service';

export const chatController = {
  async generateContent(req: Request, res: Response) {
    try {
      const { message } = req.body;
      
      const completion = await generateSEOContent(message);
      
      res.json({
        content: completion.choices[0]?.message?.content || 'No response',
        usage: completion.usage
      });
      
    } catch (error: any) {
      console.error('OpenAI Error:', error);
      res.status(500).json({
        error: 'Failed to generate content',
        details: error.message
      });
    }
  }
};