import { ResponseSchema } from 'helpers/extension';
import { z } from 'zod';

export const UpdateSuggestionFeedbackResponseSchema = ResponseSchema.extend({
  data: z.object({
    suggestionId: z.string().uuid(),
  }),
});

export const CreateTopicSuggestionResponseSchema = ResponseSchema.extend({
  data: z.object({
    topicId: z.string().uuid(),
    suggestionId: z.string().uuid(),
  }),
});

export const CreateCommentSuggestionResponseSchema = ResponseSchema.extend({
  data: z.object({
    activityId: z.string().uuid(),
    suggestionId: z.string().uuid(),
  }),
});
