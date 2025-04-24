import { createZodDto } from 'nestjs-zod';
import {
  GetUserAvatarSchema,
  OwnerSchema,
  UserSchema,
} from 'src/owners/schema/owner.schema';

export class User extends createZodDto(UserSchema) {}
export class Owner extends createZodDto(OwnerSchema) {}
export class GetUserAvatar extends createZodDto(GetUserAvatarSchema) {}

export interface OwnerId {
  ownerId: string;
}

export interface UserProject {
  id: string;
  role: string;
  name: string;
  description: string;
  status: 'Open' | 'Closed';
  ownerName: string;
}

export interface UserProjectWithPined {
  id: string;
  role: string;
  name: string;
  description: string;
  status: 'Open' | 'Closed';
  ownerName: string;
  pined: boolean;
}

export interface UserProfile {
  userId: string;
  username: string;
  fullname: string;
  email: string;
  avatarUrl: string;
}

export interface UpdateUserAvatarUrl {}

export interface GetUserAvatarUrl {
  avaterUrl: string;
}

export interface getOrgDisplayByOrgAndUserId {
  display?: boolean;
}

export interface updateOrgDisplayByOrgAndUserId {}

export interface GetProjectPinedByProjectAndUserIdResponse {
  pined?: boolean;
}

export interface updateProjectPinedByProjectAndUserId {}

export interface leaveOrganizationByOrgAndUserId {
  orgId: string;
  userId: string;
}

export interface UploadUserFile {
  file: File;
  userId: string;
}

export interface GetUploadedFileUrl {
  bucket: string;
  filePath: string;
}
export type GetOrgIdByNameModel = string;

export type GetOrganizationsByUserIdModel = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  creator_id: string;
  updated_at: string;
}[];

export interface userOrganization {
  id: string;
  name: string;
  description: string;
  created_at: string;
  creator_id: string;
  updated_at: string;
  //display: boolean;
}

export interface userOrganizationWithDisplay {
  id: string;
  name: string;
  description: string;
  created_at: string;
  creator_id: string;
  updated_at: string;
  display: boolean;
}

export interface Org {
  id: string;
  name: string;
  fullname: string;
  description: string;
  avatarUrl: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  affiliation: string;
  rhombus: number;
  star: number;
  updated_at: string;
  project_number: number;
}

export interface ActiveProject extends Project {
  status: string;
}

export interface PinnedProject extends Project {
  status: string;
}

export interface Frame {
  id: string;
  frame_num: number;
  name: string;
  affiliation: string;
  rhombus: number;
  star: number;
  description: string;
  updated_at: string;
}

export interface Topic {
  id: string;
  topic_num: number;
  title: string;
  description: string;
  affiliation: string;
  rhombus: number;
  star: number;
  updated_at: string;
}

export interface People {
  id: string;
  user_name: string;
  full_name: string;
  email: string;
  avater_url: string;
}
export interface GetUserLoggedIn {
  userId: string;
  email: string;
  username: string;
}

export interface GetUserInfoByEmail {
  userName: string;
  userId: string;
}
