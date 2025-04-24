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
  changed?: "new" | "update" | "delete";
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
export interface TopicContext {
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
