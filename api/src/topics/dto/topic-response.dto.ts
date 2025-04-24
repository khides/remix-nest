import { ApiProperty, ApiSchema, ApiTags } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Owner } from 'src/owners/entities/owner.entity';
import {
  CreateTopicContextResult,
  GetTopicContext,
  PostTimelineCommentResult,
  PostTimelineReplyResult,
  ProjectTopicContext,
  Topic,
  TopicContext,
} from 'src/topics/entities/topic.entity';
import { createZodDto } from 'nestjs-zod';
import {
  CreateTopicContextResponseSchema,
  CreateTopicResponseSchema,
  GetProjectTopicContextListResponseSchema,
  GetTopicContextDetailResponseSchema,
  GetTopicContextListResponseSchema,
  GetTopicDetailResponseSchema,
  GetTopicListResponseSchema,
  PostTimelineCommentResponseSchema,
  PostTimelineReplyResponseSchema,
} from 'src/topics/schema/topic-response.schema';

export class CreateTopicResponseDto extends createZodDto(
  CreateTopicResponseSchema,
) {}

export class GetTopicListResponseDto extends createZodDto(
  GetTopicListResponseSchema,
) {}

export class GetTopicDetailResponseDto extends createZodDto(
  GetTopicDetailResponseSchema,
) {}

export class GetTopicContextListResponseDto extends createZodDto(
  GetTopicContextListResponseSchema,
) {}

export class GetTopicContextDetailResponseDto extends createZodDto(
  GetTopicContextDetailResponseSchema,
) {}

export class CreateTopicContextResponseDto extends createZodDto(
  CreateTopicContextResponseSchema,
) {}

export class PostTimelineCommentResponseDto extends createZodDto(
  PostTimelineCommentResponseSchema,
) {}

export class PostTimelineReplyResponseDto extends createZodDto(
  PostTimelineReplyResponseSchema,
) {}

export class GetProjectTopicContextListResponseDto extends createZodDto(
  GetProjectTopicContextListResponseSchema,
) {}
