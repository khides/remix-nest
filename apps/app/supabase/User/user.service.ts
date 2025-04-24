import { OwnerRepository } from "~/supabase/Owner/owner.repository";
import { SupabaseServerClient } from "~/supabase/supabase.server";
import {
  GetOwnerIdByNameRequest,
  GetUserProfileByIdRequest,
  GetUserProjectsByIdRequest,
  UpdateUserProfileByIdRequest,
  UpdateUserAvatarUrlRequest,
  GetUserAvatarUrlByIdRequest,
  GetUserInfosByIdsRequest,
  HideUserProfileByIdRequest,
  GetUserHideByIdRequest,
} from "~/supabase/__generated__/supabase.interface";
import {
  OwnerId,
  UserProfile,
  UserProject,
  UpdateUserAvatarUrl,
  GetUserAvatarUrl,
} from "~/supabase/Owner/owner.model";
import {
  uploadFileToStorage,
  getUploadedFileUrl,
} from "~/supabase/storage.supabase.server";
import { UserRepository } from "~/supabase/User/user.repository";
import { data } from "react-router";

export class UserService {
  constructor(supabase: SupabaseServerClient) {
    this.repository = new UserRepository(supabase);
  }
  private repository: UserRepository;

  /** オーナー名からオーナーIDを取得するメソッド
   * @param ownerName オーナー名
   * @returns オーナーID
   */
  async getOwnerIdByName({ ownerName }: { ownerName: string }): Promise<{
    data?: OwnerId;
    error?: string;
  }> {
    const request: GetOwnerIdByNameRequest = {
      p_owner_name: ownerName,
    };
    const result = await this.repository.getOwnerIdByName(request);

    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching owner by name:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: OwnerId = {
      ownerId: result.response,
    };
    return {
      data: data,
    };
  }

  /** ユーザーIDからプロジェクト一覧を取得するメソッド
   * @param userId オーナーID
   * @returns プロジェクト一覧
   */
  async getUserProjectsById({ userId }: { userId: string }): Promise<{
    data?: UserProject[];
    error?: string;
  }> {
    const request: GetUserProjectsByIdRequest = {
      p_user_id: userId,
    };
    const result = await this.repository.getUserProjectsById(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching user projects by id:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: UserProject[] = result.response.map((project) => ({
      id: project.project_id,
      name: project.project_name,
      description: project.description,
      status: project.status as "Open" | "Closed",
      role: project.role,
      ownerName: project.owner_name,
    }));
    return {
      data: data,
    };
  }
  async getUserProfileById({ userId }: { userId: string }): Promise<{
    data?: UserProfile;
    error?: string;
  }> {
    const request: GetUserProfileByIdRequest = {
      p_user_id: userId,
    };
    const result = await this.repository.getUserProfileById(request);

    if (!result.response) {
      console.error("Error fetching user profile by id:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const data: UserProfile = {
      userId: userId,
      username: result.response[0].user_name,
      fullname: result.response[0].full_name,
      email: result.response[0].email,
      avatarUrl: result.response[0].avatar_url,
    };
    return {
      data: data,
    };
  }

  async updateUserProfileById({
    userId,
    username,
    fullname,
    email,
    avatarUrl,
  }: {
    userId: string;
    username: string;
    fullname: string;
    email: string;
    avatarUrl: string;
  }): Promise<{
    data?: string;
    error?: string;
  }> {
    const request: UpdateUserProfileByIdRequest = {
      p_user_id: userId,
      p_user_name: username,
      p_full_name: fullname,
      p_email: email,
      p_avatar_url: avatarUrl,
    };
    const result = await this.repository.updateUserProfileById(request);

    if (!result.response) {
      console.error("Error updating user profile by id:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    return {
      data: "success",
    };
  }

  async uploadUserImg({ file, userId }: UploadUserFile): Promise<{
    data?: UpdateUserAvatarUrl;
    error?: string;
  }> {
    // FileをStorageにアップロード
    const uploadFileToStorageRequest = {
      bucket: "profiles",
      file: file,
      uuid: userId,
    };
    const data = await uploadFileToStorage(uploadFileToStorageRequest);
    if (!data || !data.data?.path) {
      console.error("Error uploading user file:", data);
      return { error: "Error uploading user file" };
    }

    // 公開URLを取得
    const getUploadedFileUrlRequest = {
      bucket: "profiles",
      filePath: data.data?.path,
    };
    const publicUrlData = await getUploadedFileUrl(getUploadedFileUrlRequest);
    if (!publicUrlData) {
      console.error("Error getting public URL:", publicUrlData);
      return { error: "Error getting public URL" };
    }

    // ローカル環境のURLに変換
    const localurl = process.env.VITE_SUPABASE_URL ?? "";
    const publicurl = process.env.SUPABASE_URL ?? "";
    let imgUrl: string;
    if (publicUrlData.publicUrl.includes(localurl)) {
      imgUrl = publicUrlData.publicUrl;
    } else {
      imgUrl = publicUrlData.publicUrl.replace(publicurl, localurl);
    }

    console.log("Image URL:", imgUrl);

    // ユーザーのプロフィール画像URLを更新
    const updateAvatarUrlRequest: UpdateUserAvatarUrlRequest = {
      p_user_id: userId,
      p_new_avatar_url: imgUrl,
    };
    const { response, error } = await this.repository.updateUserAvatarUrl(
      updateAvatarUrlRequest
    );
    if (error) {
      console.error("Error updating user avatar URL:", error);
      return { error: error };
    }
    return {
      data: response,
    };
  }

  async getUserAvatarUrlById({ userId }: { userId: string }): Promise<{
    data?: GetUserAvatarUrl;
    error?: string;
  }> {
    const request: GetUserAvatarUrlByIdRequest = {
      p_user_id: userId,
    };
    const { response, error } = await this.repository.getUserAvatarUrlById(
      request
    );
    if (error || !response) {
      console.error("Error getting user avatar URL:", error);
      return { error: error };
    }
    const data: GetUserAvatarUrl = {
      avaterUrl: response[0].avatar_url,
    };
    return {
      data: data,
    };
  }
  async getUserInfosByIds({ userIds }: { userIds: string[] }): Promise<{
    response?: {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    }[];
    error?: string;
  }> {
    const request: GetUserInfosByIdsRequest = {
      p_user_ids: userIds,
    };
    const result = await this.repository.getUserInfosByIds(request);
    if (result.error && !result.response) {
      console.error("Error getting user infos:", result.error);
      return { error: result.error };
    }
    const response = result.response?.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
      };
    });
    return {
      response: response,
    };
  }

  async hideUserProfileById({ userId }: { userId: string }): Promise<{
    data?: string;
    error?: string;
  }> {
    const request: HideUserProfileByIdRequest = {
      p_user_id: userId,
    };
    const result = await this.repository.hideUserProfileById(request);
    if (!result.response) {
      console.error("Error hiding user profile by id:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    return {
      data: "success",
    };
  }

  async getUserHideById({ userId }: { userId: string }): Promise<{
    data?: boolean;
    error?: string;
  }> {
    const request: GetUserHideByIdRequest = {
      p_user_id: userId,
    };
    const { response, error } = await this.repository.getUserHideById(request);
    if (error || response === undefined || response === null) {
      console.error("Error getting user hide:", error);
      return { error: error };
    }
    return {
      data: response,
    };
  }
}

export interface UploadUserFile {
  file: File;
  userId: string;
}

export interface GetUploadedFileUrl {
  bucket: string;
  filePath: string;
}
