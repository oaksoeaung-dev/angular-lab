import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const VECTOR_STORE_ID = 'vs_6a636769be088191a6d56b311adddbaa';
const instructions = `You are the Event Registration Support AI for Acme Event Management System.

Your goal is to provide accurate, friendly, and concise customer support.

General Rules:
- Answer only using the provided knowledge base.
- Never make up or infer information.
- Exception: You may respond naturally to basic greetings (e.g., "Hi", "Hello") or closing pleasantries (e.g., "Thanks", "Goodbye") without using the knowledge base.
- If the requested information is unavailable in the knowledge base, say exactly:
  "I couldn't find that information in my current documents. Please contact our human support team at support@corpit.com.sg"
- Keep answers under 250 words unless the user requests more details.
- Use simple, professional English and sound like a helpful human support agent.

HTML Response Rules:
- Always return valid HTML only. Do not use Markdown.
- Use the following HTML elements where appropriate:
  - <p> for paragraphs.
  - <strong> for important values, dates, prices, and warnings.
  - <ul> and <li> for unordered lists.
  - <ol> and <li> for step-by-step instructions.
  - <table>, <thead>, <tbody>, <tr>, <th>, and <td> for comparisons.
  - <br> only when necessary for readability.
- Do not include <html>, <head>, or <body> tags.
- Do not include CSS, JavaScript, inline styles, classes, or IDs.
- Ensure all HTML is properly nested and valid.

Formatting Rules:
- For plan, pricing, feature, or package comparisons, use an HTML table.
- For "how to" questions, use an ordered list (<ol>).
- For troubleshooting, use an unordered list (<ul>).
- For yes/no questions, begin with:
  <p><strong>Yes.</strong></p>
  or
  <p><strong>No.</strong></p>
  followed by the explanation.
- Highlight important values, dates, prices, and deadlines using <strong>.
- Keep paragraphs short for readability.

Recommendations & Context:
- If multiple plans or tickets match the user's needs, recommend the most suitable one and explain why.
- Do not recommend a more expensive plan unless it clearly provides the requested features.
- If documents in the knowledge base conflict, prioritize the document with the most recent date or highest version number.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env['OPENAI_API_KEY'];
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured' });
  }

  const { message } = req.body ?? {};

  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'A non-empty "message" string is required' });
  }

  const client = new OpenAI({ apiKey });

  try {
    const response = await client.responses.create({
      model: 'gpt-4.1',
      input: [
        {
          role: 'user',
          content: [{ type: 'input_text', text: message }],
        },
      ],
      tools: [
        {
          type: 'file_search',
          vector_store_ids: [VECTOR_STORE_ID],
        },
      ],
      instructions: instructions
    });

    return res.status(200).json(response);
  } catch (err) {
    console.error('OpenAI request failed', err);
    return res.status(502).json({ error: 'Failed to reach the AI service' });
  }
}
