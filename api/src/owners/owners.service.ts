import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OwnersRepository } from './owners.repository';
import {
  LeaveOrgRequestDto,
  LeaveProjectRequestDto,
  UpdateOrgDisplayRequestDto,
  UpdateOwnerRequestDto,
  UpdatePinRequestDto,
} from './dto/owner-body.dto';
import {
  GetOrganizationsByUserIdModel,
  GetOrgIdByNameModel,
  GetUserInfoByEmail,
  GetUserLoggedIn,
  Org,
  Owner,
  UploadUserFile,
  User,
} from './entities/owner.entity';
import {
  uploadFileToStorage,
  getUploadedFileUrl,
  deleteFileFromStorage,
} from 'src/supabase/supabase.storage'; // 自作ユーティリティ
import {
  GetUserInfoByEmailRequest,
  GetUserInfoByEmailResponse,
  GetUserInfosByIdsRequest,
  GetUserProfileByIdRequest,
  GetUserProfileByIdResponse,
  GetUserProjectsByIdRequest,
  GetUserProjectsByIdResponse,
  GetEmailByUserNameRequest,
  GetUserNameByEmailRequest,
  GetOrgIdByNameRequest,
  GetOrganizationsByUserIdRequest,
  GetOwnerIdByNameRequest,
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
  HideUserProfileByIdRequest,
  GetUserHideByIdRequest,
} from 'src/__generated__/supabase.interface';
import {
  OwnerId,
  UserProfile,
  UserProject,
  UpdateUserAvatarUrl,
  GetUserAvatarUrl,
} from './entities/owner.entity';
import { SupabaseService } from 'src/supabase/supabase.service';
import { promiseAll } from 'helpers/utills';

@Injectable()
export class OwnersService {
  constructor(
    private readonly ownersRepository: OwnersRepository,
    private readonly supabaseService: SupabaseService,
  ) {}

  private get client() {
    return this.supabaseService.getClient();
  }

