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
  GetUserInfosByIdsResponse,
  GetUserInfosByIdsRequest,
  HideUserProfileByIdRequest,
  HideUserProfileByIdResponse,
  GetUserHideByIdRequest,
  GetUserHideByIdResponse,
} from "~/supabase/__generated__/supabase.interface";

export class UserRepository {
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
  async getUserInfosByIds(request: GetUserInfosByIdsRequest): Promise<{
    response?: GetUserInfosByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_user_infos_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetUserInfosByIdsResponse };
  }

  async hideUserProfileById(request: HideUserProfileByIdRequest): Promise<{
    response?: HideUserProfileByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_user_profile_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as HideUserProfileByIdResponse };
  }

  async getUserHideById(request: GetUserHideByIdRequest): Promise<{
    response?: GetUserHideByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_user_hide_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return { response: data as GetUserHideByIdResponse };
  }
}
