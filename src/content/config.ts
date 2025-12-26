import { z, defineCollection } from "astro:content";

const articulosCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),  // Obligatorio y convierte string → Date automáticamente

    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    canonical: z.string().optional(),
    twitterTitle: z.string().optional(),
    twitterDescription: z.string().optional(),
    twitterImage: z.string().optional(),
    readingTime: z.number().optional(),
    category: z.string().optional(),
  }),
});

export const collections = {
  articulos: articulosCollection,
};