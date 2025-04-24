import { z } from 'zod';

export const ProjectIconSchema = z.object({
  iconUrl: z.string(),
});

export const InviteResultSchema = z.object({
  result: z.enum(['succeeded', 'failed', 'already invited']),
});

export const UserWithRoleSchema = z.object({
  role: z.enum(['admin', 'editor', 'viewer', 'invited', 'invalid']),
  id: z.string().uuid(),
  name: z.string(),
  avatarUrl: z.string(),
});

export const TagSchema = z.object({
  name: z.string(),
  color: z.string(),
  description: z.string(),
});

export const TagWithIDSchema = TagSchema.extend({
  id: z.string().uuid().optional(),
});
