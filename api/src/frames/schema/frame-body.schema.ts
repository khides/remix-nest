import { JsonSchema } from 'helpers/extension';
import {
  FrameAttributeSchema,
  GetFrameAttributeSchema,
  UpdateFrameAttributeSchema,
} from 'src/frames/schema/frame.schema';
import { z } from 'zod';

export const CreateFrameBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  attribute: GetFrameAttributeSchema,
});

export const UpdateFrameDescriptionBodySchema = z.object({
  description: z.string().min(1),
});

export const UpdateFrameNameBodySchema = z.object({
  name: z.string().min(1),
});

export const UpdateFrameAttributeBodySchema = z.object({
  attributes: z.array(UpdateFrameAttributeSchema),
});

export const CreateFrameTemplateBodySchema = z.object({
  name: z.string().min(1),
});

export const UpdateFrameTemplateBodySchema = z.object({
  name: z.string().min(1),
  content: JsonSchema,
});

export const CreateFrameTimelineCommentBodySchema = z.object({
  content: JsonSchema,
});

export const UpdateFrameTimelineCommentBodySchema =
  CreateFrameTimelineCommentBodySchema;

export const CreateFrameTimelineReplyBodySchema =
  CreateFrameTimelineCommentBodySchema;

export const UpdateFrameTimelineReplyBodySchema =
  CreateFrameTimelineCommentBodySchema;
