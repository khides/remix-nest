import { OwnerRepository } from "~/supabase/Owner/owner.repository";
import { SupabaseServerClient } from "~/supabase/supabase.server";
import {
  GetOwnerIdByNameRequest,
  GetUserProfileByIdRequest,
  GetUserProjectsByIdRequest,
  UpdateUserProfileByIdRequest,
  UpdateUserAvatarUrlRequest,
  GetUserAvatarUrlByIdRequest,
  GetUserReadmeByIdRequest,
  UpdateUserReadmeByIdRequest,
  UpdateOrgDisplayByOrgAndUserIdRequest,
  GetOrgDisplayByOrgAndUserIdRequest,
  GetProjectPinedByProjectAndUserIdRequest,
  LeaveOrganizationByOrgAndUserIdRequest,
  LeaveProjectByProjectAndUserIdRequest,
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
  deleteFileFromStorage,
} from "~/supabase/storage.supabase.server";
import { SharedWatchQueryOptions } from "@apollo/client/core/watchQueryOptions";

export class OwnerService {
  constructor(supabase: SupabaseServerClient) {
    this.repository = new OwnerRepository(supabase);
  }
  private repository: OwnerRepository;

  /** オーナー名からオーナーIDを取得するメソッド
   * @param ownerName オーナー名
   * @returns オーナーID
   */
  async getOwnerIdByName({ ownerName }: { ownerName: string }): Promise<{
    response?: OwnerId;
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
      response: data,
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

    if (result.error) {
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

  async deleteUserImg({
    filePath,
  }: {
    filePath: string;
    userId: string;
  }): Promise<{
    data?: string;
    error?: string;
  }> {
    if (filePath === "") {
      console.error("Error deleting user image: No file path provided");
    }
    const regex = /profiles\/(.*)/;
    const match = filePath.match(regex);
    const deleteFileFromStorageRequest = {
      bucket: "profiles",
      filePath: match ? match[1] : "",
    };
    const data = await deleteFileFromStorage(deleteFileFromStorageRequest);
    if (!data) {
      console.error("Error deleting user image: No data returned");
      return { error: "Error deleting user image: No data returned" };
    }
    return {
      data: "success",
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

  async getUserReadmeById({ userId }: { userId: string }): Promise<{
    data?: string;
    error?: string;
  }> {
    const request: GetUserReadmeByIdRequest = {
      p_user_id: userId,
    };
    const { response, error } = await this.repository.getUserReadmeById(
      request
    );
    if (error || !response) {
      console.error("Error getting user readme:", error);
      return { error: error };
    }
    return {
      data: response,
    };
  }

  async updateUserReadmeById({
    userId,
    readme,
  }: {
    userId: string;
    readme: string;
  }): Promise<{
    data?: string;
    error?: string;
  }> {
    const request: UpdateUserReadmeByIdRequest = {
      p_user_id: userId,
      p_readme: readme,
    };
    const result = await this.repository.updateUserReadmeById(request);

    if (result.error) {
      console.error("Error updating user README by id:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    return {
      data: "success",
    };
  }

  async updateOwnerById({
    userId,
    ownerName,
  }: {
    userId: string;
    ownerName: string;
  }): Promise<{
    data?: string;
    error?: string;
  }> {
    const result = await this.repository.updateOwnerById({
      p_user_id: userId,
      p_owner_name: ownerName,
    });

    if (result.error) {
      console.error("Error updating owner by id:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    return {
      data: "success",
    };
  }

  async getOrgDisplayByOrgAndUserId({
    orgId,
    userId,
  }: {
    orgId: string;
    userId: string;
  }): Promise<{
    data?: boolean;
    error?: string;
  }> {
    const request: GetOrgDisplayByOrgAndUserIdRequest = {
      p_organization_id: orgId,
      p_user_id: userId,
    };
    const { response, error } =
      await this.repository.getOrgDisplayByOrgAndUserId(request);

    if (error || !response) {
      console.error("Error getting org display:", error);
      return { error: error };
    }

    return {
      data: response,
    };
  }

  async updateOrgDisplayByOrgAndUserId({
    orgId,
    userId,
    display,
  }: {
    orgId: string;
    userId: string;
    display: boolean;
  }): Promise<{
    data?: string;
    error?: string;
  }> {
    const request: UpdateOrgDisplayByOrgAndUserIdRequest = {
      p_organization_id: orgId,
      p_user_id: userId,
      p_display: display,
    };
    const result = await this.repository.updateOrgDisplayByOrgAndUserId(
      request
    );

    if (result.error) {
      console.error(
        "Error updating org display by org and user id:",
        result.error
      );
      return { error: result.error ?? "unknown error" };
    }
    console.log("success");
    return {
      data: "success",
    };
  }

  async getProjectPinedByProjectAndUserId({
    projectId,
    userId,
  }: {
    projectId: string;
    userId: string;
  }): Promise<{
    data?: boolean;
    error?: string;
  }> {
    const { response, error } =
      await this.repository.getProjectPinedByProjectAndUserId({
        p_project_id: projectId,
        p_user_id: userId,
      });

    if (error || !response) {
      console.error("Error getting project pined:", error);
      return { error: error };
    }

    return {
      data: response,
    };
  }

  async updateProjectPinedByProjectAndUserId({
    projectId,
    userId,
    pined,
  }: {
    projectId: string;
    userId: string;
    pined: boolean;
  }): Promise<{
    data?: string;
    error?: string;
  }> {
    const { response, error } =
      await this.repository.updateProjectPinedByProjectAndUserId({
        p_project_id: projectId,
        p_user_id: userId,
        p_pined: pined,
      });

    if (error) {
      console.error(
        "Error updating project pined by project and user id:",
        error
      );
      return { error: error ?? "unknown error" };
    }
    return {
      data: "success",
    };
  }

  async leaveProjectByProjectAndUserId({
    projectId,
    userId,
  }: {
    projectId: string;
    userId: string;
  }): Promise<{
    data?: string;
    error?: string;
  }> {
    const request: LeaveProjectByProjectAndUserIdRequest = {
      p_project_id: projectId,
      p_user_id: userId,
    };
    const result = await this.repository.leaveProjectByProjectAndUserId(
      request
    );

    if (result.error) {
      console.error(
        "Error leaving project by project and user id:",
        result.error
      );
      return { error: result.error ?? "unknown error" };
    }
    return {
      data: "success",
    };
  }

  async leaveOrgDisplayByOrgAndUserId({
    orgId,
    userId,
  }: {
    orgId: string;
    userId: string;
  }): Promise<{
    data?: string;
    error?: string;
  }> {
    const { response, error } =
      await this.repository.leaveOrganizationByOrgAndUserId({
        p_organization_id: orgId,
        p_user_id: userId,
      });

    if (error) {
      console.error("Error updating org display by org and user id:", error);
      return { error: error ?? "unknown error" };
    }
    return {
      data: "success",
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
