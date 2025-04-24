import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import {
  HideFrameTemplateByIdRequest,
  HideFrameTemplateByIdResponse,
  HideFrameByIdRequest,
  HideFrameByIdResponse,
  PostNewFrameCommentActivityRequest,
  PostNewFrameCommentActivityResponse,
  UpdateFrameCommentActivityByIdRequest,
  UpdateFrameCommentActivityByIdResponse,
  HideFrameActivityWithRepliesByIdRequest,
  HideFrameActivityWithRepliesByIdResponse,
  PostNewFrameReplyRequest,
  PostNewFrameReplyResponse,
  UpdateFrameReplyByIdRequest,
  UpdateFrameReplyByIdResponse,
  HideFrameReplyByIdRequest,
  HideFrameReplyByIdResponse,
  CreateNewFrameRequest,
  CreateNewFrameResponse,
  CreateNewFramePropertiesRequest,
  CreateNewFramePropertiesResponse,
  CreateNewTemplateRequest,
  CreateNewTemplateResponse,
  UpdateFrameTemplateRequest,
  UpdateFrameTemplateResponse,
  GetFrameDetailsByIdsRequest,
  GetFrameDetailsByIdsResponse,
  GetFramePropertiesByIdsRequest,
  GetFramePropertiesByIdsResponse,
  GetTemplatesByIdsRequest,
  GetTemplatesByIdsResponse,
  GetFrameTopicsByIdsRequest,
  GetFrameTopicsByIdsResponse,
  GetFrameActivitiesByIdsRequest,
  GetFrameActivitiesByIdsResponse,
  GetFrameRepliesByIdsRequest,
  GetFrameRepliesByIdsResponse,
  GetFrameIdsByProjectIdRequest,
  GetFrameIdsByProjectIdResponse,
  SearchFrameIdsRequest,
  SearchFrameIdsResponse,
  UpdateFrameNameByIdRequest,
  UpdateFrameNameByIdResponse,
  UpdateFrameDescriptionByIdRequest,
  UpdateFrameDescriptionByIdResponse,
  UpdateFramePropertiesByIdsRequest,
  UpdateFramePropertiesByIdsResponse,
  HideFramePropertiesByIdsRequest,
  HideFramePropertiesByIdsResponse,
  CreateFramePropertiesRequest,
  CreateFramePropertiesResponse,
  GetFramePropertiesByFrameIdRequest,
  GetFramePropertiesByFrameIdResponse,
} from 'src/__generated__/supabase.interface';

