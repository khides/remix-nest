import {
  CreateFrameTimelineCommentBodySchema,
  CreateFrameTimelineReplyBodySchema,
  UpdateFrameTemplateBodySchema,
  UpdateFrameTimelineCommentBodySchema,
  UpdateFrameTimelineReplyBodySchema,
} from 'src/frames/schema/frame-body.schema';

export const UpdateFrameTemplateBodyExample =
  UpdateFrameTemplateBodySchema.parse({
    name: 'template',
    content: {
      type: 'doc',
      content: [],
    },
  });

export const CreateFrameTimelineCommentBodyExample =
  CreateFrameTimelineCommentBodySchema.parse({
    content: {
      type: 'doc',
      content: [],
    },
  });

export const UpdateFrameTimelineCommentBodyExample =
  UpdateFrameTimelineCommentBodySchema.parse({
    content: {
      type: 'doc',
      content: [],
    },
  });

export const CreateFrameTimelineReplyBodyExample =
  CreateFrameTimelineReplyBodySchema.parse({
    content: {
      type: 'doc',
      content: [],
    },
  });

export const UpdateFrameTimelineReplyBodyExample =
  UpdateFrameTimelineReplyBodySchema.parse({
    content: {
      type: 'doc',
      content: [],
    },
  });
