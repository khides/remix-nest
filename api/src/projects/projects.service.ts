import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
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
  GetTagsByProjectIdResponse,
} from 'src/__generated__/supabase.interface';

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
  UploadProjectFile,
} from './entities/project.entity';
import {
  getUploadedFileUrl,
  uploadFileToStorage,
} from 'src/supabase/supabase.storage';
@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

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
  }): Promise<CreateNewProjectModel> {
    const request: CreateNewProjectRequest = {
      p_name: name,
      p_description: description,
      p_status: status,
      p_owner_ref: ownerId,
      p_creator_id: creatorId,
    };
    let project: CreateNewProjectModel;
    try {
      const result = await this.projectsRepository.createNewProject(request);
      project = {
        id: result[0].id,
        name: result[0].name,
        description: result[0].description,
        status: result[0].status,
        ownerId: result[0].owner_ref,
        creatorId: result[0].creator_id,
      };
    } catch (error) {
      console.error('Error creating new project:', error);
      throw new HttpException(
        'Error creating new project',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return project;
  }

  async getProjectUsersByProjectId({
    projectId,
  }: {
    projectId: string;
  }): Promise<ProjectUser[]> {
    const request: GetProjectUsersByProjectIdRequest = {
      p_project_id: projectId,
    };
    let projectUser: ProjectUser[];
    try {
      const result =
        await this.projectsRepository.getProjectUsersByProjectId(request);
      projectUser = result.map((projectUser) => {
        return {
          userId: projectUser.user_id,
          role: projectUser.role,
          joinedAt: projectUser.joined_at,
          userName: projectUser.user_name,
          avatarUrl: projectUser.avatar_url,
        };
      });
    } catch (error) {
      console.error('Error fetching project users:', error);
      throw new HttpException(
        'Error fetching project users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return projectUser;
  }

  async getProjectIdByName({
    projectName,
    ownerId,
  }: {
    projectName: string;
    ownerId: string;
  }): Promise<GetProjectIdByNameModel> {
    const request: GetProjectIdByNameRequest = {
      p_owner_id: ownerId,
      p_project_name: projectName,
    };
    try {
      const result = await this.projectsRepository.getProjectIdByName(request);
      // 追加のビジネスロジックをここに記述可能
      const response: GetProjectIdByNameModel = {
        projectId: result,
      };
      return response;
    } catch (error) {
      console.error('Error fetching project ID by name:', error);
      throw new HttpException(
        'Error fetching project ID by name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProjectUserRolesByIds({
    projectId,
    userIds,
  }: {
    projectId: string;
    userIds: string[];
  }): Promise<GetProjectUserRolesByIdsModel> {
    const request: GetProjectUserRolesByIdsRequest = {
      p_project_id: projectId,
      p_user_ids: userIds,
    };
    try {
      const result =
        await this.projectsRepository.getProjectUserRolesByIds(request);
      const response: GetProjectUserRolesByIdsModel = result.map((user) => {
        return {
          userId: user.user_id,
          role: user.role,
        };
      });
      return response;
    } catch (error) {
      console.error('Error fetching project user roles:', error);
      throw new HttpException(
        'Error fetching project user roles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async inviteUserToProjectByEmail({
    projectId,
    email,
  }: {
    projectId: string;
    email: string;
  }): Promise<InviteUserToProject> {
    const request: InviteUserToProjectByEmailRequest = {
      p_project_id: projectId,
      p_email: email,
    };
    try {
      const result =
        await this.projectsRepository.inviteUserToProjectByEmail(request);
      // 追加のビジネスロジックをここに記述可能
      const data: InviteUserToProject = {
        result: result,
      };
      return data;
    } catch (error) {
      console.error('Error inviting user to project:', error);
      throw new HttpException(
        'Error inviting user to project',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTagsByProjectId({
    projectId,
  }: {
    projectId: string;
  }): Promise<GetTagsByProjectIdModel> {
    const request: GetTagsByProjectIdRequest = {
      p_project_id: projectId,
    };
    let tags: GetTagsByProjectIdResponse;
    try {
      const result = await this.projectsRepository.getTagsByProjectId(request);
      tags = result;
    } catch (error) {
      console.error('Error fetching tags by project:', error);
      throw new HttpException(
        'Error fetching tags by project',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 追加のビジネスロジックをここに記述可能
    const data: GetTagsByProjectIdModel = tags.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
        color: tag.color,
        description: tag.description,
      };
    });
    return data;
  }

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
  }): Promise<UpdateTagById> {
    const request: UpdateTagByIdRequest = {
      p_tag_id: tagId,
      p_name: name,
      p_description: description,
      p_color: color,
    };
    try {
      await this.projectsRepository.updateTagById(request);
      // 追加のビジネスロジックをここに記述可能
      const data: UpdateTagById = {
        tagId: tagId,
      };
      return data;
    } catch (error) {
      console.error('Error updating tag by ID:', error);
      throw new HttpException(
        'Error updating tag by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hideTagById({ tagId }: { tagId: string }): Promise<HideTagById> {
    const request: HideTagByIdRequest = {
      p_tag_id: tagId,
    };
    try {
      await this.projectsRepository.hideTagById(request);
      // 追加のビジネスロジックをここに記述可能
      const data: HideTagById = {
        tagId: tagId,
      };
      return data;
    } catch (error) {
      console.error('Error hiding tag by ID:', error);
      throw new HttpException(
        'Error hiding tag by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

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
  }): Promise<CreateNewTag> {
    const request: CreateNewTagRequest = {
      p_project_id: projectId,
      p_name: name,
      p_description: description,
      p_color: color,
      p_creator_id: creatorId,
    };
    try {
      const result = await this.projectsRepository.createNewTag(request);
      // 追加のビジネスロジックをここに記述可能
      const data: CreateNewTag = {
        newTagId: result,
      };
      return data;
    } catch (error) {
      console.error('Error creating new tag:', error);
      throw new HttpException(
        'Error creating new tag',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchTagsByProjectId({
    projectId,
    search,
  }: {
    projectId: string;
    search: string;
  }): Promise<SearchTags> {
    const request: SearchTagsByProjectIdRequest = {
      p_project_id: projectId,
      p_search: search,
    };
    try {
      const result =
        await this.projectsRepository.searchTagsByProjectId(request);
      // 追加のビジネスロジックをここに記述可能
      const data: SearchTags = {
        tags: result.map((tag) => {
          return {
            id: tag.id,
            name: tag.name,
            description: tag.description,
            color: tag.color,
          };
        }),
      };
      return data;
    } catch (error) {
      console.error('Error searching tags by project ID:', error);
      throw new HttpException(
        'Error searching tags by project ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchUsersByName({
    name,
    limit,
  }: {
    name: string;
    limit: number;
  }): Promise<SearchUsersByName> {
    const request: SearchUsersByNameRequest = {
      p_name_part: name,
      p_limit: limit,
    };
    try {
      const result = await this.projectsRepository.searchUsersByName(request);
      // 追加のビジネスロジックをここに記述可能
      const response: SearchUsersByName = result.map((user) => {
        return {
          id: user.id,
          name: user.user_name,
          avatarUrl: user.avatar_url,
        };
      });
      return response;
    } catch (error) {
      console.error('Error searching users by name:', error);
      throw new HttpException(
        'Error searching users by name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProjectUserRoleByUserId({
    projectId,
    userId,
    role,
  }: {
    projectId: string;
    userId: string;
    role: string;
  }): Promise<UpdateProjectUserRoleByUserId> {
    const request: UpdateProjectUserRoleByUserIdRequest = {
      p_project_id: projectId,
      p_user_id: userId,
      p_role: role,
    };
    try {
      await this.projectsRepository.updateProjectUserRoleByUserId(request);
      // 追加のビジネスロジックをここに記述可能
      const data: UpdateProjectUserRoleByUserId = {};
      return data;
    } catch (error) {
      console.error('Error updating project user role by user ID:', error);
      throw new HttpException(
        'Error updating project user role by user ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hideProjectUserById({
    projectId,
    userId,
  }: {
    projectId: string;
    userId: string;
  }): Promise<HideProjectUserById> {
    const request: HideProjectUserByIdRequest = {
      p_project_id: projectId,
      p_user_id: userId,
    };
    try {
      await this.projectsRepository.hideProjectUserById(request);
      // 追加のビジネスロジックをここに記述可能
      const data: HideProjectUserById = {};
      return data;
    } catch (error) {
      console.error('Error hiding project user by ID:', error);
      throw new HttpException(
        'Error hiding project user by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProjectNameById({
    projectId,
    name,
  }: {
    projectId: string;
    name: string;
  }): Promise<UpdateProjectNameById> {
    const request: UpdateProjectNameByIdRequest = {
      p_project_id: projectId,
      p_name: name,
    };
    try {
      const data = await this.projectsRepository.updateProjectNameById(request);
      // 追加のビジネスロジックをここに記述可能
      const result: UpdateProjectNameById = {};
      return result;
    } catch (error) {
      console.error('Error updating project name by ID:', error);
      throw new HttpException(
        'Error updating project name by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hideProjectById({
    projectId,
    hiderId,
  }: {
    projectId: string;
    hiderId: string;
  }): Promise<HideProjectById> {
    const request: HideProjectByIdRequest = {
      p_project_id: projectId,
      p_hider_id: hiderId,
    };
    try {
      await this.projectsRepository.hideProjectById(request);
      // 追加のビジネスロジックをここに記述可能
      const data: HideProjectById = {};
      return data;
    } catch (error) {
      console.error('Error hiding project by ID:', error);
      throw new HttpException(
        'Error hiding project by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadProjectImg({
    file,
    projectId,
  }: UploadProjectFile): Promise<UpdateProjectIconUrl> {
    // FileをStorageにアップロード
    const uploadFileToStorageRequest = {
      bucket: 'profiles',
      file: file,
      uuid: projectId,
    };
    const data = await uploadFileToStorage(uploadFileToStorageRequest);
    if (!data || !data.data?.path) {
      console.error('Error uploading file:', data);
      throw new HttpException(
        'Error uploading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 公開URLを取得
    const getUploadedFileUrlRequest = {
      bucket: 'profiles',
      filePath: data.data?.path,
    };
    const publicUrlData = await getUploadedFileUrl(getUploadedFileUrlRequest);
    if (!publicUrlData) {
      console.error('Error getting public URL:', publicUrlData);
      throw new HttpException(
        'Error getting public URL',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // ローカル環境のURLに変換
    const localurl = process.env.VITE_SUPABASE_URL ?? '';
    const publicurl = process.env.SUPABASE_URL ?? '';
    let imgUrl: string;
    if (publicUrlData.publicUrl.includes(localurl)) {
      imgUrl = publicUrlData.publicUrl;
    } else {
      imgUrl = publicUrlData.publicUrl.replace(publicurl, localurl);
    }

    console.log('Image URL:', imgUrl);

    // ユーザーのプロフィール画像URLを更新
    const updateAvatarUrlRequest: UpdateProjectIconUrlByIdRequest = {
      p_project_id: projectId,
      p_new_icon_url: imgUrl,
    };
    try {
      const result = await this.projectsRepository.updateProjectIconUrlById(
        updateAvatarUrlRequest,
      );
      return result;
    } catch (error) {
      console.error('Error updating project icon URL:', error);
      throw new HttpException(
        'Error updating project icon URL',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProjectIconUrlById({
    projectId,
  }: {
    projectId: string;
  }): Promise<GetProjectIconUrl> {
    const request: GetProjectIconUrlByIdRequest = {
      p_project_id: projectId,
    };
    try {
      const result =
        await this.projectsRepository.getProjectIconUrlById(request);
      const data: GetProjectIconUrl = {
        iconUrl: result[0].icon_url,
      };
      return data;
    } catch (error) {
      console.error('Error fetching project icon URL by ID:', error);
      throw new HttpException(
        'Error fetching project icon URL by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProjectUserIdsById({
    projectId,
  }: {
    projectId: string;
  }): Promise<GetProjectUserIdsByIdModel> {
    const request: GetProjectUserIdsByIdRequest = {
      p_project_id: projectId,
    };
    try {
      const result =
        await this.projectsRepository.getProjectUserIdsById(request);
      return result;
    } catch (error) {
      console.error('Error fetching project user IDs by ID:', error);
      throw new HttpException(
        'Error fetching project user IDs by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserProjectsAsOwner({
    userId,
  }: {
    userId: string;
  }): Promise<GetUserProjectsAsOwnerModel[]> {
    const request: GetUserProjectsAsOwnerRequest = {
      p_user_id: userId,
    };
    try {
      const result =
        await this.projectsRepository.getUserProjectsAsOwner(request);
      const data: GetUserProjectsAsOwnerModel[] = result.map((project) => {
        return {
          id: project.id,
          name: project.name,
          description: project.description,
          status: project.status,
          iconUrl: project.icon_url,
          affiliation: project.affiliation,
          rhombus: project.rhombus,
          star: project.star,
          projectNumber: project.project_number,
        };
      });
      return data;
    } catch (error) {
      console.error('Error fetching user projects as owner:', error);
      throw new HttpException(
        'Error fetching user projects as owner',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
