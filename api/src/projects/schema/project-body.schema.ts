import { TagSchema } from 'src/projects/schema/project.schema';
import { z } from 'zod';

export const UpdateProjectAccessRequestSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(['admin', 'editor', 'viewer', 'invited', 'invalid']),
});

export const DeleteProjectAccessRequestSchema = z.object({
  userId: z.string().uuid(),
});

export const UpdateProjectNameRequestSchema = z.object({
  name: z.string(),
});

export const CreateTagBodySchema = TagSchema;

export const UpdateTagBodySchema = TagSchema;

export const InviteBodySchema = z.object({
  identifier: z.string().email(),
});

export const UploadIconBodySchema = z.object({
  file: z.any(), // NestJS で `multipart/form-data` を使うときは型で補完
});
