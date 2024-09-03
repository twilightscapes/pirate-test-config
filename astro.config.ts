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

import yaml from 'js-yaml';

const pwaSettingsFile = import.meta.glob('./src/content/pwaSettings/index.yaml', { query: '?raw', import: 'default', eager: true });
const pwaConfigYaml = Object.values(pwaSettingsFile)[0] as string;const pwaConfig = yaml.load(pwaConfigYaml) as Record<string, any>;
if (typeof pwaConfigYaml !== 'string') {
  throw new Error('pwaConfigYaml must be a string');
}

export default defineConfig({
  image: {
    domains: ["webmention.io"]
  },
  integrations: [expressiveCode(expressiveCodeOptions), icon(), tailwind({
    applyBaseStyles: false
  }), sitemap(), mdx(), react(), keystatic(), 
  
  AstroPWA({
    registerType: 'autoUpdate',
    includeAssets: ['robots.txt', 'manifest.webmanifest'],
    manifest: {
      name: pwaConfig.name,
      short_name: pwaConfig.shortName,
      description: pwaConfig.description,
      theme_color: pwaConfig.themeColor,
      start_url: pwaConfig.startUrl,
      background_color: pwaConfig.backgroundColor,
      display: pwaConfig.display,
      icons: [{
        src: pwaConfig.icon192,
        sizes: '192x192',
        type: 'image/png'
      }, {
        src: pwaConfig.icon512,
        sizes: '512x512',
        type: 'image/png'
      }]
    },
    workbox: {
      maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
    }
  }), 
  
  markdoc()],
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
  site: pwaConfig.siteUrl,
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
    build: {
      assetsInlineLimit: 0,
      chunkSizeWarningLimit: 50000,
    },
    plugins: [rawFonts([".ttf", ".woff"])],
  },
  adapter: netlify()
});
function rawFonts(ext: string[]) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(code: string, id: string) {
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