import { ProjectRepository } from "~/supabase/Project/project.repository";
import { SupabaseServerClient } from "~/supabase/supabase.server";
import {
  CreateNewProjectRequest,
  GetProjectUsersByProjectIdRequest,
  GetProjectIdByNameRequest,
  GetProjectUserRolesByIdsRequest,
  InviteUserToProjectByEmailRequest,
  UpdateTagByIdRequest,
  HideTagByIdRequest,
  CreateNewTagRequest,
  SearchTagsByProjectIdRequest,
  SearchUsersByNameRequest,
  UpdateProjectUserRoleByUserIdRequest,
  HideProjectUserByIdRequest,
  UpdateProjectNameByIdRequest,
  HideProjectByIdRequest,
  UpdateProjectIconUrlByIdRequest,
  GetProjectIconUrlByIdRequest,
  GetTagsByProjectIdRequest,
  GetProjectUserIdsByIdRequest,
  GetUserProjectsAsOwnerRequest,
} from "~/supabase/__generated__/supabase.interface";
import {
  CreateNewProjectModel,
  ProjectUser,
  GetProjectUserRolesByIdsModel,
  GetProjectIdByNameModel,
  InviteUserToProject,
  UpdateTagById,
  HideTagById,
  CreateNewTag,
  SearchTags,
  SearchUsersByName,
  UpdateProjectUserRoleByUserId,
  HideProjectUserById,
  UpdateProjectNameById,
  HideProjectById,
  UpdateProjectIconUrl,
  GetProjectIconUrl,
  GetTagsByProjectIdModel,
  GetProjectUserIdsByIdModel,
  GetUserProjectsAsOwnerModel,
} from "~/supabase/Project/project.model";
import {
  uploadFileToStorage,
  getUploadedFileUrl,
} from "~/supabase/storage.supabase.server";
import { data } from "react-router";

export class ProjectService {
  constructor(supabase: SupabaseServerClient) {
    this.repository = new ProjectRepository(supabase);
  }
  private repository: ProjectRepository;

