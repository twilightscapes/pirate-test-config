import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import fs from "fs";
import rehypeExternalLinks from "rehype-external-links";
import remarkUnwrapImages from "remark-unwrap-images";
import { expressiveCodeOptions } from "./src/site.config";
import { remarkReadingTime } from "./src/utils/remark-reading-time";
import AstroPWA from '@vite-pwa/astro';
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["webmention.io"]
  },
  integrations: [expressiveCode(expressiveCodeOptions), icon(), tailwind({
    applyBaseStyles: false
  }), sitemap(), mdx(), react(), keystatic(), AstroPWA({
    registerType: 'autoUpdate',
    includeAssets: ['robots.txt', 'images/siteImages/manifest-icon-192.maskable.png', 'images/siteImages/manifest-icon-512.maskable.png'],
    manifest: {
      name: 'Pirate',
      short_name: 'Pirate',
      description: 'PIRATE - social media for the people by the people',
      theme_color: '#000',
      start_url: '/boom',
      background_color: '#000',
      display: 'standalone',
      icons: [{
        src: '/images/siteImages/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png'
      }, {
        src: '/images/siteImages/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png'
      }]
    },
    workbox: {
      maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
    }
  }), markdoc()],
  markdown: {    rehypePlugins: [[rehypeExternalLinks, {
      rel: ["nofollow", "noopener", "noreferrer"],
      target: "_blank"
    }]],
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [""]
      }
    }
  },
  output: 'hybrid',
  prefetch: true,
  site: "https://astropirate.netlify.app",
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
    build: {
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: 50000, // Set this to an appropriate value in KB

    },
    
    plugins: [rawFonts([".ttf", ".woff"])],
  },
  adapter: netlify()
});

function rawFonts(ext: string[]) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-expect-error:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}