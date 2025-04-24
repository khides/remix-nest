import {
  CreateTopicBodySchema,
  PostTimelineCommentBodySchema,
  PostTimelineReplyBodySchema,
  UpdateTimelineCommentBodySchema,
  UpdateTimelineReplyBodySchema,
  UpdateTopicAttributesBodySchema,
} from 'src/topics/schema/topic-body.schema';

export const CreateTopicBodyExample = CreateTopicBodySchema.parse({
  frameId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  title: 'これはタイトル',
  participants: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      email: 'user@example.com',
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      email: 'user@example.com',
    },
  ],
  state: 'open',
  createdBy: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    email: 'user@example.com',
  },
  reviewer: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    email: 'user@example.com',
  },
  assignee: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    email: 'user@example.com',
  },
  tags: [
    {
      name: 'tag1',
      color: '#ff0000',
      description: 'description1',
    },
    {
      name: 'tag2',
      color: '#00ff00',
      description: 'description2',
    },
  ],
  createdAt: 1234567890,
  timeline: {
    activities: [
      {
        type: 'comment',
        postedBy: {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          email: 'user@example.com',
        },
        content: {
          type: 'doc',
          content: [],
        },
        link: 'http://example.com',
        createdAt: 1234567890,
        replies: [
          {
            postedBy: {
              id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              email: 'user@example.com',
            },
            link: 'http://example.com',
            content: {
              type: 'doc',
              content: [],
            },
            createdAt: 1234567890,
          },
        ],
      },
    ],
  },
  attributes: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      type: 'text',
      name: 'attribute1',
      frameId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      content: 'content1',
    },
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
});

export const UpdateTopicAttributesBodyExample =
  UpdateTopicAttributesBodySchema.parse({
    topicId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    attributes: [
      {
        frameAttributeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        content: {
          type: 'doc',
        },
      },
      {
        frameAttributeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        content: {
          type: 'doc',
        },
      },
    ],
  });

export const PostTimelineCommentBodyExample =
  PostTimelineCommentBodySchema.parse({
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'これはコメントです',
            },
          ],
        },
      ],
    },
  });

export const UpdateTimelineCommentBodyExample =
  UpdateTimelineCommentBodySchema.parse({
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'これはコメントです',
            },
          ],
        },
      ],
    },
  });

export const PostTimelineReplyBodyExample = PostTimelineReplyBodySchema.parse({
  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'これは返信です',
          },
        ],
      },
    ],
  },
});

export const UpdateTimelineReplyBodyExample =
  UpdateTimelineReplyBodySchema.parse({
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'これは返信です',
            },
          ],
        },
      ],
    },
  });
