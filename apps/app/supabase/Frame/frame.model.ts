import { Json } from "~/supabase/__generated__/schema";

export interface HideFrameTemplateByIdModel {}

export interface HideFrameByIdModel {}

export interface PostNewFrameCommentActivityModel {}

export interface UpdateFrameCommentActivityByIdModel {}

export interface HideFrameActivityWithRepliesByIdModel {}

export interface PostNewFrameReplyModel {}

export interface UpdateFrameReplyByIdModel {}

export interface HideFrameReplyByIdModel {}

export interface CreateNewFrameModel {
  newFrameId: string;
}

export interface CreateNewFramePropertiesModel {}

export type GetFramesByProjectIdModel = {
  id: string;
  name: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  createdAt: string;
  properties: {
    id: string;
    name: string;
    type: string;
    description: string;
    creatorId: string;
    createdAt: string;
  }[];
  templates: {
    id: string;
    name: string;
    contentJson: Json;
    creatorId: string;
    createdAt: string;
  }[];
}[];

export type SearchFramesByProjectIdModel = {
  id: string;
  name: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  properties: {
    id: string;
    name: string;
    type: string;
    description: string;
    creatorId: string;
    createdAt: string;
  }[];
  templates: {
    id: string;
    name: string;
    contentJson: Json;
    creatorId: string;
    createdAt: string;
  }[];
}[];

export type GetFrameDetailsByIdsModel = {
  id: string;
  name: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  createdAt: string;
  properties: {
    id: string;
    name: string;
    type: string;
    description: string;
    creatorId: string;
    createdAt: string;
  }[];
  templates: {
    id: string;
    name: string;
    contentJson: Json;
    creatorId: string;
    createdAt: string;
  }[];
  topics: {
    id: string;
    name: string;
    number: number;
    state: string;
  }[];
  activities: {
    id: string;
    icon: string;
    type: string;
    postedBy: string;
    postedAt: string;
    contentJson: Json;
    replies: {
      id: string;
      icon: string;
      postedBy: string;
      postedAt: string;
      contentJson: Json;
    }[];
  }[];
}[];

export interface CreateNewTemplateModel {}

export interface UpdateFrameTemplateModel {}

export interface UpdateFrameNameByIdModel {
  id: string;
  name: string;
}

export interface UpdateFrameDescriptionByIdModel {
  id: string;
  description: string;
}

export interface UpdateFramePropertiesByIdsModel {
  updatedFrameProperties: {
    id: string;
    type: string;
    name: string;
    description: string;
  }[];
  createdFrameProperties: {
    id: string;
    type: string;
    name: string;
    description: string;
  }[];
  hidedFramePropertyIds: string[];
}

export type GetFramePropertiesByFrameIdModel = {
  id: string;
  name: string;
  type: string;
  description: string;
  creatorId: string;
  createdAt: string;
}[];