  /** 新しいプロジェクトを作成するメソッド
   * @param ownerId オーナーID
   * @param projectName プロジェクト名
   */
  async createNewProject({
    name,
    description,
    status,
    ownerId,
    creatorId,
  }: {
    name: string;
    description: string;
    status: string;
    ownerId: string;
    creatorId: string;
  }): Promise<{
    response?: CreateNewProjectModel;
    error?: string;
  }> {
    const request: CreateNewProjectRequest = {
      p_name: name,
      p_description: description,
      p_status: status,
      p_owner_ref: ownerId,
      p_creator_id: creatorId,
    };
    const result = await this.repository.createNewProject(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error creating new project:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: CreateNewProjectModel = {
      id: result.response[0].id,
      name: result.response[0].name,
      description: result.response[0].description,
      status: result.response[0].status,
      ownerId: result.response[0].owner_ref,
      creatorId: result.response[0].creator_id,
    };
    return {
      response: response,
    };
  }

  /** プロジェクトIDでプロジェクトユーザーを取得するメソッド
   * @param projectId プロジェクトID
   * @returns プロジェクトユーザー
   */
  async getProjectUsersByProjectId({
    projectId,
  }: {
    projectId: string;
  }): Promise<{
    response?: ProjectUser[];
    error?: string;
  }> {
    const request: GetProjectUsersByProjectIdRequest = {
      p_project_id: projectId,
    };
    const result = await this.repository.getProjectUsersByProjectId(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching users by project:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: ProjectUser[] = result.response.map((projectUser) => {
      return {
        userId: projectUser.user_id,
        role: projectUser.role,
        joinedAt: projectUser.joined_at,
        userName: projectUser.user_name,
        avatarUrl: projectUser.avatar_url,
      };
    });
    return {
      response: response,
    };
  }

  /** プロジェクト名からプロジェクトIDを取得するメソッド
   * @param projectName プロジェクト名
   * @param ownerId オーナーID
   */
  async getProjectIdByName({
    projectName,
    ownerId,
  }: {
    projectName: string;
    ownerId: string;
  }): Promise<{
    response?: GetProjectIdByNameModel;
    error?: string;
  }> {
    const request: GetProjectIdByNameRequest = {
      p_owner_id: ownerId,
      p_project_name: projectName,
    };
    const result = await this.repository.getProjectIdByName(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching project by name:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: GetProjectIdByNameModel = {
      projectId: result.response,
    };
    return {
      response: response,
    };
  }

  /** プロジェクトにユーザーのロールを取得するメソッド
   * @param projectId プロジェクトID
   * @param userId ユーザーID
   */
  async getProjectUserRolesByIds({
    projectId,
    userIds,
  }: {
    projectId: string;
    userIds: string[];
  }): Promise<{
    response?: GetProjectUserRolesByIdsModel;
    error?: string;
  }> {
    const request: GetProjectUserRolesByIdsRequest = {
      p_project_id: projectId,
      p_user_ids: userIds,
    };
    const result = await this.repository.getProjectUserRolesByIds(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching user role of project:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: GetProjectUserRolesByIdsModel = result.response.map(
      (user) => {
        return {
          userId: user.user_id,
          role: user.role,
        };
      }
    );

    return {
      response: response,
    };
  }

  /** プロジェクトにユーザーを招待するメソッド
   * @param projectId プロジェクトID
   * @param email メールアドレス
   * @param role ロール
   */
  async inviteUserToProjectByEmail({
    projectId,
    email,
  }: {
    projectId: string;
    email: string;
  }): Promise<{
    data?: InviteUserToProject;
    error?: string;
  }> {
    const request: InviteUserToProjectByEmailRequest = {
      p_project_id: projectId,
      p_email: email,
    };
    const result = await this.repository.inviteUserToProjectByEmail(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error inviting user to project:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: InviteUserToProject = {
      result: result.response,
    };
    return {
      data: data,
    };
  }

  async getTagsByProjectId({ projectId }: { projectId: string }): Promise<{
    response?: GetTagsByProjectIdModel;
    error?: string;
  }> {
    const request: GetTagsByProjectIdRequest = {
      p_project_id: projectId,
    };
    const result = await this.repository.getTagsByProjectId(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error get tags by project:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: GetTagsByProjectIdModel = result.response.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
        color: tag.color,
        description: tag.description,
      };
    });
    return {
      response: response,
    };
  }

  /** タグを更新するメソッド
   * @param tagId タグID
   * @param tag タグ
   */
  async updateTagById({
    tagId,
    name,
    description,
    color,
  }: {
    tagId: string;
    name: string;
    description: string;
    color: string;
  }): Promise<{
    data?: UpdateTagById;
    error?: string;
  }> {
    const request: UpdateTagByIdRequest = {
      p_tag_id: tagId,
      p_name: name,
      p_description: description,
      p_color: color,
    };
    await this.repository.updateTagById(request);
    // 追加のビジネスロジックをここに記述可能
    const data: UpdateTagById = {
      tagId: tagId,
    };
    return {
      data: data,
    };
  }

  /** タグを非表示にするメソッド
   * @param tagId タグID
   */
  async hideTagById({ tagId }: { tagId: string }): Promise<{
    data?: HideTagById;
    error?: string;
  }> {
    const request: HideTagByIdRequest = {
      p_tag_id: tagId,
    };
    await this.repository.hideTagById(request);
    // 追加のビジネスロジックをここに記述可能
    const data: HideTagById = {
      tagId: tagId,
    };
    return {
      data: data,
    };
  }

  /** 新しいタグを作成するメソッド
   * @param projectId プロジェクトID
   * @param name タグ名
   * @param description 説明
   * @param color カラー
   */
  async createNewTag({
    projectId,
    name,
    description,
    color,
    creatorId,
  }: {
    projectId: string;
    name: string;
    description: string;
    color: string;
    creatorId: string;
  }): Promise<{
    data?: CreateNewTag;
    error?: string;
  }> {
    const request: CreateNewTagRequest = {
      p_project_id: projectId,
      p_name: name,
      p_description: description,
      p_color: color,
      p_creator_id: creatorId,
    };
    const result = await this.repository.createNewTag(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error creating new tag:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: CreateNewTag = {
      newTagId: result.response,
    };
    return {
      data: data,
    };
  }

  /** プロジェクトIDからタグを検索するメソッド
   * @param projectId プロジェクトID
   */
  async searchTagsByProjectId({
    projectId,
    search,
  }: {
    projectId: string;
    search: string;
  }): Promise<{
    data?: SearchTags;
    error?: string;
  }> {
    const request: SearchTagsByProjectIdRequest = {
      p_project_id: projectId,
      p_search: search,
    };
    const result = await this.repository.searchTagsByProjectId(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error searching tags by project:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: SearchTags = {
      tags: result.response.map((tag) => {
        return {
          id: tag.id,
          name: tag.name,
          description: tag.description,
          color: tag.color,
        };
      }),
    };
    return {
      data: data,
    };
  }

  /** ユーザー名からユーザーを検索するメソッド
   * @param name ユーザー名
   */
  async searchUsersByName({
    name,
    limit,
  }: {
    name: string;
    limit: number;
  }): Promise<{
    response?: SearchUsersByName;
    error?: string;
  }> {
    const request: SearchUsersByNameRequest = {
      p_name_part: name,
      p_limit: limit,
    };
    const result = await this.repository.searchUsersByName(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error searching user by name:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: SearchUsersByName = result.response.map((user) => {
      return {
        id: user.id,
        name: user.user_name,
        avatarUrl: user.avatar_url,
      };
    });
    return {
      response: response,
    };
  }

  /** プロジェクトユーザーのロールを更新するメソッド
   * @param projectId プロジェクトID
   * @param userId ユーザーID
   * @param role ロール
   */
  async updateProjectUserRoleByUserId({
    projectId,
    userId,
    role,
  }: {
    projectId: string;
    userId: string;
    role: string;
  }): Promise<{
    data?: UpdateProjectUserRoleByUserId;
    error?: string;
  }> {
    const request: UpdateProjectUserRoleByUserIdRequest = {
      p_project_id: projectId,
      p_user_id: userId,
      p_role: role,
    };
    await this.repository.updateProjectUserRoleByUserId(request);
    // 追加のビジネスロジックをここに記述可能
    const data: UpdateProjectUserRoleByUserId = {};
    return {
      data: data,
    };
  }

  /** プロジェクトユーザーを非表示にするメソッド
   * @param projectId プロジェクトID
   * @param userId ユーザーID
   */
  async hideProjectUserById({
    projectId,
    userId,
  }: {
    projectId: string;
    userId: string;
  }): Promise<{
    data?: HideProjectUserById;
    error?: string;
  }> {
    const request: HideProjectUserByIdRequest = {
      p_project_id: projectId,
      p_user_id: userId,
    };
    await this.repository.hideProjectUserById(request);
    // 追加のビジネスロジックをここに記述可能
    const data: HideProjectUserById = {};
    return {
      data: data,
    };
  }

  /** プロジェクト名を更新するメソッド
   * @param projectId プロジェクトID
   * @param name プロジェクト名
   */
  async updateProjectNameById({
    projectId,
    name,
  }: {
    projectId: string;
    name: string;
  }): Promise<{
    data?: UpdateProjectNameById;
    error?: string;
  }> {
    const request: UpdateProjectNameByIdRequest = {
      p_project_id: projectId,
      p_name: name,
    };
    const { error } = await this.repository.updateProjectNameById(request);
    // 追加のビジネスロジックをここに記述可能
    const result: UpdateProjectNameById = {};
    return {
      data: result,
      error: error,
    };
  }

  /** プロジェクトを非表示にするメソッド
   * @param projectId プロジェクトID
   */
  async hideProjectById({
    projectId,
    hiderId,
  }: {
    projectId: string;
    hiderId: string;
  }): Promise<{
    data?: HideProjectById;
    error?: string;
  }> {
    const request: HideProjectByIdRequest = {
      p_project_id: projectId,
      p_hider_id: hiderId,
    };
    await this.repository.hideProjectById(request);
    // 追加のビジネスロジックをここに記述可能
    const data: HideProjectById = {};
    return {
      data: data,
    };
  }

  async uploadProjectImg({ file, projectId }: UploadProjectFile): Promise<{
    data?: UpdateProjectIconUrl;
    error?: string;
  }> {
    // FileをStorageにアップロード
    const uploadFileToStorageRequest = {
      bucket: "profiles",
      file: file,
      uuid: projectId,
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
    const updateAvatarUrlRequest: UpdateProjectIconUrlByIdRequest = {
      p_project_id: projectId,
      p_new_icon_url: imgUrl,
    };
    const { response, error } = await this.repository.updateProjectIconUrlById(
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

  async getProjectIconUrlById({ projectId }: { projectId: string }): Promise<{
    data?: GetProjectIconUrl;
    error?: string;
  }> {
    const request: GetProjectIconUrlByIdRequest = {
      p_project_id: projectId,
    };
    const { response, error } = await this.repository.getProjectIconUrlById(
      request
    );
    if (error || !response) {
      console.error("Error getting user avatar URL:", error);
      return { error: error };
    }
    const data: GetProjectIconUrl = {
      iconUrl: response[0].icon_url,
    };
    return {
      data: data,
    };
  }

  async getProjectUserIdsById({ projectId }: { projectId: string }): Promise<{
    response?: GetProjectUserIdsByIdModel;
    error?: string;
  }> {
    const request: GetProjectUserIdsByIdRequest = {
      p_project_id: projectId,
    };
    const result = await this.repository.getProjectUserIdsById(request);
    if (!result.response) {
      console.error("Error fetching project user ids:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const response: GetProjectUserIdsByIdModel = result.response;
    return {
      response: response,
    };
  }

  async getUserProjectsAsOwner({ userId }: { userId: string }): Promise<{
    data?: GetUserProjectsAsOwnerModel[];
    error?: string;
  }> {
    const request: GetUserProjectsAsOwnerRequest = {
      p_user_id: userId,
    };
    console.log("getUserProjectsAsOwner", request);
    const result = await this.repository.getUserProjectsAsOwner(request);
    if (!result.response) {
      console.error("Error fetching user projects as owner:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const data: GetUserProjectsAsOwnerModel[] = result.response.map(
      (project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        icon_url: project.icon_url,
        affiliation: project.affiliation,
        rhombus: project.rhombus,
        star: project.star,
        project_number: project.project_number,
      })
    );
    return {
      data: data,
    };
  }
}

export interface UploadProjectFile {
  file: File;
  projectId: string;
}

export interface GetUploadedFileUrl {
  bucket: string;
  filePath: string;
}
