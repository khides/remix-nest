import { z } from 'zod';

export const OwnerSchema = z.object({
  userId: z.string(),
  username: z.string(),
  fullname: z.string(),
  email: z.string().email(),
  avatarUrl: z.union([z.string().url().optional(), z.literal('')]),
  readme: z.string(),
});

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().optional(),
  email: z.string().email(),
  fullname: z.string().optional(),
  avatarUrl: z.union([z.string().url().optional(), z.literal('')]),
});

export const GetUserAvatarSchema = z.object({
  avatarUrl: z.union([z.string().url().optional(), z.literal('')]),
});
