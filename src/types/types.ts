import { z } from 'zod';

const NewsSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  date: z.string().optional(),
});

export type News = z.infer<typeof NewsSchema>;
