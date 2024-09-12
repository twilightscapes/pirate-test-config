import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import fs from "fs";
import rehypeExternalLinks from "rehype-external-links";
import remarkUnwrapImages from "remark-unwrap-images";
import { remarkReadingTime } from "./src/utils/remark-reading-time";
import AstroPWA from '@vite-pwa/astro';
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro';
import netlify from "@astrojs/netlify";
import vercel from '@astrojs/vercel/serverless';

// Load PWA configuration from environment variables with default values
const pwaConfig = {
  siteUrl: process.env.PWA_SITE_URL || 'https://default-site-url.com',
  name: process.env.PWA_NAME || 'Default Name',
  shortName: process.env.PWA_SHORT_NAME || 'Default Short Name',
  description: process.env.PWA_DESCRIPTION || 'Default Description',
  themeColor: process.env.PWA_THEME_COLOR || '#ffffff',
  backgroundColor: process.env.PWA_BACKGROUND_COLOR || '#ffffff',
  startUrl: process.env.PWA_START_URL || '/',
  display: process.env.PWA_DISPLAY as 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser' || 'standalone',
  icon192: process.env.PWA_ICON_192 || '/default-icon-192.png',
  icon512: process.env.PWA_ICON_512 || '/default-icon-512.png',
};

// Determine the adapter and output based on the environment
const isVercel = !!process.env.VERCEL;
const adapter = isVercel ? vercel() : netlify();
const output = isVercel ? 'server' : 'hybrid';

console.log(`Using adapter: ${isVercel ? 'Vercel' : 'Netlify'}`);
console.log(`Output mode: ${output}`);

export default defineConfig({
  image: {
    domains: ["webmention.io"]
  },
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['robots.txt', 'manifest.webmanifest'],
      manifest: {
        id: pwaConfig.startUrl,
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
    mdx(),
    react(),
    icon(),
    tailwind({
      applyBaseStyles: false
    }),
    sitemap(),
    keystatic(),
    markdoc()
  ],
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
    },
    shikiConfig: {
      theme: 'dracula',
    },
  },
  output: output,
  prefetch: true,
  site: pwaConfig.siteUrl,
  redirects: {
    '/admin': '/keystatic'
  },
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
  adapter: adapter
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