  async getOwnerIdByName({
    ownerName,
  }: {
    ownerName: string;
  }): Promise<OwnerId> {
    try {
      const request: GetOwnerIdByNameRequest = {
        p_owner_name: ownerName,
      };
      const result = await this.ownersRepository.getOwnerIdByName(request);
      if (result.length === 0) {
        throw new HttpException(
          { message: `User not found` },
          HttpStatus.NOT_FOUND,
        );
      }
      const data: OwnerId = {
        ownerId: result,
      };
      return data;
    } catch (error) {
      console.error('Error fetching owner ID by name:', error);
      throw new HttpException(
        { message: `Failed to fetch owner ID: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserProjectsById({
    userId,
  }: {
    userId: string;
  }): Promise<UserProject[]> {
    try {
      const request: GetUserProjectsByIdRequest = {
        p_user_id: userId,
      };
      const result = await this.ownersRepository.getUserProjectsById(request);
      // 追加のビジネスロジックをここに記述可能
      const data: UserProject[] = result.map((project) => ({
        id: project.project_id,
        name: project.project_name,
        description: project.description,
        status: project.status as 'Open' | 'Closed',
        role: project.role,
        ownerName: project.owner_name,
      }));
      return data;
    } catch (error) {
      console.error('Error fetching user projects by id:', error);
      throw new HttpException(
        { message: `Failed to fetch user projects: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserProfileById({
    userId,
  }: {
    userId: string;
  }): Promise<UserProfile> {
    try {
      const request: GetUserProfileByIdRequest = {
        p_user_id: userId,
      };
      const result = await this.ownersRepository.getUserProfileById(request);
      const data: UserProfile = {
        userId: userId,
        username: result[0].user_name,
        fullname: result[0].full_name,
        email: result[0].email,
        avatarUrl: result[0].avatar_url,
      };
      return data;
    } catch (error) {
      console.error('Error fetching user profile by id:', error);
      throw new HttpException(
        { message: `Failed to fetch user profile: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
  }): Promise<string> {
    try {
      const request: UpdateUserProfileByIdRequest = {
        p_user_id: userId,
        p_user_name: username,
        p_full_name: fullname,
        p_email: email,
        p_avatar_url: avatarUrl,
      };
      const result = await this.ownersRepository.updateUserProfileById(request);
      return 'success';
    } catch (error) {
      console.error('Error updating user profile by id:', error);
      throw new HttpException(
        { message: `Failed to update user profile: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserProfileByName({
    ownerName,
    dto,
  }: {
    ownerName: string;
    dto: UpdateOwnerRequestDto;
  }): Promise<string> {
    let userId: string;
    try {
      const result = await this.getOwnerIdByName({ ownerName });
      userId = result.ownerId;
    } catch (error) {
      console.error('Error fetching user IDs by names:', error);
      throw new HttpException(
        { message: `Failed to fetch user IDs: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const result = await this.updateUserProfileById({
        userId,
        username: dto.username,
        fullname: dto.fullname,
        email: dto.email,
        avatarUrl: dto.avatarUrl ?? '',
      });
      return 'success';
    } catch (error) {
      console.error('Error updating user profile by name:', error);
      throw new HttpException(
        { message: `Failed to update user profile: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadUserImg({
    file,
    userId,
  }: UploadUserFile): Promise<UpdateUserAvatarUrl> {
    // FileをStorageにアップロード
    let path: string;
    try {
      const uploadFileToStorageRequest = {
        bucket: 'profiles',
        file: file,
        uuid: userId,
      };

      const result = await uploadFileToStorage(uploadFileToStorageRequest);
      if (!result.data) {
        throw new Error('Error uploading file');
      }
      path = result.data?.path;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new HttpException(
        { message: `Failed to upload file: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 公開URLを取得
    let publicUrl: string;
    try {
      const getUploadedFileUrlRequest = {
        bucket: 'profiles',
        filePath: path,
      };
      const publicUrlData = await getUploadedFileUrl(getUploadedFileUrlRequest);
      if (!publicUrlData) {
        throw new Error('Error getting public URL');
      }
      publicUrl = publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error getting public URL:', error);
      throw new HttpException(
        { message: `Failed to get public URL: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // ローカル環境のURLに変換
    const localurl = process.env.VITE_SUPABASE_URL ?? '';
    const publicurl = process.env.SUPABASE_URL ?? '';
    let imgUrl: string;
    if (publicUrl.includes(localurl)) {
      imgUrl = publicUrl;
    } else {
      imgUrl = publicUrl.replace(publicurl, localurl);
    }

    // ユーザーのプロフィール画像URLを更新
    try {
      const updateAvatarUrlRequest: UpdateUserAvatarUrlRequest = {
        p_user_id: userId,
        p_new_avatar_url: imgUrl,
      };
      const result = await this.ownersRepository.updateUserAvatarUrl(
        updateAvatarUrlRequest,
      );
      return result;
    } catch (error) {
      console.error('Error updating avatar URL:', error);
      throw new HttpException(
        { message: `Failed to update avatar URL: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadUserImgByName({
    file,
    ownerName,
  }: {
    file: File;
    ownerName: string;
  }): Promise<UpdateUserAvatarUrl> {
    let userId: string;
    try {
      const result = await this.getOwnerIdByName({ ownerName });
      userId = result.ownerId;
    } catch (error) {
      console.error('Error fetching user IDs by names:', error);
      throw new HttpException(
        { message: `Failed to fetch user IDs: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const result = await this.uploadUserImg({
        file,
        userId,
      });
      return result;
    } catch (error) {
      console.error('Error uploading user image by name:', error);
      throw new HttpException(
        { message: `Failed to upload user image: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUserImg({
    filePath,
  }: {
    filePath: string;
    userId: string;
  }): Promise<string> {
    if (filePath === '') {
      console.error('Error deleting user image: No file path provided');
      throw new HttpException(
        { message: `No file path provided` },
        HttpStatus.BAD_REQUEST,
      );
    }
    const regex = /profiles\/(.*)/;
    const match = filePath.match(regex);
    try {
      const deleteFileFromStorageRequest = {
        bucket: 'profiles',
        filePath: match ? match[1] : '',
      };
      const data = await deleteFileFromStorage(deleteFileFromStorageRequest);
      if (!data) {
        console.error('Error deleting user image: No data returned');
        throw new HttpException(
          { message: `No data returned` },
          HttpStatus.NOT_FOUND,
        );
      }
      return 'success';
    } catch (error) {
      console.error('Error deleting user image:', error);
      throw new HttpException(
        { message: `Failed to delete user image: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserAvatarUrlById({
    userId,
  }: {
    userId: string;
  }): Promise<GetUserAvatarUrl> {
    try {
      const request: GetUserAvatarUrlByIdRequest = {
        p_user_id: userId,
      };
      const result = await this.ownersRepository.getUserAvatarUrlById(request);
      const data: GetUserAvatarUrl = {
        avaterUrl: result[0].avatar_url,
      };
      return data;
    } catch (error) {
      console.error('Error getting user avatar URL by id:', error);
      throw new HttpException(
        { message: `Failed to get user avatar URL: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserAvatarUrlByOwnerName({
    ownerName,
  }: {
    ownerName: string;
  }): Promise<string> {
    let userId: string;
    try {
      const result = await this.getOwnerIdByName({ ownerName });
      userId = result.ownerId;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    let url: string;
    try {
      const result = await this.getUserAvatarUrlById({
        userId: userId ?? '',
      });
      url = result.avaterUrl;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return url;
  }

  async getUserReadmeById({ userId }: { userId: string }): Promise<string> {
    try {
      const request: GetUserReadmeByIdRequest = {
        p_user_id: userId,
      };
      const result = await this.ownersRepository.getUserReadmeById(request);
      return result;
    } catch (error) {
      console.error('Error getting user README by id:', error);
      throw new HttpException(
        { message: `Failed to get user README: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserReadmeById({
    userId,
    readme,
  }: {
    userId: string;
    readme: string;
  }): Promise<string> {
    try {
      const request: UpdateUserReadmeByIdRequest = {
        p_user_id: userId,
        p_readme: readme,
      };
      const result = await this.ownersRepository.updateUserReadmeById(request);
      return 'success';
    } catch (error) {
      console.error('Error updating user README by id:', error);
      throw new HttpException(
        { message: `Failed to update user README: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOwnerById({
    userId,
    ownerName,
  }: {
    userId: string;
    ownerName: string;
  }): Promise<string> {
    try {
      const result = await this.ownersRepository.updateOwnerById({
        p_user_id: userId,
        p_owner_name: ownerName,
      });
      return 'success';
    } catch (error) {
      console.error('Error updating owner by id:', error);
      throw new HttpException(
        { message: `Failed to update owner: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrgDisplayByOrgAndUserId({
    orgId,
    userId,
  }: {
    orgId: string;
    userId: string;
  }): Promise<boolean> {
    try {
      const request: GetOrgDisplayByOrgAndUserIdRequest = {
        p_organization_id: orgId,
        p_user_id: userId,
      };
      const result =
        await this.ownersRepository.getOrgDisplayByOrgAndUserId(request);
      return result;
    } catch (error) {
      console.error('Error getting org display by org and user id:', error);
      throw new HttpException(
        { message: `Failed to get org display: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOrgDisplayByOrgAndUserName({
    orgId,
    userName,
    display,
  }: {
    orgId: string;
    userName: string;
    display: boolean;
  }): Promise<string> {
    let userId: string;
    try {
      const result = await this.getOwnerIdByName({ ownerName: userName });
      userId = result.ownerId;
    } catch (error) {
      console.error('Error fetching user IDs by names:', error);
      throw new HttpException(
        { message: `Failed to fetch user IDs: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const request: UpdateOrgDisplayByOrgAndUserIdRequest = {
        p_organization_id: orgId,
        p_user_id: userId,
        p_display: display,
      };
      const result =
        await this.ownersRepository.updateOrgDisplayByOrgAndUserId(request);
      return 'sucess';
    } catch (error) {
      console.error('Error updating org display by org and user id:', error);
      throw new HttpException(
        { message: `Failed to update org display: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProjectPinedByProjectAndUserId({
    projectId,
    userId,
  }: {
    projectId: string;
    userId: string;
  }): Promise<boolean> {
    try {
      const result =
        await this.ownersRepository.getProjectPinedByProjectAndUserId({
          p_project_id: projectId,
          p_user_id: userId,
        });

      return result;
    } catch (error) {
      console.error(
        'Error getting project pined by project and user id:',
        error,
      );
      throw new HttpException(
        { message: `Failed to get project pined: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProjectPinedByProjectAndUserName({
    projectId,
    userName,
    pined,
  }: {
    projectId: string;
    userName: string;
    pined: boolean;
  }): Promise<string> {
    let userId: string;
    try {
      const result = await this.getOwnerIdByName({ ownerName: userName });
      userId = result.ownerId;
    } catch (error) {
      console.error('Error fetching user IDs by names:', error);
      throw new HttpException(
        { message: `Failed to fetch user IDs: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const result =
        await this.ownersRepository.updateProjectPinedByProjectAndUserId({
          p_project_id: projectId,
          p_user_id: userId,
          p_pined: pined,
        });
      return 'success';
    } catch (error) {
      console.error(
        'Error updating project pined by project and user id:',
        error,
      );
      throw new HttpException(
        { message: `Failed to update project pined: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async leaveProjectByProjectAndUserName({
    projectId,
    userName,
  }: {
    projectId: string;
    userName: string;
  }): Promise<string> {
    let userId: string;
    try {
      const result = await this.getOwnerIdByName({ ownerName: userName });
      userId = result.ownerId;
    } catch (error) {
      console.error('Error fetching user IDs by names:', error);
      throw new HttpException(
        { message: `Failed to fetch user IDs: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const request: LeaveProjectByProjectAndUserIdRequest = {
        p_project_id: projectId,
        p_user_id: userId,
      };
      const result =
        await this.ownersRepository.leaveProjectByProjectAndUserId(request);
      return 'success';
    } catch (error) {
      console.error('Error leaving project by project and user id:', error);
      throw new HttpException(
        { message: `Failed to leave project: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async leaveOrgDisplayByOrgAndUserName({
    orgId,
    userName,
  }: {
    orgId: string;
    userName: string;
  }): Promise<string> {
    let userId: string;
    try {
      const result = await this.getOwnerIdByName({ ownerName: userName });
      userId = result.ownerId;
    } catch (error) {
      console.error('Error fetching user IDs by names:', error);
      throw new HttpException(
        { message: `Failed to fetch user IDs: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const result =
        await this.ownersRepository.leaveOrganizationByOrgAndUserId({
          p_organization_id: orgId,
          p_user_id: userId,
        });
      return 'success';
    } catch (error) {
      console.error('Error leaving organization by org and user id:', error);
      throw new HttpException(
        { message: `Failed to leave organization: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrgIdByName({
    orgName,
  }: {
    orgName: string;
  }): Promise<GetOrgIdByNameModel> {
    try {
      const request: GetOrgIdByNameRequest = {
        org_name: orgName,
      };
      const result = await this.ownersRepository.getOrgIdByName(request);
      return result;
    } catch (error) {
      console.error('Error fetching org ID by name:', error);
      throw new HttpException(
        { message: `Failed to fetch org ID: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrganizationsByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<GetOrganizationsByUserIdModel> {
    try {
      const request: GetOrganizationsByUserIdRequest = {
        p_user_id: userId,
      };
      const result =
        await this.ownersRepository.getOrganizationsByUserId(request);
      return result;
    } catch (error) {
      console.error('Error fetching organizations by user id:', error);
      throw new HttpException(
        { message: `Failed to fetch organizations: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async getOrganizationById({ orgId }: { orgId: string }): Promise<Org
  // > {
  //   try {
  //   const retult = await this.ownersRepository.getOrganizationById(orgId);

  //   }

  //   return result
  // }

  // async getOrganizations(): Promise<Org[]> {
  //   const { data, error } = await this.supabase.client
  //     .from("organizations")
  //     .select("*");
  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   return data as Org[];
  // }

  // async getActiveProjects(orgId: string): Promise<ActiveProject[]> {
  //   const { data, error } = await this.supabase.client
  //     .from("org_projects")
  //     .select("*") // すべてのカラムを選択
  //     .eq("org_id", orgId)
  //     .eq("status_flag", true);
  //   if (error) {
  //     throw new Error(error.message);
  //   }

  //   const projectIds = data.map(
  //     (item: { project_id: string }) => item.project_id
  //   );

  //   const { data: projects, error: projectError } = await this.supabase.client
  //     .from("projects")
  //     .select("*")
  //     .in("id", projectIds);
  //   if (projectError) {
  //     throw new Error(projectError.message);
  //   }

  //   return projects.map((project: Project) => ({
  //     ...project,
  //     status: "active", // 適切なステータスを設定
  //   })) as ActiveProject[];
  // }

  // async getPinnedProjects(orgId: string): Promise<PinnedProject[]> {
  //   const { data, error } = await this.supabase.client
  //     .from("org_projects")
  //     .select("*") // すべてのカラムを選択
  //     .eq("org_id", orgId)
  //     .eq("pin_flag", true);
  //   if (error) {
  //     throw new Error(error.message);
  // //   }

  // //   const projectIds = data.map(
  // //     (item: { project_id: string }) => item.project_id
  // //   );

  // //   const { data: projects, error: projectError } = await this.supabase.client
  // //     .from("projects")
  // //     .select("*")
  // //     .in("id", projectIds);
  // //   if (projectError) {
  // //     throw new Error(projectError.message);
  // //   }

  // //   return projects.map((project: Project) => ({
  // //     ...project,
  // //     status: "pinned", // 適切なステータスを設定
  // //   })) as PinnedProject[];
  // // }

  // async getFrames(orgId: string): Promise<Frame[]> {
  //   const { data, error } = await this.supabase.client
  //     .from("frames")
  //     .select("*")
  //     .eq("org_id", orgId);
  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   return data as Frame[];
  // }

  // async getTopics(orgId: string): Promise<Topic[]> {
  //   const { data, error } = await this.supabase.client
  //     .from("topics")
  //     .select("*")
  //     .eq("org_id", orgId);
  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   return data as Topic[];
  // }

  // async getUsersByOrgId(orgId: string): Promise<People[]> {
  //   const { data, error } = await this.supabase.client
  //     .from("organization_users")
  //     .select("user_id")
  //     .eq("organization_id", orgId);
  //   if (error) {
  //     throw new Error(error.message);
  //   }

  //   const userIds = data.map((item: { user_id: string }) => item.user_id);

  //   const { data: people, error: userError } = await this.supabase.client
  //     .from("owners")
  //     .select("*")
  //     .in("owner_ref", userIds); // カラム名を owner_ref に変更
  //   if (userError) {
  //     throw new Error(userError.message);
  //   }

  //   return people as People[];
  // }

  // async getPeopleByOrgId(orgId: string): Promise<People[]> {
  //   const { data, error } = await this.supabase.client
  //     .from("organization_users")
  //     .select("user_id")
  //     .eq("organization_id", orgId);
  //   if (error) {
  //     throw new Error(error.message);
  //   }

  //   const userIds = data.map((item: { user_id: string }) => item.user_id);

  //   const { data: people, error: userError } = await this.supabase.client
  //     .from("profiles")
  //     .select("*")
  //     .in("id", userIds);
  //   if (userError) {
  //     throw new Error(userError.message);
  //   }

  //   return people as People[];
  // }

  async getUserInfosByIds({ userIds }: { userIds: string[] }): Promise<
    {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    }[]
  > {
    try {
      const request: GetUserInfosByIdsRequest = {
        p_user_ids: userIds,
      };
      const result = await this.ownersRepository.getUserInfosByIds(request);
      const response = result?.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatar_url,
        };
      });
      return response;
    } catch (error) {
      console.error('Error fetching user infos by ids:', error);
      throw new HttpException(
        { message: `Failed to fetch user infos: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserProfileByName({
    userName,
  }: {
    userName: string;
  }): Promise<User> {
    let userId: string;
    try {
      const result = await this.getOwnerIdByName({ ownerName: userName });
      if (!result) {
        throw new HttpException(
          { message: `User not found` },
          HttpStatus.NOT_FOUND,
        );
      }
      userId = result.ownerId;
    } catch (error) {
      console.error('Error fetching user IDs by names:', error);
      throw new HttpException(
        { message: `Failed to fetch user IDs: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const request: GetUserProfileByIdRequest = {
        p_user_id: userId,
      };

      const result = await this.ownersRepository.getUserProfileById(request);
      if (result.length === 0) {
        throw new HttpException(
          { message: `User not found` },
          HttpStatus.NOT_FOUND,
        );
      }
      const response = {
        id: userId,
        username: result[0].user_name,
        email: result[0].email,
        fullname: result[0].full_name,
        avatarUrl: result[0].avatar_url,
      };

      return response;
    } catch (error) {
      console.error('Error fetching user infos by ids:', error);
      throw new HttpException(
        { message: `Failed to fetch user infos: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hideUserProfileById({ userId }: { userId: string }): Promise<string> {
    try {
      const request: HideUserProfileByIdRequest = {
        p_user_id: userId,
      };
      const result = await this.ownersRepository.hideUserProfileById(request);
      return 'success';
    } catch (error) {
      console.error('Error hiding user profile by id:', error);
      throw new HttpException(
        { message: `Failed to hide user profile: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserHideById({ userId }: { userId: string }): Promise<boolean> {
    try {
      const request: GetUserHideByIdRequest = {
        p_user_id: userId,
      };
      const result = await this.ownersRepository.getUserHideById(request);
      return result;
    } catch (error) {
      console.error('Error getting user hide by id:', error);
      throw new HttpException(
        { message: `Failed to get user hide: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserLoggedIn(token?: string): Promise<GetUserLoggedIn> {
    try {
      const result = await this.ownersRepository.getUserLoggedIn(token);
      if (!result) {
        throw new Error('User not found');
      }
      const data: GetUserLoggedIn = {
        userId: result.userId,
        email: result.email,
        username: result.username,
      };
      return data;
    } catch (error) {
      console.error('Error fetching user logged in:', error);
      throw new HttpException(
        { message: `Failed to fetch user logged in: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserInfoByEmail(email: string): Promise<GetUserInfoByEmail> {
    try {
      const request: GetUserInfoByEmailRequest = {
        p_email: email,
      };
      const result = await this.ownersRepository.getUserInfoByEmail(request);
      // 追加のビジネスロジックをここに記述可能
      const data: { userName: string; userId: string } = {
        userName: result[0].user_name as string,
        userId: result[0].user_id as string,
      };
      return data;
    } catch (error) {
      console.error('Error fetching user info by email:', error);
      throw new HttpException(
        { message: `Failed to fetch user info: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEmailByUserName({ userName }: { userName: string }): Promise<{
    email: string;
  }> {
    try {
      const request: GetEmailByUserNameRequest = {
        p_user_name: userName,
      };
      const result = await this.ownersRepository.getEmailByUserName(request);
      const data: { email: string } = {
        email: result[0].email as string,
      };
      return data;
    } catch (error) {
      console.error('Error fetching email by username:', error);
      throw new HttpException(
        { message: `Failed to fetch email: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUsernameByEmail({ email }: { email: string }): Promise<{
    userName: string;
  }> {
    try {
      const request: GetUserNameByEmailRequest = {
        p_email: email,
      };
      const result = await this.ownersRepository.getUsernameByEmail(request);
      const data: { userName: string } = {
        userName: result[0].user_name as string,
      };
      return data;
    } catch (error) {
      console.error('Error fetching username by email:', error);
      throw new HttpException(
        { message: `Failed to fetch username: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async signUpWithCredentials(request: Request, successRedirectPath: string) {
  //   const formData = await request.formData();
  //   const userName = formData.get("username") as string;
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   const usernameExists = await this.getEmailByUserName({ userName });
  //   if (usernameExists) {
  //     return { error: `Username "${userName}" is already in use` };
  //   }

  //   const emailExists = await this.getUsernameByEmail({ email });
  //   if (emailExists.response) {
  //     return { error: `Email "${email}" is already in use` };
  //   }

  //   const { error } = await this.supabase.client.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       data: {
  //         user_name: userName,
  //         email,
  //         avatar_url: "",
  //       },
  //     },
  //   });

  //   if (!error) {
  //     throw redirect(successRedirectPath, { headers: this.supabase.headers });
  //   }
  //   return { error: error.message };
  // }
  // async signInWithPassword(request: Request, successRedirectPath: string) {
  //   const formData = await request.formData();
  //   const identifier = formData.get("identifier") as string;
  //   const password = formData.get("password") as string;

  //   let email: string | null = null;
  //   const isEmail = /\S+@\S+\.\S+/.test(identifier);

  //   if (isEmail) {
  //     email = identifier;
  //   } else {
  //     const getEmailByUserName = await this.getEmailByUserName({
  //       userName: identifier,
  //     });
  //     email = getEmailByUserName.response?.email ?? null;

  //     if (!email) {
  //       return { error: `Username "${identifier}" not found` };
  //     }
  //   }

  //   const { error } = await this.supabase.client.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (!error) {
  //     throw redirect(successRedirectPath, { headers: this.supabase.headers });
  //   }
  //   return { error: error.message };
  // }

  // async signOut(successRedirectPath: string = "/") {
  //   const { error } = await this.supabase.client.auth.signOut();

  //   if (!error) {
  //     throw redirect(successRedirectPath, { headers: this.supabase.headers });
  //   }
  //   return { error: error.message };
  // }

  // ユーザーデータを取得するサーバーサイド関数
  async getUserData() {
    // サーバーサイドでユーザー情報を取得
    const { data: userData, error: userError } =
      await this.client.auth.getUser();

    if (userError || !userData?.user) {
      throw new Error('User not found or not authenticated');
    }
    return userData.user;
  }

  async resetPassword(request: Request) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const { error } = await this.client.auth.resetPasswordForEmail(email);
    if (!error) {
      return { success: true };
    }
    return { error: error.message };
  }

  async updateUserPassword(request: Request) {
    const formData = await request.formData();
    const newPassword = formData.get('password') as string;

    const { error } = await this.client.auth.updateUser({
      password: newPassword,
    });

    if (!error) {
      return { success: true };
    }

    return { success: false, error: error.message };
  }

  // async authConfirm(request: Request) {
  //   const requestUrl = new URL(request.url);
  //   const token_hash = requestUrl.searchParams.get("token_hash");
  //   const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  //   const next = requestUrl.searchParams.get("next") || "/";
  //   if (token_hash && type) {
  //     const { error } = await this.supabase.client.auth.verifyOtp({
  //       type,
  //       token_hash,
  //     });

  //     if (!error) {
  //       return redirect(next, { headers: this.supabase.headers });
  //     }
  //   }

  //   // return redirect("/auth/auth-code-error", { headers });
  //   return redirect("/", { headers: this.supabase.headers });
  // }
}
