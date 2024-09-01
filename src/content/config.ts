import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const postSchema = z.object({
  title: z.string(),
  description: z.string().min(50).max(160),
  publishDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  coverImage: z
    .object({
      src: z.string().optional(),
      alt: z.string().default(""),
    })
    .optional(),
  tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
  draft: z.boolean().default(false),
  updatedDate: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined)),
  ogImage: z.string().optional(),
  youtube: z.object({
    discriminant: z.boolean(),
    value: z.object({
      url: z.string(),
      controls: z.boolean().optional(),
      mute: z.boolean().optional(),
      loop: z.boolean().optional(),
      start: z.number().optional(),
      end: z.number().optional()
    }).optional()
  }).optional(),
});

const post = defineCollection({
  schema: postSchema,
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
    phone: z.string(),
    subheading: z.string(),
    subcontent: z.string(),
    subcta: z.string(),
    faqtitle: z.string(),
    testimonialtitle: z.string(),
    postsectiontitle: z.string(),
  }),
});

const siteSettings = defineCollection({
  type: 'data',
  schema: z.object({
    showHeader: z.boolean().optional(),
    showLogo: z.boolean().optional(),
    showTheme: z.boolean().optional(),
    showSwitch: z.boolean().optional(),
    showSearch: z.boolean().optional(),
    showFeature: z.boolean().optional(),
    showBio: z.boolean().optional(),
    showPosts: z.boolean().optional(),
    showTestimonials: z.boolean().optional(),
    showFAQ: z.boolean().optional(),
    showFooter: z.boolean().optional(),
    siteFont: z.string().optional(),
    logoImage: z.string().optional(),
    lightBg: z.string().optional(),
    darkBg: z.string().optional(),
    lightAccent: z.string().optional(),
    darkAccent: z.string().optional(),
  }),
});
export const collections = { post, faqs, testimonials, home, siteSettings };
