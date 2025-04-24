import { z } from 'zod';
import { ResponseSchema } from 'helpers/extension';
import {
  CreateTopicContextResultSchema,
  GetTopicContextSchema,
  PostTimelineCommentResultSchema,
  PostTimelineReplyResultSchema,
  ProjectTopicContextSchema,
  TopicMetaSchema,
  TopicSchema,
} from 'src/topics/schema/topic.schema';

// トピック作成
export const CreateTopicResponseSchema = ResponseSchema.extend({
  data: z.object({
    topicId: z.string().uuid(),
  }),
}).describe('トピック作成レスポンス');

// トピック一覧取得
export const GetTopicListResponseSchema = ResponseSchema.extend({
  data: z.array(TopicMetaSchema),
}).describe('トピック一覧取得レスポンス');

// トピック詳細取得
export const GetTopicDetailResponseSchema = ResponseSchema.extend({
  data: TopicSchema,
}).describe('トピック詳細取得レスポンス');

// トピックコンテキスト一覧取得
export const GetTopicContextListResponseSchema = ResponseSchema.extend({
  data: z.array(GetTopicContextSchema),
}).describe('トピックコンテキスト一覧取得レスポンス');

// トピックコンテキスト詳細取得
export const GetTopicContextDetailResponseSchema = ResponseSchema.extend({
  data: GetTopicContextSchema,
}).describe('トピックコンテキスト詳細取得レスポンス');

// トピックコンテキスト作成
export const CreateTopicContextResponseSchema = ResponseSchema.extend({
  data: CreateTopicContextResultSchema,
}).describe('トピックコンテキスト作成レスポンス');

// タイムラインコメント作成
export const PostTimelineCommentResponseSchema = ResponseSchema.extend({
  data: PostTimelineCommentResultSchema,
}).describe('タイムラインコメント作成レスポンス');

// タイムラインリプライ作成
export const PostTimelineReplyResponseSchema = ResponseSchema.extend({
  data: PostTimelineReplyResultSchema,
}).describe('タイムラインリプライ作成レスポンス');

// プロジェクト内のトピックコンテキスト一覧取得
export const GetProjectTopicContextListResponseSchema = ResponseSchema.extend({
  data: z.array(ProjectTopicContextSchema),
}).describe('プロジェクト内トピックコンテキスト一覧レスポンス');
