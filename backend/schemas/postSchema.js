import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10),
  categoryId: z.number().int().positive(),
  tags: z.array(z.string().min(1)).optional()
});

export default postSchema;