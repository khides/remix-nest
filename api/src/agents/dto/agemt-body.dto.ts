import { createZodDto } from 'nestjs-zod';
import {
  CreateCommentSuggestionBodySchema,
  CreateTopicSuggestionBodySchema,
  UpdateSuggestionFeedbackBodySchema,
  UpdateVectorDBBodySchema,
} from 'src/agents/schema/agent-body.schema';

export class UpdateSuggestionFeedbackBodyDto extends createZodDto(
  UpdateSuggestionFeedbackBodySchema,
) {}

export class UpdateVectorDBBodyDto extends createZodDto(
  UpdateVectorDBBodySchema,
) {}

export class CreateTopicSuggestionBodyDto extends createZodDto(
  CreateTopicSuggestionBodySchema,
) {}

export class CreateCommentSuggestionBodyDto extends createZodDto(
  CreateCommentSuggestionBodySchema,
) {}
