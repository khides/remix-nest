import { JsonSchema } from 'helpers/extension';
import { UserSchema } from 'src/owners/schema/owner.schema';
import { TagSchema } from 'src/projects/schema/project.schema';
import {
  AttributeSchema,
  TimelineSchema,
} from 'src/topics/schema/topic.schema';
import { z } from 'zod';

export const CreateTopicBodySchema = z.object({
  frameId: z.string().uuid().optional(),
  title: z.string().min(1),
  participants: z.array(UserSchema),
  state: z.string().min(1),
  createdBy: UserSchema,
  reviewer: UserSchema,
  assignee: UserSchema,
  tags: z.array(TagSchema),
  createdAt: z.number(),
  timeline: TimelineSchema,
  attributes: z.array(AttributeSchema),
  document: JsonSchema,
});

export const UpdateTopicFrameBodySchema = z.object({
  frameId: z.string().uuid(),
});

export const UpdateTopicParticipantsBodySchema = z.object({
  participantsIds: z.array(z.string().uuid().min(1)),
});

export const UpdateTopicStateBodySchema = z.object({
  state: z.string().min(1),
});

export const UpdateTopicTagsBodySchema = z.object({
  tagsIds: z.array(z.string().uuid().min(1)),
});

export const UpdateTopicTitleBodySchema = z.object({
  title: z.string().min(1),
});

export const CreateQuestionBodySchema = z.object({
  activityId: z.string().uuid(),
});

export const TopicContextSchema = z.object({
  topicContextId: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  opponentTopicId: z.string().uuid(),
});

export const UpdateTopicContextListBodySchema = z.object({
  topicId: z.string().uuid(),
  contexts: z.array(TopicContextSchema),
});

export const CreateTopicContextBodySchema = TopicContextSchema.omit({
  topicContextId: true,
});

export const UpdateTopicContextBodySchema = CreateTopicContextBodySchema;

export const UpdateAttributeSchema = z.object({
  frameAttributeId: z.string().uuid(),
  content: JsonSchema,
});

export const UpdateTopicAttributesBodySchema = z.object({
  attributes: z.array(UpdateAttributeSchema),
});

export const PostTimelineCommentBodySchema = z.object({
  content: JsonSchema,
});

export const UpdateTimelineCommentBodySchema = PostTimelineCommentBodySchema;
export const PostTimelineReplyBodySchema = PostTimelineCommentBodySchema;
export const UpdateTimelineReplyBodySchema = PostTimelineCommentBodySchema;

export const CreateFilteringShortcutsBodySchema = z.object({
  name: z.boolean(),
  description: z.string().min(1),
  frameId: z.string().uuid().optional(),
  sort: z.string().optional(),
  state: z.string().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
});
