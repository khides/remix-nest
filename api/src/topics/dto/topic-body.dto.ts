import { createZodDto } from 'nestjs-zod';
import {
  CreateFilteringShortcutsBodySchema,
  CreateQuestionBodySchema,
  CreateTopicBodySchema,
  CreateTopicContextBodySchema,
  PostTimelineCommentBodySchema,
  PostTimelineReplyBodySchema,
  UpdateTimelineCommentBodySchema,
  UpdateTimelineReplyBodySchema,
  UpdateTopicAttributesBodySchema,
  UpdateTopicContextBodySchema,
  UpdateTopicContextListBodySchema,
  UpdateTopicFrameBodySchema,
  UpdateTopicParticipantsBodySchema,
  UpdateTopicStateBodySchema,
  UpdateTopicTagsBodySchema,
  UpdateTopicTitleBodySchema,
} from 'src/topics/schema/topic-body.schema';

export class CreateTopicBodyDto extends createZodDto(CreateTopicBodySchema) {}

export class UpdateTopicFrameBodyDto extends createZodDto(
  UpdateTopicFrameBodySchema,
) {}

export class UpdateTopicParticipantsBodyDto extends createZodDto(
  UpdateTopicParticipantsBodySchema,
) {}

export class UpdateTopicStateBodyDto extends createZodDto(
  UpdateTopicStateBodySchema,
) {}

export class UpdateTopicTagsBodyDto extends createZodDto(
  UpdateTopicTagsBodySchema,
) {}

export class UpdateTopicTitileBodyDto extends createZodDto(
  UpdateTopicTitleBodySchema,
) {}

export class CreateQuestionBodyDto extends createZodDto(
  CreateQuestionBodySchema,
) {}

export class UpdateTopicContextListBodyDto extends createZodDto(
  UpdateTopicContextListBodySchema,
) {}

export class CreateTopicContextBodyDto extends createZodDto(
  CreateTopicContextBodySchema,
) {}

export class UpdateTopicContextBodyDto extends createZodDto(
  UpdateTopicContextBodySchema,
) {}

export class UpdateTopicAttributesBodyDto extends createZodDto(
  UpdateTopicAttributesBodySchema,
) {}

export class PostTimelineCommentBodyDto extends createZodDto(
  PostTimelineCommentBodySchema,
) {}

export class UpdateTimelineCommentBodyDto extends createZodDto(
  UpdateTimelineCommentBodySchema,
) {}

export class PostTimelineReplyBodyDto extends createZodDto(
  PostTimelineReplyBodySchema,
) {}

export class UpdateTimelineReplyBodyDto extends createZodDto(
  UpdateTimelineReplyBodySchema,
) {}

export class CreateFilteringShortcutsBodyDto extends createZodDto(
  CreateFilteringShortcutsBodySchema,
) {}
