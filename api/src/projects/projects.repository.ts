import { Injectable } from '@nestjs/common';
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
} from 'src/__generated__/supabase.interface';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ProjectsRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.getClient();
  }

  async createNewProject(
    request: CreateNewProjectRequest,
  ): Promise<CreateNewProjectResponse> {
    const { data, error } = await this.client.rpc(
      'create_new_project',
      request,
    );
    if (error) {
      console.error('Error creating new project:', error);
      throw new Error('Failed to create new project');
    }
    return data as CreateNewProjectResponse;
  }

  async getProjectUsersByProjectId(
    request: GetProjectUsersByProjectIdRequest,
  ): Promise<GetProjectUsersByProjectIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_project_users_by_project_id',
      request,
    );
    if (error) {
      console.error('Error fetching project users:', error);
      throw new Error('Failed to fetch project users');
    }
    return data as GetProjectUsersByProjectIdResponse;
  }

  async getProjectIdByName(
    request: GetProjectIdByNameRequest,
  ): Promise<GetProjectIdByNameResponse> {
    const { data, error } = await this.client.rpc(
      'get_project_id_by_name',
      request,
    );
    if (error) {
      console.error('Error fetching project ID by name:', error);
      throw new Error('Failed to fetch project ID by name');
    }
    return data as GetProjectIdByNameResponse;
  }

  async getProjectUserRolesByIds(
    request: GetProjectUserRolesByIdsRequest,
  ): Promise<GetProjectUserRolesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_project_user_roles_by_ids',
      request,
    );
    if (error) {
      console.error('Error fetching project user roles:', error);
      throw new Error('Failed to fetch project user roles');
    }
    return data as GetProjectUserRolesByIdsResponse;
  }

  async inviteUserToProjectByEmail(
    request: InviteUserToProjectByEmailRequest,
  ): Promise<InviteUserToProjectByEmailResponse> {
    const { data, error } = await this.client.rpc(
      'invite_user_to_project_by_email',
      request,
    );
    if (error) {
      console.error('Error inviting user to project:', error);
      throw new Error('Failed to invite user to project');
    }
    return data as InviteUserToProjectByEmailResponse;
  }

  async getTagsByProjectId(
    request: GetTagsByProjectIdRequest,
  ): Promise<GetTagsByProjectIdResponse> {
    // RPC（ストアドプロシージャ）を使用してプロジェクトに関連するラベルを取得
    const { data, error } = await this.client.rpc(
      'get_tags_by_project_id',
      request,
    );

    if (error) {
      console.error('Error fetching tags by project ID:', error);
      throw new Error('Failed to fetch tags by project ID');
    }
    return data as GetTagsByProjectIdResponse;
  }

  async updateTagById(
    request: UpdateTagByIdRequest,
  ): Promise<UpdateTagByIdResponse> {
    const { data, error } = await this.client.rpc('update_tag_by_id', request);
    if (error) {
      console.error('Error updating tag by ID:', error);
      throw new Error('Failed to update tag by ID');
    }
    return {
      response: data as UpdateTagByIdResponse,
    };
  }

  async hideTagById(request: HideTagByIdRequest): Promise<HideTagByIdResponse> {
    const { data, error } = await this.client.rpc('hide_tag_by_id', request);
    if (error) {
      console.error('Error hiding tag by ID:', error);
      throw new Error('Failed to hide tag by ID');
    }
    return data as HideTagByIdResponse;
  }

  async createNewTag(
    request: CreateNewTagRequest,
  ): Promise<CreateNewTagResponse> {
    const { data, error } = await this.client.rpc('create_new_tag', request);

    if (error) {
      console.error('Error creating new tag:', error);
      throw new Error('Failed to create new tag');
    }
    return data as CreateNewTagResponse;
  }

  async searchTagsByProjectId(
    request: SearchTagsByProjectIdRequest,
  ): Promise<SearchTagsByProjectIdResponse> {
    const { data, error } = await this.client.rpc(
      'search_tags_by_project_id',
      request,
    );
    if (error) {
      console.error('Error searching tags by project ID:', error);
      throw new Error('Failed to search tags by project ID');
    }
    return data as SearchTagsByProjectIdResponse;
  }

  async searchUsersByName(
    request: SearchUsersByNameRequest,
  ): Promise<SearchUsersByNameResponse> {
    const { data, error } = await this.client.rpc(
      'search_users_by_name',
      request,
    );
    if (error) {
      console.error('Error searching users by name:', error);
      throw new Error('Failed to search users by name');
    }
    return data as SearchUsersByNameResponse;
  }

  async updateProjectUserRoleByUserId(
    request: UpdateProjectUserRoleByUserIdRequest,
  ): Promise<UpdateProjectUserRoleByUserIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_project_user_role_by_user_id',
      request,
    );
    if (error) {
      console.error('Error updating project user role by user ID:', error);
      throw new Error('Failed to update project user role by user ID');
    }
    return data as UpdateProjectUserRoleByUserIdResponse;
  }

  async hideProjectUserById(
    request: HideProjectUserByIdRequest,
  ): Promise<HideProjectUserByIdResponse> {
    const { data, error } = await this.client.rpc(
      'hide_project_user_by_id',
      request,
    );
    if (error) {
      console.error('Error hiding project user by ID:', error);
      throw new Error('Failed to hide project user by ID');
    }
    return data as HideProjectUserByIdResponse;
  }

  async updateProjectNameById(
    request: UpdateProjectNameByIdRequest,
  ): Promise<UpdateProjectNameByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_project_name_by_id',
      request,
    );
    if (error) {
      console.error('Error updating project name by ID:', error);
      throw new Error('Failed to update project name by ID');
    }
    return data as UpdateProjectNameByIdResponse;
  }

  async hideProjectById(
    request: HideProjectByIdRequest,
  ): Promise<HideProjectByIdResponse> {
    const { data, error } = await this.client.rpc(
      'hide_project_by_id',
      request,
    );
    if (error) {
      console.error('Error hiding project by ID:', error);
      throw new Error('Failed to hide project by ID');
    }
    return data as HideProjectByIdResponse;
  }

  async updateProjectIconUrlById(
    request: UpdateProjectIconUrlByIdRequest,
  ): Promise<UpdateProjectIconUrlByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_project_icon_url_by_id',
      request,
    );
    if (error) {
      console.error('Error updating project icon URL by ID:', error);
      throw new Error('Failed to update project icon URL by ID');
    }
    return data as UpdateProjectIconUrlByIdResponse;
  }

  async getProjectIconUrlById(
    request: GetProjectIconUrlByIdRequest,
  ): Promise<GetProjectIconUrlByIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_project_icon_url_by_id',
      request,
    );
    if (error) {
      console.error('Error fetching project icon URL by ID:', error);
      throw new Error('Failed to fetch project icon URL by ID');
    }
    return data as GetProjectIconUrlByIdResponse;
  }

  async getProjectUserIdsById(
    request: GetProjectUserIdsByIdRequest,
  ): Promise<GetProjectUserIdsByIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_project_user_ids_by_id',
      request,
    );
    if (error) {
      console.error('Error fetching project user IDs by ID:', error);
      throw new Error('Failed to fetch project user IDs by ID');
    }
    return data as GetProjectUserIdsByIdResponse;
  }

  async getUserProjectsAsOwner(
    request: GetUserProjectsAsOwnerRequest,
  ): Promise<GetUserProjectsAsOwnerResponse> {
    const { data, error } = await this.client.rpc(
      'get_user_projects_as_owner',
      request,
    );
    if (error) {
      console.error('Error fetching user projects as owner:', error);
      throw new Error('Failed to fetch user projects as owner');
    }
    return data as GetUserProjectsAsOwnerResponse;
  }
}
