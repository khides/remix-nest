// schemas/project-response.schema.ts
import {
  ProjectIconSchema,
  InviteResultSchema,
  UserWithRoleSchema,
} from './project.schema';
import { ResponseSchema } from 'helpers/extension';
import { z } from 'zod';

export const GetProjectIconResponseSchema = ResponseSchema.extend({
  data: ProjectIconSchema,
}).describe('プロジェクトアイコン取得レスポンス');

export const InviteProjectResponseSchema = ResponseSchema.extend({
  data: InviteResultSchema,
}).describe('プロジェクト招待レスポンス');

export const GetProjectUsersWithRoleResponseSchema = ResponseSchema.extend({
  data: z.array(UserWithRoleSchema),
}).describe('プロジェクトユーザー一覧（ロール付き）');

export const GetAccessResponseSchema = ResponseSchema.extend({
  data: z.object({
    role: z.enum(['admin', 'editor', 'viewer', 'invited', 'invalid']),
  }),
});
