import { SupabaseServerClient } from "~/supabase/supabase.server";
import {
  GetOwnerIdByNameRequest,
  GetOwnerIdByNameResponse,
  GetUserProfileByIdRequest,
  GetUserProfileByIdResponse,
  GetUserProjectsByIdRequest,
  GetUserProjectsByIdResponse,
  UpdateUserProfileByIdRequest,
  UpdateUserProfileByIdResponse,
  UpdateUserAvatarUrlRequest,
  UpdateUserAvatarUrlResponse,
  GetUserAvatarUrlByIdRequest,
  GetUserAvatarUrlByIdResponse,
  GetUserReadmeByIdRequest,
  GetUserReadmeByIdResponse,
  UpdateUserReadmeByIdRequest,
  UpdateUserReadmeByIdResponse,
  UpdateOwnerByIdRequest,
  UpdateOwnerByIdResponse,
  GetOrgDisplayByOrgAndUserIdRequest,
  GetOrgDisplayByOrgAndUserIdResponse,
  UpdateOrgDisplayByOrgAndUserIdRequest,
  UpdateOrgDisplayByOrgAndUserIdResponse,
  GetProjectPinedByProjectAndUserIdRequest,
  GetProjectPinedByProjectAndUserIdResponse,
  UpdateProjectPinedByProjectAndUserIdRequest,
  UpdateProjectPinedByProjectAndUserIdResponse,
  LeaveOrganizationByOrgAndUserIdRequest,
  LeaveOrganizationByOrgAndUserIdResponse,
  LeaveProjectByProjectAndUserIdRequest,
  LeaveProjectByProjectAndUserIdResponse,
} from "~/supabase/__generated__/supabase.interface";

export class OwnerRepository {
  constructor(private supabase: SupabaseServerClient) {}

  async getOwnerIdByName(request: GetOwnerIdByNameRequest): Promise<{
    response?: GetOwnerIdByNameResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_owner_id_by_name",
      request
    );

    if (error) {
      console.log("Error fetching owner by name:", error);
      return { error: error.message };
    }
    return { response: data as GetOwnerIdByNameResponse };
  }

  async getUserProjectsById(request: GetUserProjectsByIdRequest): Promise<{
    response?: GetUserProjectsByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_user_projects_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetUserProjectsByIdResponse };
  }

  async getUserProfileById(request: GetUserProfileByIdRequest): Promise<{
    response?: GetUserProfileByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_user_profile_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetUserProfileByIdResponse };
  }

  async updateUserProfileById(request: UpdateUserProfileByIdRequest): Promise<{
    response?: UpdateUserProfileByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_user_profile_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as UpdateUserProfileByIdResponse };
  }

  async updateUserAvatarUrl(request: UpdateUserAvatarUrlRequest): Promise<{
    response?: UpdateUserAvatarUrlResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_user_avatar_url",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as UpdateUserAvatarUrlResponse };
  }

  async getUserAvatarUrlById(request: GetUserAvatarUrlByIdRequest): Promise<{
    response?: GetUserAvatarUrlByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_user_avatar_url_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetUserAvatarUrlByIdResponse };
  }

  async getUserReadmeById(request: GetUserReadmeByIdRequest): Promise<{
    response?: GetUserReadmeByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_user_readme_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetUserReadmeByIdResponse };
  }

  async updateUserReadmeById(request: UpdateUserReadmeByIdRequest): Promise<{
    response?: UpdateUserReadmeByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_user_readme_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as UpdateUserReadmeByIdResponse };
  }

  async updateOwnerById(request: UpdateOwnerByIdRequest): Promise<{
    response?: UpdateOwnerByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_owner_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as UpdateOwnerByIdResponse };
  }

  async getOrgDisplayByOrgAndUserId(
    request: GetOrgDisplayByOrgAndUserIdRequest
  ): Promise<{
    response?: GetOrgDisplayByOrgAndUserIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_org_display_by_org_and_user_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetOrgDisplayByOrgAndUserIdResponse };
  }

  async updateOrgDisplayByOrgAndUserId(
    request: UpdateOrgDisplayByOrgAndUserIdRequest
  ): Promise<{
    response?: UpdateOrgDisplayByOrgAndUserIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_org_display_by_org_and_user_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as UpdateOrgDisplayByOrgAndUserIdResponse };
  }

  async getProjectPinedByProjectAndUserId(
    request: GetProjectPinedByProjectAndUserIdRequest
  ): Promise<{
    response?: GetProjectPinedByProjectAndUserIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_project_pined_by_project_and_user_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetProjectPinedByProjectAndUserIdResponse };
  }

  async updateProjectPinedByProjectAndUserId(
    request: UpdateProjectPinedByProjectAndUserIdRequest
  ): Promise<{
    response?: UpdateProjectPinedByProjectAndUserIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_project_pined_by_project_and_user_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as UpdateProjectPinedByProjectAndUserIdResponse };
  }

  async leaveProjectByProjectAndUserId(
    request: LeaveProjectByProjectAndUserIdRequest
  ): Promise<{
    response?: LeaveProjectByProjectAndUserIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "leave_project_by_project_and_user_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as LeaveProjectByProjectAndUserIdResponse };
  }

  async leaveOrganizationByOrgAndUserId(
    request: LeaveOrganizationByOrgAndUserIdRequest
  ): Promise<{
    response?: LeaveOrganizationByOrgAndUserIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "leave_organization_by_org_and_user_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as LeaveOrganizationByOrgAndUserIdResponse };
  }
}
