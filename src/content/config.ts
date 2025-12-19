import { z, defineCollection } from "astro:content";

const articulosCollection = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      description: z.string(),

      // Acepta pubDate O date, como Date o como string
      pubDate: z.union([z.string(), z.date()]).optional(),
      date: z.union([z.string(), z.date()]).optional(),

      // Campos opcionales recomendados (puedes añadir más luego)
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
    })
    .transform((entry) => {
      // Normalizar fechas: si solo hay uno, ambos apuntan al mismo
      let finalDate = entry.pubDate ?? entry.date;

      // Convertir string → Date
      if (typeof finalDate === "string") {
        finalDate = new Date(finalDate);
      }

      return {
        ...entry,
        pubDate: finalDate,
        date: finalDate,
      };
    }),
});

export const collections = {
  articulos: articulosCollection,
};
