import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {config} from 'dotenv';

config({path: `.env.local`});

export const ai = genkit({
  plugins: [
    googleAI({
      // The API key is read from the GEMINI_API_KEY environment variable.
      // You can setup a .env.local file with GEMINI_API_KEY=...
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
  enableTracing: true,
});
