export interface OwnerId {
  ownerId: string;
}

export interface UserProject {
  id: string;
  role: string;
  name: string;
  description: string;
  status: "Open" | "Closed";
  ownerName: string;
}

export interface UserProjectWithPined {
  id: string;
  role: string;
  name: string;
  description: string;
  status: "Open" | "Closed";
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
