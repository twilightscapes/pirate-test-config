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
          showHeader: fields.checkbox({ label: 'Show Header', defaultValue: true }),
          showLogo: fields.checkbox({ label: 'Show Logo', defaultValue: true }),
          showTheme: fields.checkbox({ label: 'Show Theme', defaultValue: true }),
          showSwitch: fields.checkbox({ label: 'Show Switch', defaultValue: true }),
          showSearch: fields.checkbox({ label: 'Show Search', defaultValue: true }),
          showFeature: fields.checkbox({ label: 'Show Feature', defaultValue: true }),
          showBio: fields.checkbox({ label: 'Show Bio', defaultValue: true }),
          showPosts: fields.checkbox({ label: 'Show Posts', defaultValue: true }),
          showTestimonials: fields.checkbox({ label: 'Show Testimonials', defaultValue: true }),
          showFAQ: fields.checkbox({ label: 'Show FAQs', defaultValue: true }),

          showFooter: fields.checkbox({ label: 'Show Footer', defaultValue: true }),

          siteFont: fields.text({ label: 'Site Font', defaultValue: 'Bowlby One', description: 'Enter the name of any Google Font' }),
          logoImage: fields.image({
            label: 'Logo Image',
            directory: 'public/images/logo',
            publicPath: 'public/images/logo',
          }),
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
          }),
        },
      }),    },
  });