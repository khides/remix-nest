import { Injectable } from '@nestjs/common';
import { UpdateOwnerRequestDto } from './dto/owner-body.dto';
import {
  GetOwnerIdByNameRequest,
  GetOwnerIdByNameResponse,
  GetUserAvatarUrlByIdRequest,
  GetUserAvatarUrlByIdResponse,
  GetUserInfoByEmailRequest,
  GetUserInfoByEmailResponse,
  GetUserProfileByIdRequest,
  GetUserProfileByIdResponse,
  GetUserReadmeByIdRequest,
  GetUserReadmeByIdResponse,
  LeaveOrganizationByOrgAndUserIdRequest,
  LeaveOrganizationByOrgAndUserIdResponse,
  LeaveProjectByProjectAndUserIdRequest,
  LeaveProjectByProjectAndUserIdResponse,
  UpdateOrgDisplayByOrgAndUserIdRequest,
  UpdateOrgDisplayByOrgAndUserIdResponse,
  UpdateOwnerByIdRequest,
  UpdateOwnerByIdResponse,
  UpdateProjectPinedByProjectAndUserIdRequest,
  UpdateProjectPinedByProjectAndUserIdResponse,
  UpdateUserAvatarUrlRequest,
  UpdateUserAvatarUrlResponse,
  UpdateUserProfileByIdRequest,
  UpdateUserProfileByIdResponse,
  UpdateUserReadmeByIdRequest,
  UpdateUserReadmeByIdResponse,
  GetUserNameByEmailRequest,
  GetUserNameByEmailResponse,
  GetEmailByUserNameRequest,
  GetEmailByUserNameResponse,
  GetOrgIdByNameRequest,
  GetOrgIdByNameResponse,
  GetOrganizationsByUserIdRequest,
  GetOrganizationsByUserIdResponse,
  GetUserProjectsByIdRequest,
  GetUserProjectsByIdResponse,
  GetUserInfosByIdsResponse,
  GetUserInfosByIdsRequest,
  HideUserProfileByIdRequest,
  HideUserProfileByIdResponse,
  GetUserHideByIdRequest,
  GetUserHideByIdResponse,
  GetOrgDisplayByOrgAndUserIdRequest,
  GetOrgDisplayByOrgAndUserIdResponse,
  GetProjectPinedByProjectAndUserIdRequest,
  GetProjectPinedByProjectAndUserIdResponse,
} from 'src/__generated__/supabase.interface';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class OwnersRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.getClient();
  }

  async getOwnerIdByName(
    request: GetOwnerIdByNameRequest,
  ): Promise<GetOwnerIdByNameResponse> {
    const { data, error } = await this.client.rpc(
      'get_owner_id_by_name',
      request,
    );
    if (error) {
      console.error('Error fetching owner ID by name:', error);
      throw new Error('Failed to fetch owner ID by name');
    }
    return data as GetOwnerIdByNameResponse;
  }

  async getUserProjectsById(
    request: GetUserProjectsByIdRequest,
  ): Promise<GetUserProjectsByIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_user_projects_by_id',
      request,
    );
    if (error) {
      console.error('Error fetching user projects:', error);
      throw new Error('Failed to fetch user projects');
    }
    return data as GetUserProjectsByIdResponse;
  }

  async getUserProfileById(
    request: GetUserProfileByIdRequest,
  ): Promise<GetUserProfileByIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_user_profile_by_id',
      request,
    );
    if (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
    return data as GetUserProfileByIdResponse;
  }

  async updateUserProfileById(
    request: UpdateUserProfileByIdRequest,
  ): Promise<UpdateUserProfileByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_user_profile_by_id',
      request,
    );
    if (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
    return data as UpdateUserProfileByIdResponse;
  }

  async updateUserAvatarUrl(
    request: UpdateUserAvatarUrlRequest,
  ): Promise<UpdateUserAvatarUrlResponse> {
    const { data, error } = await this.client.rpc(
      'update_user_avatar_url',
      request,
    );
    if (error) {
      console.error('Error updating user avatar URL:', error);
      throw new Error('Failed to update user avatar URL');
    }
    return data as UpdateUserAvatarUrlResponse;
  }

  async getUserAvatarUrlById(
    request: GetUserAvatarUrlByIdRequest,
  ): Promise<GetUserAvatarUrlByIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_user_avatar_url_by_id',
      request,
    );
    if (error) {
      console.error('Error fetching user avatar URL:', error);
      throw new Error('Failed to fetch user avatar URL');
    }
    return data as GetUserAvatarUrlByIdResponse;
  }

  async getUserReadmeById(
    request: GetUserReadmeByIdRequest,
  ): Promise<GetUserReadmeByIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_user_readme_by_id',
      request,
    );
    if (error) {
      console.error('Error fetching user readme:', error);
      throw new Error('Failed to fetch user readme');
    }
    return data as GetUserReadmeByIdResponse;
  }

  async updateUserReadmeById(
    request: UpdateUserReadmeByIdRequest,
  ): Promise<UpdateUserReadmeByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_user_readme_by_id',
      request,
    );
    if (error) {
      console.error('Error updating user readme:', error);
      throw new Error('Failed to update user readme');
    }
    return data as UpdateUserReadmeByIdResponse;
  }

  async updateOwnerById(
    request: UpdateOwnerByIdRequest,
  ): Promise<UpdateOwnerByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_owner_by_id',
      request,
    );
    if (error) {
      console.error('Error updating owner by ID:', error);
      throw new Error('Failed to update owner by ID');
    }
    return data as UpdateOwnerByIdResponse;
  }

  async getOrgDisplayByOrgAndUserId(
    request: GetOrgDisplayByOrgAndUserIdRequest,
  ): Promise<GetOrgDisplayByOrgAndUserIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_org_display_by_org_and_user_id',
      request,
    );
    if (error) {
      console.error('Error fetching org display by org and user ID:', error);
      throw new Error('Failed to fetch org display by org and user ID');
    }
    return data as GetOrgDisplayByOrgAndUserIdResponse;
  }

  async updateOrgDisplayByOrgAndUserId(
    request: UpdateOrgDisplayByOrgAndUserIdRequest,
  ): Promise<UpdateOrgDisplayByOrgAndUserIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_org_display_by_org_and_user_id',
      request,
    );
    if (error) {
      console.error('Error updating org display by org and user ID:', error);
      throw new Error('Failed to update org display by org and user ID');
    }
    return data as UpdateOrgDisplayByOrgAndUserIdResponse;
  }

  async getProjectPinedByProjectAndUserId(
    request: GetProjectPinedByProjectAndUserIdRequest,
  ): Promise<GetProjectPinedByProjectAndUserIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_project_pined_by_project_and_user_id',
      request,
    );
    if (error) {
      console.error(
        'Error fetching project pinned by project and user ID:',
        error,
      );
      throw new Error('Failed to fetch project pinned by project and user ID');
    }
    return data as GetProjectPinedByProjectAndUserIdResponse;
  }

  async updateProjectPinedByProjectAndUserId(
    request: UpdateProjectPinedByProjectAndUserIdRequest,
  ): Promise<UpdateProjectPinedByProjectAndUserIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_project_pined_by_project_and_user_id',
      request,
    );
    if (error) {
      console.error(
        'Error updating project pinned by project and user ID:',
        error,
      );
      throw new Error('Failed to update project pinned by project and user ID');
    }
    return data as UpdateProjectPinedByProjectAndUserIdResponse;
  }

  async leaveProjectByProjectAndUserId(
    request: LeaveProjectByProjectAndUserIdRequest,
  ): Promise<LeaveProjectByProjectAndUserIdResponse> {
    const { data, error } = await this.client.rpc(
      'leave_project_by_project_and_user_id',
      request,
    );
    if (error) {
      console.error('Error leaving project by project and user ID:', error);
      throw new Error('Failed to leave project by project and user ID');
    }
    return data as LeaveProjectByProjectAndUserIdResponse;
  }

  async leaveOrganizationByOrgAndUserId(
    request: LeaveOrganizationByOrgAndUserIdRequest,
  ): Promise<LeaveOrganizationByOrgAndUserIdResponse> {
    const { data, error } = await this.client.rpc(
      'leave_organization_by_org_and_user_id',
      request,
    );
    if (error) {
      console.error('Error leaving organization by org and user ID:', error);
      throw new Error('Failed to leave organization by org and user ID');
    }
    return data as LeaveOrganizationByOrgAndUserIdResponse;
  }

  async getOrgIdByName(
    request: GetOrgIdByNameRequest,
  ): Promise<GetOrgIdByNameResponse> {
    const { data, error } = await this.client.rpc(
      'get_org_id_by_name',
      request,
    );
    if (error) {
      console.error('Error fetching org ID by name:', error);
      throw new Error('Failed to fetch org ID by name');
    }
    return data as GetOrgIdByNameResponse;
  }

  async getOrganizationsByUserId(
    request: GetOrganizationsByUserIdRequest,
  ): Promise<GetOrganizationsByUserIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_organizations_by_user_id',
      request,
    );

    if (!data || error) {
      console.error('Error fetching organizations by user ID:', error);
      throw new Error('Failed to fetch organizations by user ID');
    }

    return data as GetOrganizationsByUserIdResponse;
  }

  // async getOrganizationById(orgId: string) {
  //   const { data, error } = await this.client
  //     .from('organizations')
  //     .select('*')
  //     .eq('id', orgId)
  //     .single();
  //   return { data, error };
  // }

  async getUserInfosByIds(
    request: GetUserInfosByIdsRequest,
  ): Promise<GetUserInfosByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_user_infos_by_ids',
      request,
    );
    if (error) {
      console.error('Error fetching user infos by IDs:', error);
      throw new Error('Failed to fetch user infos by IDs');
    }
    return data as GetUserInfosByIdsResponse;
  }

  async hideUserProfileById(
    request: HideUserProfileByIdRequest,
  ): Promise<HideUserProfileByIdResponse> {
    const { data, error } = await this.client.rpc(
      'hide_user_profile_by_id',
      request,
    );
    if (error) {
      console.error('Error hiding user profile by ID:', error);
      throw new Error('Failed to hide user profile by ID');
    }
    return data as HideUserProfileByIdResponse;
  }

  async getUserHideById(
    request: GetUserHideByIdRequest,
  ): Promise<GetUserHideByIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_user_hide_by_id',
      request,
    );
    if (error) {
      console.error('Error fetching user hide by ID:', error);
      throw new Error('Failed to fetch user hide by ID');
    }
    return data as GetUserHideByIdResponse;
  }
  async getUserLoggedIn(token?: string): Promise<{
    userId: string;
    email: string;
    username: string;
  }> {
    try {
      const { data, error } = await this.client.auth.getUser(token);

      if (error || !data?.user) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }

      const user = data.user;

      return {
        userId: user.id,
        email: user.email as string,
        username: user.user_metadata?.user_name || null,
      };
    } catch (err) {
      console.error('Error in getUserLoggedIn:', err);
      throw new Error('Failed to fetch user');
    }
  }

  async getUsernameByEmail(
    request: GetUserNameByEmailRequest,
  ): Promise<GetUserNameByEmailResponse> {
    const { data, error } = await this.client.rpc(
      'get_user_name_by_email',
      request,
    );
    if (error) {
      console.error('Error fetching username by email:', error);
      throw new Error('Failed to fetch username by email');
    }
    return data as GetUserNameByEmailResponse;
  }

  async getUserInfoByEmail(
    request: GetUserInfoByEmailRequest,
  ): Promise<GetUserInfoByEmailResponse> {
    const { data, error } = await this.client.rpc(
      'get_user_info_by_email',
      request,
    );
    if (error) {
      console.error('Error fetching user info by email:', error);
      throw new Error('Failed to fetch user info by email');
    }
    return data as GetUserInfoByEmailResponse;
  }

  async getEmailByUserName(
    request: GetEmailByUserNameRequest,
  ): Promise<GetEmailByUserNameResponse> {
    const { data, error } = await this.client.rpc(
      'get_email_by_user_name',
      request,
    );
    if (error) {
      console.error('Error fetching email by username:', error);
      throw new Error('Failed to fetch email by username');
    }
    return data as GetEmailByUserNameResponse;
  }
}