@Injectable()
export class FramesRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.getClient();
  }
  async hideFrameTemplateById(
    request: HideFrameTemplateByIdRequest,
  ): Promise<HideFrameTemplateByIdResponse> {
    const { data, error } = await this.client.rpc(
      'hide_frame_template_by_id',
      request,
    );
    if (error) {
      console.error('Error hiding frame template by id', error);
      throw new Error(error.message);
    }
    return data as HideFrameTemplateByIdResponse;
  }

  async hideFrameById(
    request: HideFrameByIdRequest,
  ): Promise<HideFrameByIdResponse> {
    const { data, error } = await this.client.rpc('hide_frame_by_id', request);
    if (error) {
      console.error('Error hiding frame by id', error);
      throw new Error(error.message);
    }
    return data as HideFrameByIdResponse;
  }

  async postNewFrameCommentActivity(
    request: PostNewFrameCommentActivityRequest,
  ): Promise<PostNewFrameCommentActivityResponse> {
    const { data, error } = await this.client.rpc(
      'post_new_frame_comment_activity',
      request,
    );
    if (error) {
      console.error('Error posting new frame comment activity', error);
      throw new Error(error.message);
    }
    return data as PostNewFrameCommentActivityResponse;
  }

  async updateFrameCommentActivityById(
    request: UpdateFrameCommentActivityByIdRequest,
  ): Promise<UpdateFrameCommentActivityByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_frame_comment_activity_by_id',
      request,
    );
    if (error) {
      console.error('Error updating frame comment activity by id', error);
      throw new Error(error.message);
    }
    return data as UpdateFrameCommentActivityByIdResponse;
  }

  async hideFrameActivityWithRepliesById(
    request: HideFrameActivityWithRepliesByIdRequest,
  ): Promise<HideFrameActivityWithRepliesByIdResponse> {
    const { data, error } = await this.client.rpc(
      'hide_frame_activity_with_replies_by_id',
      request,
    );
    if (error) {
      console.error('Error hiding frame activity with replies by id', error);
      throw new Error(error.message);
    }
    return data as HideFrameActivityWithRepliesByIdResponse;
  }

  async postNewFrameReply(
    request: PostNewFrameReplyRequest,
  ): Promise<PostNewFrameReplyResponse> {
    const { data, error } = await this.client.rpc(
      'post_new_frame_reply',
      request,
    );
    if (error) {
      console.error('Error posting new frame reply', error);
      throw new Error(error.message);
    }
    return data as PostNewFrameReplyResponse;
  }

  async updateFrameReplyById(
    request: UpdateFrameReplyByIdRequest,
  ): Promise<UpdateFrameReplyByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_frame_reply_by_id',
      request,
    );
    if (error) {
      console.error('Error updating frame reply by id', error);
      throw new Error(error.message);
    }
    return data as UpdateFrameReplyByIdResponse;
  }

  async hideFrameReplyById(
    request: HideFrameReplyByIdRequest,
  ): Promise<HideFrameReplyByIdResponse> {
    const { data, error } = await this.client.rpc(
      'hide_frame_reply_by_id',
      request,
    );
    if (error) {
      console.error('Error hiding frame reply by id', error);
      throw new Error(error.message);
    }
    return data as HideFrameReplyByIdResponse;
  }

  async createNewFrame(
    request: CreateNewFrameRequest,
  ): Promise<CreateNewFrameResponse> {
    const { data, error } = await this.client.rpc('create_new_frame', request);
    if (error) {
      console.error('Error creating new frame in repo', error);
      throw new Error(error.message);
    }
    return data as CreateNewFrameResponse;
  }

  async createNewFrameProperties(
    request: CreateNewFramePropertiesRequest,
  ): Promise<CreateNewFramePropertiesResponse> {
    const { data, error } = await this.client.rpc(
      'create_new_frame_properties',
      request,
    );
    if (error) {
      console.error('Error creating new frame properties in repo', error);
      throw new Error(error.message);
    }
    return data as CreateNewFramePropertiesResponse;
  }

  async createNewTemplate(
    request: CreateNewTemplateRequest,
  ): Promise<CreateNewTemplateResponse> {
    const { data, error } = await this.client.rpc(
      'create_new_template',
      request,
    );
    if (error) {
      console.error('Error creating new template in repo', error);
      throw new Error(error.message);
    }
    return data as CreateNewTemplateResponse;
  }

  async updateFrameTemplate(
    request: UpdateFrameTemplateRequest,
  ): Promise<UpdateFrameTemplateResponse> {
    const { data, error } = await this.client.rpc(
      'update_frame_template',
      request,
    );
    if (error) {
      console.error('Error updating frame template in repo', error);
      throw new Error(error.message);
    }
    return data as UpdateFrameTemplateResponse;
  }

  async getFrameDetailsByIds(
    request: GetFrameDetailsByIdsRequest,
  ): Promise<GetFrameDetailsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_frame_details_by_ids',
      request,
    );
    if (error) {
      console.error('Error getting frame details by ids', error);
      throw new Error(error.message);
    }
    return data as GetFrameDetailsByIdsResponse;
  }

  async getFramePropertiesByIds(
    request: GetFramePropertiesByIdsRequest,
  ): Promise<GetFramePropertiesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_frame_properties_by_ids',
      request,
    );
    if (error) {
      console.error('Error getting frame properties by ids', error);
      throw new Error(error.message);
    }
    return data as GetFramePropertiesByIdsResponse;
  }

  async getTemplatesByIds(
    request: GetTemplatesByIdsRequest,
  ): Promise<GetTemplatesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_templates_by_ids',
      request,
    );
    if (error) {
      console.error('Error getting templates by ids', error);
      throw new Error(error.message);
    }
    return data as GetTemplatesByIdsResponse;
  }

  async getFrameTopicsByIds(
    request: GetFrameTopicsByIdsRequest,
  ): Promise<GetFrameTopicsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_frame_topics_by_ids',
      request,
    );
    if (error) {
      console.error('Error getting frame topics by ids', error);
      throw new Error(error.message);
    }
    return data as GetFrameTopicsByIdsResponse;
  }

  async getFrameActivitiesByIds(
    request: GetFrameActivitiesByIdsRequest,
  ): Promise<GetFrameActivitiesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_frame_activities_by_ids',
      request,
    );
    if (error) {
      console.error('Error getting frame activities by ids', error);
      throw new Error(error.message);
    }
    return data as GetFrameActivitiesByIdsResponse;
  }

  async getFrameRepliesByIds(
    request: GetFrameRepliesByIdsRequest,
  ): Promise<GetFrameRepliesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_frame_replies_by_ids',
      request,
    );
    if (error) {
      console.error('Error getting frame replies by ids', error);
      throw new Error(error.message);
    }
    return data as GetFrameRepliesByIdsResponse;
  }

  async getFrameIdsByProjectId(
    request: GetFrameIdsByProjectIdRequest,
  ): Promise<GetFrameIdsByProjectIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_frame_ids_by_project_id',
      request,
    );
    if (error) {
      console.error('Error getting frame ids by project id', error);
      throw new Error(error.message);
    }
    return data as GetFrameIdsByProjectIdResponse;
  }

  async searchFrameIds(
    request: SearchFrameIdsRequest,
  ): Promise<SearchFrameIdsResponse> {
    const { data, error } = await this.client.rpc('search_frame_ids', request);
    if (error) {
      console.error('Error searching frame ids', error);
      throw new Error(error.message);
    }
    return data as SearchFrameIdsResponse;
  }

  async updateFrameNameById(
    request: UpdateFrameNameByIdRequest,
  ): Promise<UpdateFrameNameByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_frame_name_by_id',
      request,
    );
    if (error) {
      console.error('Error updating frame name by id', error);
      throw new Error(error.message);
    }
    return data as UpdateFrameNameByIdResponse;
  }

  async updateFrameDescriptionById(
    request: UpdateFrameDescriptionByIdRequest,
  ): Promise<UpdateFrameDescriptionByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_frame_description_by_id',
      request,
    );
    if (error) {
      console.error('Error updating frame description by id', error);
      throw new Error(error.message);
    }
    return data as UpdateFrameDescriptionByIdResponse;
  }

  async updateFramePropertiesByIds(
    request: UpdateFramePropertiesByIdsRequest,
  ): Promise<UpdateFramePropertiesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'update_frame_properties_by_ids',
      request,
    );
    if (error) {
      console.error('Error updating frame properties by ids', error);
      throw new Error(error.message);
    }
    return data as UpdateFramePropertiesByIdsResponse;
  }

  async hideFramePropertiesByIds(
    request: HideFramePropertiesByIdsRequest,
  ): Promise<HideFramePropertiesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'hide_frame_properties_by_ids',
      request,
    );
    if (error) {
      console.error('Error hiding frame properties by ids', error);
      throw new Error(error.message);
    }
    return data as HideFramePropertiesByIdsResponse;
  }

  async createFrameProperties(
    request: CreateFramePropertiesRequest,
  ): Promise<CreateFramePropertiesResponse> {
    const { data, error } = await this.client.rpc(
      'create_frame_properties',
      request,
    );
    if (error) {
      console.error('Error creating frame properties', error);
      throw new Error(error.message);
    }
    return data as CreateFramePropertiesResponse;
  }

  async getFramePropertiesByFrameId(
    request: GetFramePropertiesByFrameIdRequest,
  ): Promise<GetFramePropertiesByFrameIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_frame_properties_by_frame_id',
      request,
    );
    if (error) {
      console.error('Error getting frame properties by frame id', error);
      throw new Error(error.message);
    }
    return data as GetFramePropertiesByFrameIdResponse;
  }
}
