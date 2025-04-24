import { JsonSchema } from 'helpers/extension';
import { UserSchema } from 'src/owners/schema/owner.schema';
import { z } from 'zod';

export const GetFrameAttributeSchema = z.object({
  name: z.string().min(1),
  type: z.enum([
    'text',
    'number',
    'boolean',
    'date',
    'richText',
    'map',
    'list',
  ]),
});

export const CreateFrameSchema = z.object({
  frameId: z.string().uuid(),
});

export const UpdateFrameAttributeSchema = GetFrameAttributeSchema.extend({
  id: z.string().uuid(),
  description: z.string().optional(),
});

export const FrameAttributeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  creatorId: z.string().uuid(),
  createdAt: z.string(),
});
export const TemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  contentJson: JsonSchema,
  creatorId: z.string().uuid(),
  createdAt: z.string(),
});

export const FrameSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  createdBy: UserSchema,
  createdAt: z.string(),
  attributes: z.array(FrameAttributeSchema),
  templates: z.array(TemplateSchema),
});
