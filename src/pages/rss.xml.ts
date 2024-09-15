			import rss from '@astrojs/rss';
			import { getCollection } from 'astro:content';
			import type { CollectionEntry } from 'astro:content';
			import type { AstroGlobal } from 'astro';

			type Post = CollectionEntry<'posts'>;

			export async function GET(context: AstroGlobal) {				const posts = await getCollection('posts');
				return rss({
					title: 'PIRATE Blog',
					description: 'A blog about PIRATE',
					site: context.site ?? 'https://default-site-url.com',
					items: posts.map((post: Post) => ({
						title: post.data.title,
						pubDate: post.data.pubDate,
						description: post.data.description,
						link: `/posts/${post.slug}/`,
					})),
				});
			}
