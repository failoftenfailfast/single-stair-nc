import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'ABOUT',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue: 'WE ARE A COALITION OF ARCHITECTS, PLANNERS, POLICYMAKERS, AND ADVOCATES WORKING TO TRANSFORM NORTH CAROLINA\'S HOUSING LANDSCAPE.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission Section Title',
      type: 'string',
      initialValue: 'OUR MISSION',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionContent',
      title: 'Mission Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'missionBulletPoints',
      title: 'Mission Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Advocate for policy reform', 'Educate communities and stakeholders', 'Support innovative housing projects'],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whySingleStairTitle',
      title: 'Why Single Stair Title',
      type: 'string',
      initialValue: 'WHY SINGLE STAIR?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whySingleStairBenefits',
      title: 'Benefits',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Benefit Title' },
          { name: 'description', type: 'text', title: 'Description' }
        ]
      }],
      initialValue: [
        {
          title: 'MORE LIVABLE SPACE',
          description: 'Single-stair design eliminates redundant corridors, creating 20-30% more usable space.'
        },
        {
          title: 'BETTER NATURAL LIGHT',
          description: 'Cross-ventilation and corner units provide superior lighting and air quality.'
        },
        {
          title: 'REDUCED COSTS',
          description: 'Simplified construction reduces building costs by 15-25% while maintaining safety.'
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'teamTitle',
      title: 'Team Section Title',
      type: 'string',
      initialValue: 'OUR TEAM',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required() },
          { name: 'role', type: 'string', title: 'Role', validation: (Rule) => Rule.required() },
          { name: 'bio', type: 'text', title: 'Bio', validation: (Rule) => Rule.required() },
          { name: 'expertise', type: 'array', of: [{ type: 'string' }], title: 'Areas of Expertise' }
        ]
      }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timelineTitle',
      title: 'Timeline Section Title',
      type: 'string',
      initialValue: 'OUR JOURNEY',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timelineItems',
      title: 'Timeline Milestones',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', type: 'string', title: 'Year', validation: (Rule) => Rule.required() },
          { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
          { name: 'description', type: 'text', title: 'Description', validation: (Rule) => Rule.required() }
        ]
      }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Call to Action Title',
      type: 'string',
      initialValue: 'JOIN OUR MOVEMENT',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Call to Action Description',
      type: 'text',
      initialValue: 'Whether you\'re an architect, developer, policymaker, or concerned citizen, there\'s a place for you in our coalition. Together, we can build better communities for all North Carolinians.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'GET INVOLVED',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'CONTACT US',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          initialValue: 'About Us - Single Stair North Carolina Housing Advocacy',
        },
        {
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          initialValue: 'Learn about Single Stair North Carolina - a coalition of architects, planners, and advocates working to transform housing policy through single-stair building reforms.',
        },
        { name: 'image', title: 'SEO Image', type: 'image' }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'About Page',
      };
    },
  },
});
