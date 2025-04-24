import { SupabaseServerClient } from "~/supabase/supabase.server";
import {
  CreateNewProjectRequest,
  CreateNewProjectResponse,
  GetProjectUsersByProjectIdRequest,
  GetProjectUsersByProjectIdResponse,
  GetProjectIdByNameRequest,
  GetProjectIdByNameResponse,
  GetProjectUserRolesByIdsRequest,
  GetProjectUserRolesByIdsResponse,
  InviteUserToProjectByEmailRequest,
  InviteUserToProjectByEmailResponse,
  UpdateTagByIdRequest,
  UpdateTagByIdResponse,
  HideTagByIdRequest,
  HideTagByIdResponse,
  CreateNewTagRequest,
  CreateNewTagResponse,
  SearchTagsByProjectIdRequest,
  SearchTagsByProjectIdResponse,
  SearchUsersByNameRequest,
  SearchUsersByNameResponse,
  UpdateProjectUserRoleByUserIdRequest,
  UpdateProjectUserRoleByUserIdResponse,
  HideProjectUserByIdRequest,
  HideProjectUserByIdResponse,
  UpdateProjectNameByIdRequest,
  UpdateProjectNameByIdResponse,
  HideProjectByIdRequest,
  HideProjectByIdResponse,
  UpdateProjectIconUrlByIdRequest,
  UpdateProjectIconUrlByIdResponse,
  GetProjectIconUrlByIdRequest,
  GetProjectIconUrlByIdResponse,
  GetTagsByProjectIdRequest,
  GetTagsByProjectIdResponse,
  GetProjectUserIdsByIdRequest,
  GetProjectUserIdsByIdResponse,
  GetUserProjectsAsOwnerRequest,
  GetUserProjectsAsOwnerResponse,
} from "~/supabase/__generated__/supabase.interface";

export class ProjectRepository {
  constructor(private supabase: SupabaseServerClient) {}

  async createNewProject(request: CreateNewProjectRequest): Promise<{
    response?: CreateNewProjectResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_new_project",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as CreateNewProjectResponse };
  }

  async getProjectUsersByProjectId(
    request: GetProjectUsersByProjectIdRequest
  ): Promise<{
    response?: GetProjectUsersByProjectIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_project_users_by_project_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetProjectUsersByProjectIdResponse };
  }

  async getProjectIdByName(request: GetProjectIdByNameRequest): Promise<{
    response?: GetProjectIdByNameResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_project_id_by_name",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetProjectIdByNameResponse };
  }

  async getProjectUserRolesByIds(
    request: GetProjectUserRolesByIdsRequest
  ): Promise<{
    response?: GetProjectUserRolesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_project_user_roles_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetProjectUserRolesByIdsResponse };
  }

  async inviteUserToProjectByEmail(
    request: InviteUserToProjectByEmailRequest
  ): Promise<{
    response?: InviteUserToProjectByEmailResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "invite_user_to_project_by_email",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as InviteUserToProjectByEmailResponse };
  }

  async getTagsByProjectId(request: GetTagsByProjectIdRequest): Promise<{
    response?: GetTagsByProjectIdResponse;
    error?: string;
  }> {
    // RPC（ストアドプロシージャ）を使用してプロジェクトに関連するラベルを取得
    const { data, error } = await this.supabase.client.rpc(
      "get_tags_by_project_id",
      request
    );

    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTagsByProjectIdResponse,
    };
  }

  async updateTagById(request: UpdateTagByIdRequest): Promise<{
    response?: UpdateTagByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_tag_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateTagByIdResponse,
    };
  }

  async hideTagById(request: HideTagByIdRequest): Promise<{
    response?: HideTagByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_tag_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as HideTagByIdResponse };
  }

  async createNewTag(request: CreateNewTagRequest): Promise<{
    response?: CreateNewTagResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_new_tag",
      request
    );

    if (error) {
      return { error: error.message };
    }
    return { response: data as CreateNewTagResponse };
  }

  async searchTagsByProjectId(request: SearchTagsByProjectIdRequest): Promise<{
    response?: SearchTagsByProjectIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "search_tags_by_project_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as SearchTagsByProjectIdResponse };
  }

  async searchUsersByName(request: SearchUsersByNameRequest): Promise<{
    response?: SearchUsersByNameResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "search_users_by_name",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as SearchUsersByNameResponse };
  }

  async updateProjectUserRoleByUserId(
    request: UpdateProjectUserRoleByUserIdRequest
  ): Promise<{
    response?: UpdateProjectUserRoleByUserIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_project_user_role_by_user_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as UpdateProjectUserRoleByUserIdResponse };
  }

  async hideProjectUserById(request: HideProjectUserByIdRequest): Promise<{
    response?: HideProjectUserByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_project_user_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as HideProjectUserByIdResponse };
  }

  async updateProjectNameById(request: UpdateProjectNameByIdRequest): Promise<{
    response?: UpdateProjectNameByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_project_name_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as UpdateProjectNameByIdResponse };
  }

  async hideProjectById(request: HideProjectByIdRequest): Promise<{
    response?: HideProjectByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_project_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as HideProjectByIdResponse };
  }

  async updateProjectIconUrlById(
    request: UpdateProjectIconUrlByIdRequest
  ): Promise<{
    response?: UpdateProjectIconUrlByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_project_icon_url_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as UpdateProjectIconUrlByIdResponse };
  }

  async getProjectIconUrlById(request: GetProjectIconUrlByIdRequest): Promise<{
    response?: GetProjectIconUrlByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_project_icon_url_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetProjectIconUrlByIdResponse };
  }

  async getProjectUserIdsById(request: GetProjectUserIdsByIdRequest): Promise<{
    response?: GetProjectUserIdsByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_project_user_ids_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetProjectUserIdsByIdResponse };
  }

  async getUserProjectsAsOwner(
    request: GetUserProjectsAsOwnerRequest
  ): Promise<{
    response?: GetUserProjectsAsOwnerResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_user_projects_as_owner",
      request
    );
    console.log("Request Payload:", request);

    if (error) {
      return { error: error.message };
    }
    return { response: data as GetUserProjectsAsOwnerResponse };
  }
}
