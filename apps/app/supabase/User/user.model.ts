export interface OwnerId {
  ownerId: string;
}

export type UserProjects = {
  id: string;
  role: string;
  name: string;
  description: string;
  status: "Open" | "Closed";
  ownerName: string;
}[];

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
