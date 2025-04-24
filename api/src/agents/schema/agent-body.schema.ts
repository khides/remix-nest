import { type } from 'os';
import { title } from 'process';
import { JsonSchema } from 'helpers/extension';
import { z } from 'zod';

export const UpdateSuggestionFeedbackBodySchema = z.object({
  state: z.enum(['approved', 'disapproved']),
  comment: z.string().optional(),
  reaction: z.enum(['good', 'bad']).optional(),
});

export const UpdateVectorDBBodySchema = z.object({
  updateTopicIds: z.array(z.string().uuid()),
});

export const CreateTopicSuggestionBodySchema = z.object({
  metadata: z.object({
    project_id: z.string().uuid(),
    agent_id: z.string().uuid(),
  }),
  suggestion: z.object({
    id: z.string().uuid(),
    type: z.string(),
    title: z.string(),
    accuracy: z.number(),
  }),
  data: z.object({
    id: z.string().uuid().optional(),
    frame_id: z.string().uuid(),
    title: z.string(),
    state: z.enum(['open', 'closed']),
    assignee: z.string().uuid(),
    reviewer: z.string().uuid(),
    participants: z.array(z.string().uuid()),
    tags: z.array(
      z.object({
        name: z.string(),
        color: z.string(),
      }),
    ),
    attributes: z.array(
      z.object({
        name: z.string(),
        content: JsonSchema,
      }),
    ),
    document: JsonSchema,
    contexts: z.array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string(),
        description: z.string(),
        type: z.string(),
        opponent_topic_id: z.string().uuid(),
      }),
    ),
  }),
});

export const CreateCommentSuggestionBodySchema = z.object({
  metadata: z.object({
    request_type: z.string(),
    project_id: z.string().uuid(),
    agent_id: z.string().uuid(),
    activity_id: z.string().uuid(),
  }),
  suggestion: z.object({
    id: z.string().uuid().optional(),
    type: z.string(),
    title: z.string(),
    accuracy: z.number(),
  }),
  data: JsonSchema,
});
