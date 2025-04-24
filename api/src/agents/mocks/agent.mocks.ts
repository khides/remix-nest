import {
  CreateCommentSuggestionBodySchema,
  CreateTopicSuggestionBodySchema,
} from 'src/agents/schema/agent-body.schema';

export const CreateTopicSuggestionBodyExample =
  CreateTopicSuggestionBodySchema.parse({
    metadata: {
      project_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      agent_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    },
    suggestion: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      type: 'A',
      title: 'これはタイトル',
      accuracy: 0.95,
    },
    data: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      frame_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'これはタイトル',
      state: 'open',
      assignee: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      reviewer: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      participants: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
      tags: [
        { name: 'tag1', color: '#ff0000' },
        { name: 'tag2', color: '#00ff00' },
      ],
      attributes: [
        { name: 'attribute1', content: 'content1' },
        { name: 'attribute2', content: 'content2' },
      ],
      document: {
        type: 'doc',
        content: [],
      },
      contexts: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'context1',
          description: 'description1',
          type: 'type1',
          opponent_topic_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        },
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'context2',
          description: 'description2',
          type: 'type2',
          opponent_topic_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        },
      ],
    },
  });

export const CreateCommentSuggestionBodyExample =
  CreateCommentSuggestionBodySchema.parse({
    metadata: {
      request_type: 'string',
      project_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      agent_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      activity_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    },
    suggestion: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      type: 'string',
      title: 'string',
      accuracy: 0,
    },
    data: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      prop1: 'string',
    },
  });
