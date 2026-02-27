import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('products').collect();
  },
});

export const bySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query('products').withIndex('by_slug', (q) => q.eq('slug', args.slug)).first();
  },
});

export const create = mutation({
  args: {
    sku: v.optional(v.string()),
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    categoryId: v.id('categories'),
    basePrice: v.optional(v.number()),
    salePrice: v.optional(v.number()),
    isFeatured: v.boolean(),
    isPublished: v.boolean(),
    colorVariants: v.array(
      v.object({
        id: v.string(),
        colorName: v.string(),
        colorHex: v.string(),
        images: v.array(v.string()),
        selectedSizes: v.array(v.string()),
        stock: v.record(v.string(), v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('products', {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id('products'),
    name: v.string(),
    description: v.string(),
    basePrice: v.optional(v.number()),
    salePrice: v.optional(v.number()),
    isFeatured: v.boolean(),
    isPublished: v.boolean(),
    colorVariants: v.array(
      v.object({
        id: v.string(),
        colorName: v.string(),
        colorHex: v.string(),
        images: v.array(v.string()),
        selectedSizes: v.array(v.string()),
        stock: v.record(v.string(), v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...changes } = args;
    await ctx.db.patch(id, {
      ...changes,
      updatedAt: Date.now(),
    });
    return id;
  },
});

export const softDelete = mutation({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isPublished: false, updatedAt: Date.now() });
    return args.id;
  },
});
