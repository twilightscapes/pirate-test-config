import type { SiteConfig } from "@/types";
// import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	// Meta property used as the default description meta property
	description: "",
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: "en",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "en",
	// Option to sort posts by updatedDate if set to true (if property exists). Default (false) will sort by publishDate
	sortPostsByUpdatedDate: false,
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: "",

};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [];


