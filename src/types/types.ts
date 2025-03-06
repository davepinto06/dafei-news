import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const TimestampSchema = z.custom<Timestamp>((val) => val instanceof Timestamp);

const NewsSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  date: TimestampSchema,
});

export type News = z.infer<typeof NewsSchema>;
