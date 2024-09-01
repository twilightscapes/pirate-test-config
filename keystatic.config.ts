// import ColorPickerComponent from './src/components/ColorPickerComponent';
import { config, fields, collection, singleton } from '@keystatic/core';export default config({
    storage: {
      kind: 'local',
    },
    cloud: {
      project: 'dog-poopers/dogpoopers',
    },
    ui: {
      brand: { name: 'Dog Poopers' },
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
          content: fields.markdoc({ label: 'Content' }),
          draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
          publishDate: fields.datetime({ label: 'Publish Date' }),
          updatedDate: fields.datetime({ label: 'Updated Date' }),
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
          tags: fields.array(fields.text({ label: 'Tag' }), {
            label: 'Tags',
            itemLabel: (props) => props.value,
          }),
        },
      }),
      pages: collection({
        label: 'Pages',
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
            publicPath: 'public/images/testimonials',
          }),
          order: fields.number({ label: 'Order' }),
        },
      })
    },
    singletons: {
      siteSettings: singleton({
        label: 'Site Settings',
        path: 'src/content/siteSettings/main',
        schema: {
          showHeader: fields.checkbox({ label: 'Show Header', description: 'Hide/Show the main site header', defaultValue: true }),
          showLogo: fields.checkbox({ label: 'Show Logo', description: 'Hide/Show the logo in the header', defaultValue: true }),
          showTheme: fields.checkbox({ label: 'Show Theme', description: 'Hide/Show the theme selector', defaultValue: true }),
          showSwitch: fields.checkbox({ label: 'Show Switch', description: 'Hide/Show the layout selector', defaultValue: true }),
          showSearch: fields.checkbox({ label: 'Show Search', description: 'Hide/Show the search in the header', defaultValue: true }),
          showFooter: fields.checkbox({ label: 'Show Footer', description: 'Hide/Show the Footer', defaultValue: true }),
          divider: fields.empty(),
        
          showFeature: fields.checkbox({ label: 'Show Feature', description: 'Hide/Show the Feature section on home page', defaultValue: true }),
          showBio: fields.checkbox({ label: 'Show Bio', description: 'Hide/Show the Bio section on the home page', defaultValue: true }),
          showPosts: fields.checkbox({ label: 'Show Posts', description: 'Hide/Show the Posts section on the home page', defaultValue: true }),
          showTestimonials: fields.checkbox({ label: 'Show Testimonials', description: 'Hide/Show the Testimonials section on the home page', defaultValue: true }),
          showFAQ: fields.checkbox({ label: 'Show FAQs', description: 'Hide/Show the FAQ section on the home page', defaultValue: true }),
          divider2: fields.empty(),

          logoImage: fields.image({
            label: 'Logo Image',
            directory: 'public/images/logo',
            publicPath: '/images/logo',
          }),

          divider3: fields.empty(),

          siteFont: fields.text({ label: 'Site Font', defaultValue: 'Bowlby One', description: 'Enter the name of any Google Font' }),
          
          lightBg: fields.text({ label: 'Light Background Color', description: '(light) Page Background - can use any color value: red, #ff000, hsl, rgba etc ', validation: { isRequired: false } }),
          lightAccent: fields.text({ label: 'Light Accent Color', description: '(light) Accent - can use any color value: red, #ff000, hsl, rgba etc ', validation: { isRequired: false } }),
          darkBg: fields.text({ label: 'Dark Background Color', description: '(dark) Page Background - can use any color value: red, #ff000, hsl, rgba etc ', validation: { isRequired: false } }),
          darkAccent: fields.text({ label: 'Dark Accent Color', description: '(dark) Accent Color - can use any color value: red, #ff000, hsl, rgba etc ', validation: { isRequired: false } }),
        },
      }),
      otherSettings: singleton({
        label: 'Other Settings',
        path: 'src/content/otherSettings/main',
        schema: {
          exampleSetting: fields.text({ label: 'Example Setting' }),
          anotherSetting: fields.checkbox({ label: 'Another Setting', defaultValue: false }),
        },
      }),
      home: singleton({
        label: 'Home Page',
        path: 'src/content/homepage/',
        schema: {
          title: fields.text({ label: 'Title' }),
          tagline: fields.text({ label: 'Tagline' }),
          phone: fields.text({ label: 'Phone' }),
          subheading: fields.text({ label: 'Sub Heading' }),
          subcontent: fields.text({ label: 'Sub Content' }),
          subcta: fields.text({ label: 'CTA' }),
          faqtitle: fields.text({ label: 'Faq Title' }),
          testimonialtitle: fields.text({ label: 'Testimonials Title' }),
          postsectiontitle: fields.text({ label: 'Posts Section Title' }),
          description: fields.text({ label: 'Description', multiline: true }),
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
    },  });