import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { createZodDto } from 'nestjs-zod';
import {
  InviteResultSchema,
  ProjectIconSchema,
  TagSchema,
  TagWithIDSchema,
  UserWithRoleSchema,
} from 'src/projects/schema/project.schema';

export class ProjectIcon extends createZodDto(ProjectIconSchema) {}

export class InviteResult extends createZodDto(InviteResultSchema) {}

export class UserWithRole extends createZodDto(UserWithRoleSchema) {}

export class Tag extends createZodDto(TagSchema) {}

export class TagWithID extends createZodDto(TagWithIDSchema) {}
export type CreateNewProjectModel = {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  status: string;
  ownerId: string;
};

export interface ProjectUser {
  userId: string;
  role: string;
  joinedAt: string;
  userName: string;
  avatarUrl: string;
}

export interface GetProjectIdByNameModel {
  projectId: string;
}

export type GetProjectUserRolesByIdsModel = {
  userId: string;
  role: 'admin' | 'editor' | 'viewer' | 'invited' | 'invalid';
}[];

export interface InviteUserToProject {
  result: string;
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  color: string;
  changed?: string;
}

export interface UpdateTagById {
  tagId: string;
}

export interface HideTagById {
  tagId: string;
}

export interface CreateNewTag {
  newTagId: string;
}

export interface SearchTags {
  tags: Tag[];
}

export type SearchUsersByName = {
  id: string;
  name: string;
  avatarUrl: string;
}[];

export interface UpdateProjectUserRoleByUserId {}

export interface HideProjectUserById {}

export interface UpdateProjectNameById {}

export interface HideProjectById {}

export interface UpdateProjectIconUrl {}

export interface GetProjectIconUrl {
  iconUrl: string;
}

export type GetTagsByProjectIdModel = {
  id: string;
  name: string;
  color: string;
  description: string;
}[];

export type GetProjectUserIdsByIdModel = string[];

export interface GetUserProjectsAsOwnerModel {
  id: string;
  name: string;
  description: string;
  status: string;
  iconUrl: string;
  affiliation: string;
  rhombus: number;
  star: number;
  projectNumber: number;
}

export interface UploadProjectFile {
  file: File;
  projectId: string;
}

export interface GetUploadedFileUrl {
  bucket: string;
  filePath: string;
}
