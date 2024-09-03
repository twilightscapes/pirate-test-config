import type { SiteMeta } from "@/types";

export function generateMeta(data: any): SiteMeta {
  return {
    title: data.title,
    description: data.description,
    articleDate: data.publishDate || data.date,
    ogImage: data.ogImage || data.coverImage?.src,
  };
}
