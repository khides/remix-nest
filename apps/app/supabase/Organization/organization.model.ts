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
