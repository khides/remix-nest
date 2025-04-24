import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { createZodDto } from 'nestjs-zod';
import {
  CreateCommentSuggestionResponseSchema,
  CreateTopicSuggestionResponseSchema,
  UpdateSuggestionFeedbackResponseSchema,
} from 'src/agents/schema/agent-response.schema';

export class UpdateSuggestionFeedbackResponseDto extends createZodDto(
  UpdateSuggestionFeedbackResponseSchema,
) {}

export class CreateTopicSuggestionResponseDto extends createZodDto(
  CreateTopicSuggestionResponseSchema,
) {}

export class CreateCommentSuggestionResponseDto extends createZodDto(
  CreateCommentSuggestionResponseSchema,
) {}
