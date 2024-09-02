import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { loadEnv } from 'vite';
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
      start_url: '/',
      background_color: '#000',
      display: 'standalone',
      icons: [{
        src: 'public/images/siteImages/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png'
      }, {
        src: 'public/images/siteImages/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png'
      }]
    }
  }), markdoc()],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, {
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
    ssr: {
      noExternal: ['@keystatic/core'],
    },
    plugins: [
      {
        name: 'load-env',
        config(_, { mode }) {
          Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
        },
      },
      {
        name: 'keystatic-environment',
        configResolved(config) {
          const env = config.env;
          env.KEYSTATIC_PROJECT_ID = process.env.KEYSTATIC_PROJECT_ID;
          console.log('Build-time KEYSTATIC_PROJECT_ID:', process.env.KEYSTATIC_PROJECT_ID);
        },
      },
      {
        name: 'ignore-public-warning',
        enforce: 'pre',
        configResolved(config) {
          config.logger.warn = (msg, options) => {
            if (!msg.includes('Files in the public directory are served at the root path.')) {
              console.warn(msg, options);
            }
          };
        },
      },
    ],
    server: {
      fs: {
        strict: false,
      },
    },
    build: {
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: 50000,
    },
  },
  adapter: netlify()
});function rawFonts(ext: string[]) {
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
