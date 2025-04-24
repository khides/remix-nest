import { z } from 'zod';

export const UpdateOwnerRequestSchema = z.object({
  ownerName: z.string().min(1, 'Owner名は必須です'),
  username: z.string().min(1, 'User名は必須です'),
  fullname: z.string().min(1, 'フルネームは必須です'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  avatarUrl: z.union([z.string().url().optional(), z.literal('')]),
  readme: z.string(),
});

export const UploadIconRequestSchema = z.object({
  file: z.any(), // NestJS で `multipart/form-data` を使うときは型で補完
});

export const UpdatePinRequestSchema = z.object({
  projectId: z.string().uuid(),
  pined: z.boolean(),
});

export const LeaveProjectRequestSchema = z.object({
  projectId: z.string().uuid(),
});

export const UpdateOrgDisplayRequestSchema = z.object({
  orgId: z.string().uuid(),
  display: z.boolean(),
});

export const LeaveOrgRequestSchema = z.object({
  orgId: z.string().uuid(),
});
