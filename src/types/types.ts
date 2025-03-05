import { z } from 'zod';

// Update the Zod schema to match Firebase data structure
const NewsSchema = z.object({
  title: z.string(), // Note: keeping 'tittle' as it matches your Firebase data
  description: z.string(),
  content: z.string(),
  date: z.string().optional(), // Changed to string since Firebase likely stores dates as strings
});

export type News = z.infer<typeof NewsSchema>;
