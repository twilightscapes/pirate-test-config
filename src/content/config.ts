import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
    if (!array.length) return array;
    const lowercaseItems = array.map((str) => str.toLowerCase());
    const distinctItems = new Set(lowercaseItems);
    return Array.from(distinctItems);
}

const post = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string().min(50).max(160),
        publishDate: z
            .string()
            .or(z.date())
            .transform((val) => new Date(val)),
        coverImage: z
            .object({
                src: z.string().optional(),
                alt: z.string().default(""), // Make alt required, default to empty string
            })
            .optional(),
        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
        draft: z.boolean().default(false),
        updatedDate: z
            .string()
            .optional()
            .transform((str) => (str ? new Date(str) : undefined)),
        ogImage: z.string().optional(),
    }),
    type: "content",
});


const faqs = defineCollection({
  type: 'data',
  schema: z.object({
    answer: z.string(),
    order: z.number(),
    question: z.string(),
  }),
});


const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    location: z.string(),
    quote: z.string(),
    image: z.string(),
    order: z.number(),
  }),
});

const home = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
  }),
});
export const collections = { post, faqs, testimonials, home }
