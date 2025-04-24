import { createZodDto } from 'nestjs-zod';
import { Json } from 'src/__generated__/schema';
import {
  TopicContextSchema,
  UpdateAttributeSchema,
} from 'src/topics/schema/topic-body.schema';
import {
  ActivitySchema,
  AttributeSchema,
  CreateTopicContextResultSchema,
  GetTopicContextSchema,
  PostTimelineCommentResultSchema,
  PostTimelineReplyResultSchema,
  ProjectTopicContextSchema,
  ReplySchema,
  TimelineSchema,
  TopicSchema,
} from 'src/topics/schema/topic.schema';

export class Topic extends createZodDto(TopicSchema) {}

export class Timeline extends createZodDto(TimelineSchema) {}

export class Activity extends createZodDto(ActivitySchema) {}

export class Reply extends createZodDto(ReplySchema) {}

export class Attribute extends createZodDto(AttributeSchema) {}

export class UpdateAttribute extends createZodDto(UpdateAttributeSchema) {}

export class TopicContext extends createZodDto(TopicContextSchema) {}

export class GetTopicContext extends createZodDto(GetTopicContextSchema) {}

export class CreateTopicContextResult extends createZodDto(
  CreateTopicContextResultSchema,
) {}

export class PostTimelineCommentResult extends createZodDto(
  PostTimelineCommentResultSchema,
) {}

export class PostTimelineReplyResult extends createZodDto(
  PostTimelineReplyResultSchema,
) {}

export class ProjectTopicContext extends createZodDto(
  ProjectTopicContextSchema,
) {}

export class NewTopic {
  projectId: string;
  state: string;
  title: string;
  userId: string;
  createdAt: string;
  reviewerId: string;
  priority: string;
  isSubscribe: boolean;
  participantIds: string[];
  tagIds: string[];
  assigneeId: string;
  config: any;
  frameId?: string;
  initialContent?: any;
  templateId?: string;
  initialContentHex?: string;
  topicId?: string;
  suggestionId?: string;
}
/** Topic概要 */
export interface TopicOutline {
  id: string;
  number: number;
  name: string;
}
export interface TopicId {
  topicId: string;
}

/** Topic詳細 */
export interface searchTopicsByProjectModel {
  topicId: string;
  topicNum: number;
  state: string;
  title: string;
  frameId: string;
  frameName: string;
  frameDescription: string;
  frameIcon: string;
  createdBy: string;
  createdAt: string;
  tags: {
    id: string;
    name: string;
    color: string;
  }[];
  participants: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
  commentNum: number;
  properties: TopicProperty[];
  isConflicting: boolean;
  suggestionId?: string;
}

/** Topicプロパティ */
export interface TopicProperty {
  id: string;
  name: string;
  type: string;
  content: string;
  framePropertyId: string;
  changed?: 'new' | 'update' | 'delete';
}

export type GetTopicsFilteringShortcutsByProjectIdModel = {
  id: string;
  name: string;
  description: string;
  frameId: string;
  sort: string;
  state: string;
  tagIds: string[];
}[];

export interface TopicsFiltering {
  filterKey: string;
  value: string;
}

/** Topicコンテキスト情報 */
export interface TopicContextDetail {
  topicContextId: string;
  name: string;
  description: string;
  type: string;
  topicId: string;
  topicName: string;
  topicNum: number;
}

/** 新規TopicコンテキストId */
export interface NewTopicContextId {
  topicContextId: string;
}

export interface UpdateTopicContext {
  topicContextId: string;
}

export interface HideTopicContext {
  topicContextId: string;
}

export interface UpdateTopicDetailHeader {}

export interface PostNewTopicCommentActivity {
  activityId: string;
}

export interface UpdateTopicCommentActivityById {}

export interface HideTopicActivityWithRepliesById {}

export interface UpdateTopicReplyById {}

export interface HideTopicReplyById {}

export interface HideTopicById {}

export interface PostNewTopicReply {}

export interface ProjectTopicContext {
  id: string;
  name: string;
  description: string;
  type: string;
  topicId: string;
  opponentTopicId: string;
}

export type UpdateTopicFrameByIdModel = {
  id: string;
  frameId: string;
  updaterId: string;
}[];

export interface UpdateTopicTagsByIdsModel {}

export type GetTopicTagIdsByIdsModel = {
  topic_id: string;
  tag_ids: string[];
}[];

export interface UpdateTopicUsersByIdsModel {}

export type UpdateTopicStateByIdModel = {
  id: string;
  state: string;
  updaterId: string;
}[];

export type CreateTopicsFilteringShortcutModel = {
  projectId: string;
  name: string;
  description: string;
  creatorId: string;
  frameId: string;
  sort: string;
  state: string;
  tagIds: string[];
}[];

export type HideTopicsFilteringShortcutsByIdsModel = {
  hiddenId: string;
}[];

export interface UpdateTopicsFilteringShortcutByIdModel {
  shortcutId: string;
  name: string;
  description: string;
  frameId: string | undefined;
  sort: string | undefined;
  state: string | undefined;
  tagIds: string[];
}

export interface TopicDetail {
  id: string;
  title: string;
  topicNum: number;
  state: string;
  createdBy: string;
  createdAt: string;
  frame?: {
    id: string;
    name: string;
    description: string;
    createdBy: {
      id: string;
      email: string;
      name: string;
      avatarUrl: string;
    };
    createdAt: string;
    properties: {
      id: string;
      name: string;
      type: string;
      description: string;
      creatorId: string;
      createdAt: string;
    }[];
    templates: {
      id: string;
      name: string;
      contentJson: Json;
      creatorId: string;
      createdAt: string;
    }[];
  };
  tags: {
    id: string;
    name: string;
    color: string;
  }[];
  participants: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  }[];
  activities: {
    id: string;
    icon: string;
    postedBy: string;
    postedAt: string;
    contentJson: Json;
    type: string;
    suggestionId: string | null;
    replies: {
      id: string;
      parentId: string;
      icon: string;
      postedBy: string;
      postedAt: string;
      contentJson: Json;
    }[];
  }[];
  contexts: {
    id: string;
    name: string;
    description: string;
    type: string;
    topicId: string;
    topicNum: number;
    topicName: string;
    suggestionId?: string;
  }[];
  properties: {
    id: string;
    name: string;
    type: string;
    content: string;
    creatorId: string;
    createdAt: string;
    framePropertyId: string;
  }[];
  documnets: {
    id: string;
    contentJson: Json;
    contentHex: string;
    version: number;
  }[];
}
