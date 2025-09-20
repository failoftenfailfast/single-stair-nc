import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'scrollytellingSection',
  title: 'Scrollytelling Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'The text content that appears during this section',
    }),
    defineField({
      name: 'animationTrigger',
      title: 'Animation Trigger',
      type: 'string',
      options: {
        list: [
          { title: 'Fade In', value: 'fadeIn' },
          { title: 'Slide Up', value: 'slideUp' },
          { title: 'Scale', value: 'scale' },
          { title: 'Rotate', value: 'rotate' },
          { title: 'Morph', value: 'morph' },
          { title: 'Camera Move', value: 'cameraMove' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cameraPosition',
      title: 'Camera Position',
      type: 'object',
      fields: [
        {
          name: 'x',
          title: 'X Position',
          type: 'number',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'y',
          title: 'Y Position',
          type: 'number',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'z',
          title: 'Z Position',
          type: 'number',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'cameraTarget',
      title: 'Camera Target',
      type: 'object',
      fields: [
        {
          name: 'x',
          title: 'X Target',
          type: 'number',
          initialValue: 0,
        },
        {
          name: 'y',
          title: 'Y Target',
          type: 'number',
          initialValue: 0,
        },
        {
          name: 'z',
          title: 'Z Target',
          type: 'number',
          initialValue: 0,
        },
      ],
    }),
    defineField({
      name: 'duration',
      title: 'Animation Duration (seconds)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0.5).max(10),
      initialValue: 2,
    }),
    defineField({
      name: 'models',
      title: 'Active Models',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Single Stair Building', value: 'singleStairBuilding' },
              { title: 'Double Egress Building', value: 'doubleEgressBuilding' },
              { title: 'Fire Safety System', value: 'fireSystem' },
              { title: 'Cross Section View', value: 'crossSection' },
              { title: 'Floor Plan Overlay', value: 'floorPlan' },
              { title: 'Ventilation Arrows', value: 'ventilation' },
              { title: 'Light Rays', value: 'lightRays' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'modelStates',
      title: 'Model States',
      type: 'object',
      fields: [
        {
          name: 'opacity',
          title: 'Opacity',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(1),
          initialValue: 1,
        },
        {
          name: 'scale',
          title: 'Scale',
          type: 'number',
          validation: (Rule) => Rule.min(0.1).max(3),
          initialValue: 1,
        },
        {
          name: 'rotation',
          title: 'Rotation (degrees)',
          type: 'object',
          fields: [
            { name: 'x', title: 'X Rotation', type: 'number', initialValue: 0 },
            { name: 'y', title: 'Y Rotation', type: 'number', initialValue: 0 },
            { name: 'z', title: 'Z Rotation', type: 'number', initialValue: 0 },
          ],
        },
        {
          name: 'position',
          title: 'Position Offset',
          type: 'object',
          fields: [
            { name: 'x', title: 'X Offset', type: 'number', initialValue: 0 },
            { name: 'y', title: 'Y Offset', type: 'number', initialValue: 0 },
            { name: 'z', title: 'Z Offset', type: 'number', initialValue: 0 },
          ],
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: false,
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Active Section',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to temporarily disable this section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, order, isActive } = selection;
      return {
        title: `${order}. ${title}`,
        subtitle: isActive ? 'Active' : 'Inactive',
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

