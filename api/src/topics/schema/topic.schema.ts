import { z } from 'zod';
import { JsonSchema } from 'helpers/extension';
import { FrameSchema } from 'src/frames/schema/frame.schema';
import { UserSchema } from 'src/owners/schema/owner.schema';
import { TagWithIDSchema } from 'src/projects/schema/project.schema';

export const AttributeSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  name: z.string(),
  frameId: z.string().uuid(),
  content: z.string(),
});

export const ParticipantSchema = UserSchema;

export const ReplyDetailSchema = z.object({
  id: z.string().uuid(),
  parentId: z.string().uuid(),
  icon: z.string(),
  postedBy: z.string(),
  postedAt: z.string(),
  contentJson: JsonSchema,
});

export const ActivityDetailSchema = z.object({
  id: z.string().uuid(),
  icon: z.string(),
  postedBy: z.string(),
  postedAt: z.string(),
  contentJson: JsonSchema,
  type: z.string(),
  suggestionId: z.string().uuid().nullable(),
  replies: z.array(ReplyDetailSchema),
});

export const ReplySchema = z.object({
  postedBy: UserSchema,
  link: z.string(),
  content: JsonSchema,
  createdAt: z.number(),
});

export const ActivitySchema = z.object({
  type: z.string(),
  postedBy: UserSchema,
  content: JsonSchema,
  link: z.string(),
  createdAt: z.number(),
  replies: z.array(ReplySchema),
});

export const TimelineSchema = z.object({
  activities: z.array(ActivitySchema),
});

export const ContextSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  topicId: z.string().uuid(),
  topicNum: z.number(),
  topicName: z.string(),
  suggestionId: z.string().uuid().optional(),
});

export const AttributeDetailSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.string(),
  content: z.string(),
  creatorId: z.string().uuid(),
  createdAt: z.string(),
  framePropertyId: z.string().uuid(),
});

export const DocumentSchema = z.object({
  id: z.string().uuid(),
  contentJson: JsonSchema,
  contentHex: z.string(),
  version: z.number(),
});

export const TopicSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  topicNum: z.number(),
  state: z.string(),
  createdBy: z.string(),
  createdAt: z.string(),
  frame: FrameSchema.optional(),
  tags: z.array(TagWithIDSchema),
  participants: z.array(ParticipantSchema),
  activities: z.array(ActivityDetailSchema),
  contexts: z.array(ContextSchema),
  attributes: z.array(AttributeDetailSchema),
  documnets: z.array(DocumentSchema),
});
export const TopicMetaSchema = z.object({
  topicId: z.string().uuid(),
  topicNum: z.number(),
  state: z.enum(['open', 'closed']),
  title: z.string(),
  frameId: z.string().uuid(),
  frameName: z.string(),
  frameDescription: z.string(),
  frameIcon: z.string(),
  createdBy: UserSchema,
  createdAt: z.string(),
  tags: z.array(TagWithIDSchema),
  participants: z.array(UserSchema),
  commentNum: z.number(),
  attributes: z.array(AttributeSchema),
  isConflicting: z.boolean(),
  suggestionId: z.string().uuid().optional(),
});

export const TopicContextSchema = z.object({
  topicContextId: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  opponentTopicId: z.string().uuid(),
});

export const GetTopicContextSchema = TopicContextSchema.extend({
  opponentTopicName: z.string(),
  opponentTopicNum: z.number(),
});

export const CreateTopicContextResultSchema = z.object({
  topicContextId: z.string().uuid(),
});

export const ProjectTopicContextSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  topicId: z.string().uuid(),
  opponentTopicId: z.string().uuid(),
});

export const PostTimelineCommentResultSchema = z.object({
  activityId: z.string().uuid(),
});

export const PostTimelineReplyResultSchema = PostTimelineCommentResultSchema;
