import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { createZodDto } from 'nestjs-zod';
import {
  CreateFrameBodySchema,
  CreateFrameTemplateBodySchema,
  CreateFrameTimelineCommentBodySchema,
  CreateFrameTimelineReplyBodySchema,
  UpdateFrameAttributeBodySchema,
  UpdateFrameDescriptionBodySchema,
  UpdateFrameNameBodySchema,
  UpdateFrameTemplateBodySchema,
  UpdateFrameTimelineCommentBodySchema,
  UpdateFrameTimelineReplyBodySchema,
} from 'src/frames/schema/frame-body.schema';

export class CreateFrameBodyDto extends createZodDto(CreateFrameBodySchema) {}

export class UpdateFrameDescriptionBodyDto extends createZodDto(
  UpdateFrameDescriptionBodySchema,
) {}

export class UpdateFrameNameBodyDto extends createZodDto(
  UpdateFrameNameBodySchema,
) {}

export class UpdateFrameAttributeBodyDto extends createZodDto(
  UpdateFrameAttributeBodySchema,
) {}

export class CreateFrameTemplateBodyDto extends createZodDto(
  CreateFrameTemplateBodySchema,
) {}

export class UpdateFrameTemplateBodyDto extends createZodDto(
  UpdateFrameTemplateBodySchema,
) {}

export class CreateFrameTimelineCommentBodyDto extends createZodDto(
  CreateFrameTimelineCommentBodySchema,
) {}

export class UpdateFrameTimelineCommentBodyDto extends createZodDto(
  UpdateFrameTimelineCommentBodySchema,
) {}

export class CreateFrameTimelineReplyBodyDto extends createZodDto(
  CreateFrameTimelineReplyBodySchema,
) {}

export class UpdateFrameTimelineReplyBodyDto extends createZodDto(
  UpdateFrameTimelineReplyBodySchema,
) {}
