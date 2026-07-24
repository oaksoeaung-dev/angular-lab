import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// Vector store used by the file_search tool. Not a secret, but kept
// server-side so the client only sends the user's message.
const VECTOR_STORE_ID = 'vs_6a636769be088191a6d56b311adddbaa';

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

  // Instantiate lazily inside the handler: the OpenAI constructor throws when
  // the key is missing, which at module scope would crash before the check above.
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
    });

    return res.status(200).json(response);
  } catch (err) {
    console.error('OpenAI request failed', err);
    return res.status(502).json({ error: 'Failed to reach the AI service' });
  }
}