import React from 'react';
import { config, fields, collection, singleton } from '@keystatic/core';
import fs from 'fs';
import path from 'path';
import { colorPicker } from './src/components/ColorPicker.tsx';




const getDirectories = () => {
  const photosPath = path.join(process.cwd(), 'public/images/photos');
  return fs.readdirSync(photosPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ label: dirent.name, value: dirent.name }));
};

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'pirate/pirate',
  },
  
  collections: {
    posts: collection({
      label: 'Posts',
      entryLayout: 'content',
      slugField: 'title',
      path: 'src/content/post/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', validation: { length: { min: 50, max: 160 } } }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
        
        publishDate: fields.datetime({ label: 'Publish Date' }),
        updatedDate: fields.datetime({ label: 'Updated Date' }),
        divider: fields.empty(),
        coverImage: fields.object({
          src: fields.image({
            label: 'Image file',
            directory: 'public/images/posts',
            publicPath: '/images/posts',
          }),
          alt: fields.text({ 
            label: 'Alt Text',
          }),
        }),
        divider2: fields.empty(),
        youtube: fields.conditional(
          fields.checkbox({ label: 'Include YouTube Video' }),
          {
            true: fields.object({
              url: fields.text({ 
                label: 'YouTube Video URL',
                description: 'Enter the full YouTube video URL'
              }),
              controls: fields.checkbox({ label: 'Show Controls' }),
              mute: fields.checkbox({ label: 'Mute Video' }),
              loop: fields.checkbox({ label: 'Loop Video' }),
              start: fields.number({ label: 'Start Time (seconds)' }),
              end: fields.number({ label: 'End Time (seconds)' }),
            }),
            false: fields.empty(),
          }
        ),
        divider1: fields.empty(),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
      },
    }),
    pages: collection({
      label: 'Other Pages',
      path: 'src/content/pages/*',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    faqs: collection({
      label: 'FAQs',
      path: 'src/content/faqs/*',
      slugField: 'id',
      schema: {
        id: fields.text({ label: 'ID' }),
        question: fields.text({ label: 'Question' }),
        answer: fields.text({ label: 'Answer', multiline: true }),
        order: fields.number({ label: 'Order' }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      path: 'src/content/testimonials/*',
      slugField: 'id',
      schema: {
        id: fields.text({ label: 'ID' }),
        name: fields.text({ label: 'Name' }),
        location: fields.text({ label: 'Location' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/testimonials',
          publicPath: '/images/testimonials',
        }),
        order: fields.number({ label: 'Order' }),
      },
    }),
    menuItems: collection({
      label: 'Menu Items',
      path: 'src/content/menu/*',
      slugField: 'path',
      schema: {
        title: fields.text({ label: 'Title' }),
        path: fields.text({ label: 'Path' }),
        order: fields.number({ label: 'Order' }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/siteSettings/main',
      schema: {
        logoImage: fields.image({
          label: 'Logo Image',
          description: 'Image used across the site - can use any format',
          directory: 'public/images/logo',
          publicPath: '/images/logo',
        }),
        divider: fields.empty(),
        showHeader: fields.checkbox({ label: 'Show Header', description: 'Hide/Show the main site header', defaultValue: true }),
        showLogo: fields.checkbox({ label: 'Show Logo', description: 'Hide/Show the logo in the header', defaultValue: true }),
        showTheme: fields.checkbox({ label: 'Show Theme', description: 'Hide/Show the theme selector', defaultValue: true }),
        showSwitch: fields.checkbox({ label: 'Show Switch', description: 'Hide/Show the layout selector', defaultValue: true }),
        showSearch: fields.checkbox({ label: 'Show Search', description: 'Hide/Show the search in the header', defaultValue: true }),
        showFooter: fields.checkbox({ label: 'Show Footer', description: 'Hide/Show the Footer', defaultValue: true }),
        divider2: fields.empty(),

        showHomeGallery: fields.checkbox({ label: 'Show Home Photo Gallery', description: 'Hide/Show the Photo section on home page', defaultValue: false }),

        showFeature: fields.checkbox({ label: 'Show Feature', description: 'Hide/Show the Feature section on home page', defaultValue: true }),
        showBio: fields.checkbox({ label: 'Show Bio', description: 'Hide/Show the Bio section on the home page', defaultValue: true }),
        showPosts: fields.checkbox({ label: 'Show Posts', description: 'Hide/Show the Posts section on the home page', defaultValue: true }),
        showTestimonials: fields.checkbox({ label: 'Show Testimonials', description: 'Hide/Show the Testimonials section on the home page', defaultValue: true }),
        showFAQ: fields.checkbox({ label: 'Show FAQs', description: 'Hide/Show the FAQ section on the home page', defaultValue: true }),
        divider3: fields.empty(),
        defaultView: fields.select({
          label: 'Default View (sets whether to show grid mode or swipe mode by default',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Swipe', value: 'swipe' },
          ],
          defaultValue: 'grid',
        }),
        showTitles: fields.checkbox({ label: 'Show Post Titles', description: 'Hide/Show the post titles', defaultValue: false }),
        showDates: fields.checkbox({ label: 'Show Dates', description: 'Hide/Show the post dates', defaultValue: true }),
        MAX_POSTS: fields.number({ label: 'Number of posts to display on home page', defaultValue: 3 }),
        divider4: fields.empty(),


        
      },
    }),
    pwaSettings: singleton({
      label: 'PWA Settings',
      path: 'src/content/pwaSettings/',
      schema: {
        siteUrl: fields.text({ label: 'Site Url', description: 'The address to your website' }),
        name: fields.text({ label: 'App Name' }),
        shortName: fields.text({ label: 'Short Name' }),
        description: fields.text({ label: 'Description' }),
        themeColor: fields.text({ label: 'Theme Color' }),
        backgroundColor: fields.text({ label: 'Background Color' }),
        startUrl: fields.text({ label: 'Start URL' }),
        display: fields.select({
          label: 'Display Mode',
          options: [
            { label: 'Standalone', value: 'standalone' },
            { label: 'Fullscreen', value: 'fullscreen' },
            { label: 'Minimal UI', value: 'minimal-ui' },
            { label: 'Browser', value: 'browser' }
          ],
          defaultValue: 'standalone'
        }),
        icon192: fields.image({
          label: '192x192 Icon',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa'
        }),
        icon512: fields.image({
          label: '512x512 Icon',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa'
        })
      }
    }),
    home: singleton({
      label: 'Home Page',
      path: 'src/content/homepage/',
      schema: {
        faqtitle: fields.text({ label: 'Faq Title' }),
        testimonialtitle: fields.text({ label: 'Testimonials Title' }),
        postsectiontitle: fields.text({ label: 'Posts Section Title' }),
        featureImage: fields.object({
          src: fields.image({
            label: 'Feature Image',
            directory: 'public/images/homepage',
            publicPath: '/images/homepage',
          }),
          alt: fields.text({ 
            label: 'Featured Image Alt Text',
          }),
        }),
        youtube: fields.object({
          url: fields.text({ 
            label: 'YouTube Video URL',
            description: 'Enter the full YouTube video URL'
          }),
          controls: fields.checkbox({ label: 'Show Controls', defaultValue: true }),
          mute: fields.checkbox({ label: 'Mute Video', defaultValue: false }),
          loop: fields.checkbox({ label: 'Loop Video', defaultValue: false }),
          start: fields.number({ label: 'Start Time (seconds)', defaultValue: 0 }),
          end: fields.number({ label: 'End Time (seconds)' }),
          divider: fields.empty(),
        }),
      },
    }),
    photoSettings: singleton({
      label: 'Photo Gallery Settings',
      path: 'src/content/photoSettings/',
      schema: {
        galleryMode: fields.select({
          label: 'Gallery Mode',
          options: [
            { label: 'Directory-based', value: 'directory' },
            { label: 'CMS-managed', value: 'keystatic' }
          ],
          defaultValue: 'directory'
        }),
        defaultDirectory: fields.text({
          label: 'Default Directory (for Directory-based mode)',
          defaultValue: 'all',
          validation: { isRequired: false }
        }),
        galleryImages: fields.array(
          fields.object({
            image: fields.image({
              label: 'Gallery Image',
              directory: 'public/images',
              publicPath: '/images',
              validation: { isRequired: false }
            }),
            caption: fields.text({
              label: 'Image Caption',
              description: 'Enter a caption for this image',
              validation: { isRequired: false }
            })
          })
        ),
        showCaptions: fields.checkbox({
          label: 'Show Photo Titles',
          defaultValue: true,
        }),
        showGallerySelector: fields.checkbox({
          label: 'Show Gallery Drop Down Selector',
          defaultValue: true,
        }),
      },
    }),        styleAppearance: singleton({
      label: 'Appearance',
      path: 'src/content/styleapps/',
      schema: {
        backgroundImage: fields.image({
          label: 'Site Background Image',
          directory: 'public/images/styleapps',
          publicPath: '/images/styleapps'
        }),
        siteFont: fields.text({ label: 'Site Font', defaultValue: 'Bowlby One', description: 'Enter the name of any Google Font' }),
        borderRadius: fields.text({ label: 'Border Radius', description: 'Border Radius of elements on page (0) for square', validation: { isRequired: false }, defaultValue: "0px" }),
        divider5: fields.empty(),
        lightBg: colorPicker({ 
          label: 'Light Background Color', 
          description: '(light) Page Background - can use any color value',
        }),
        lightAccent: colorPicker({ 
          label: 'Light Accent Color', 
          description: '(light) Accent - can use any color value',
        }),
        lightAccent2: colorPicker({ 
          label: 'Light Accent2 Color', 
          description: '(light) Accent2 - can use any color value',
        }),
        divider6: fields.empty(),
        darkBg: colorPicker({ 
          label: 'Dark Background Color', 
          description: '(dark) Page Background - can use any color value',
        }),
        darkAccent: colorPicker({ 
          label: 'Dark Accent Color', 
          description: '(dark) Accent Color - can use any color value',
        }),
        darkAccent2: colorPicker({ 
          label: 'Dark Accent2 Color', 
          description: '(dark) Accent Color2 - can use any color value',
        }),
        divider7: fields.empty(),
        lightHeader: colorPicker({ 
          label: 'Light Header Color', 
          description: '(light) Header Color - can use any color value',
        }),
        darkHeader: colorPicker({ 
          label: 'Dark Quote Color', 
          description: '(dark) Quote Color2 - can use any color value',
        }),
        divider8: fields.empty(),
        lightText: colorPicker({ 
          label: 'Light Text Color', 
          description: '(light) Text Color - can use any color value',
        }),
        darkText: colorPicker({ 
          label: 'Dark Text Color', 
          description: '(dark) Text Color - can use any color value',
        }),
        divider9: fields.empty(),
        lightLink: colorPicker({ 
          label: 'Light Link Color', 
          description: '(light) Link Color - can use any color value',
        }),
        darkLink: colorPicker({ 
          label: 'Dark Link Color', 
          description: '(dark) Link Color - can use any color value',
        }),
      },
    }),
    photoUpload: singleton({
      label: 'Photo Upload',
      path: 'src/content/photoUpload/',
      schema: {
        photo: fields.image({
          label: 'Upload Photo',
          directory: 'public/images/photos',
          publicPath: '/images/photos',
        }),
      },
    }),  

    bio: singleton({
      label: 'Bio',
      path: 'src/content/bio/',
      schema: {
        title: fields.text({ label: 'Title' }),
        tagline: fields.text({ label: 'Tagline' }),
        description: fields.text({ label: 'Description', multiline: true }),
        phone: fields.text({ label: 'Phone' }),
        subheading: fields.text({ label: 'Sub Heading' }),
        subcontent: fields.text({ label: 'Sub Content', multiline: true }),
        subcta: fields.text({ label: 'CTA Text' }),
      },
    }),
  
  },

ui: {
  brand: {
    name: 'Pirate',
    mark: ({ colorScheme }) => {
      let path = colorScheme === 'dark'
        ? '/images/logo/logoImage.svg'
        : '/images/logo/logoImage.svg';
      return React.createElement('img', { src: path, height: 40, alt: "Pirate Logo" });
    },
  },
  navigation: {
    'Pages and Posts': [
      'home',
      'pages',
      'posts',
      'photoUpload'
    ],
    'Content Modules': [
      'bio',
      'faqs',
      'testimonials',
      
    ],
    'Settings': [
      'siteSettings',
      'pwaSettings',
      'menuItems',
      'photoSettings',
      'styleAppearance',
    ],
    
  },
},});
