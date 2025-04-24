import { SupabaseServerClient } from "~/supabase/supabase.server";
import type {
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
} from "~/supabase/__generated__/supabase.interface.d.ts";

export class FrameRepository {
  constructor(private supabase: SupabaseServerClient) {}

  async hideFrameTemplateById(request: HideFrameTemplateByIdRequest): Promise<{
    response?: HideFrameTemplateByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_frame_template_by_id",
      request
    );
    if (error) {
      throw new Error(error.message);
    }
    return data as HideFrameTemplateByIdResponse;
  }

  async hideFrameById(request: HideFrameByIdRequest): Promise<{
    response?: HideFrameByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_frame_by_id",
      request
    );
    if (error) {
      throw new Error(error.message);
    }
    return {
      response: data as HideFrameByIdResponse,
    };
  }

  async postNewFrameCommentActivity(
    request: PostNewFrameCommentActivityRequest
  ): Promise<{
    response?: PostNewFrameCommentActivityResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "post_new_frame_comment_activity",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as PostNewFrameCommentActivityResponse,
    };
  }

  async updateFrameCommentActivityById(
    request: UpdateFrameCommentActivityByIdRequest
  ): Promise<{
    response?: UpdateFrameCommentActivityByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_frame_comment_activity_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateFrameCommentActivityByIdResponse,
    };
  }

  async hideFrameActivityWithRepliesById(
    request: HideFrameActivityWithRepliesByIdRequest
  ): Promise<{
    response?: HideFrameActivityWithRepliesByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_frame_activity_with_replies_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideFrameActivityWithRepliesByIdResponse,
    };
  }

  async postNewFrameReply(request: PostNewFrameReplyRequest): Promise<{
    response?: PostNewFrameReplyResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "post_new_frame_reply",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as PostNewFrameReplyResponse,
    };
  }

  async updateFrameReplyById(request: UpdateFrameReplyByIdRequest): Promise<{
    response?: UpdateFrameReplyByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_frame_reply_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateFrameReplyByIdResponse,
    };
  }

  async hideFrameReplyById(request: HideFrameReplyByIdRequest): Promise<{
    response?: HideFrameReplyByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_frame_reply_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideFrameReplyByIdResponse,
    };
  }

  async createNewFrame(request: CreateNewFrameRequest): Promise<{
    response?: CreateNewFrameResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_new_frame",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as CreateNewFrameResponse,
    };
  }

  async createNewFrameProperties(
    request: CreateNewFramePropertiesRequest
  ): Promise<{
    response?: CreateNewFramePropertiesResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_new_frame_properties",
      request
    );
    if (error) {
      console.log("Error creating frame proerties in repo", error);

      return { error: error.message };
    }
    return {
      response: data as CreateNewFramePropertiesResponse,
    };
  }

  async createNewTemplate(request: CreateNewTemplateRequest): Promise<{
    response?: CreateNewTemplateResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_new_template",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as CreateNewTemplateResponse,
    };
  }

  async updateFrameTemplate(request: UpdateFrameTemplateRequest): Promise<{
    response?: UpdateFrameTemplateResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_frame_template",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateFrameTemplateResponse,
    };
  }

  async getFrameDetailsByIds(request: GetFrameDetailsByIdsRequest): Promise<{
    response?: GetFrameDetailsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_frame_details_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetFrameDetailsByIdsResponse,
    };
  }

  async getFramePropertiesByIds(
    request: GetFramePropertiesByIdsRequest
  ): Promise<{
    response?: GetFramePropertiesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_frame_properties_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetFramePropertiesByIdsResponse,
    };
  }

  async getTemplatesByIds(request: GetTemplatesByIdsRequest): Promise<{
    response?: GetTemplatesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_templates_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTemplatesByIdsResponse,
    };
  }

  async getFrameTopicsByIds(request: GetFrameTopicsByIdsRequest): Promise<{
    response?: GetFrameTopicsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_frame_topics_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetFrameTopicsByIdsResponse,
    };
  }

  async getFrameActivitiesByIds(
    request: GetFrameActivitiesByIdsRequest
  ): Promise<{
    response?: GetFrameActivitiesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_frame_activities_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetFrameActivitiesByIdsResponse,
    };
  }

  async getFrameRepliesByIds(request: GetFrameRepliesByIdsRequest): Promise<{
    response?: GetFrameRepliesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_frame_replies_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetFrameRepliesByIdsResponse,
    };
  }

  async getFrameIdsByProjectId(
    request: GetFrameIdsByProjectIdRequest
  ): Promise<{
    response?: GetFrameIdsByProjectIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_frame_ids_by_project_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetFrameIdsByProjectIdResponse,
    };
  }

  async searchFrameIds(request: SearchFrameIdsRequest): Promise<{
    response?: SearchFrameIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "search_frame_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as SearchFrameIdsResponse,
    };
  }

  async updateFrameNameById(request: UpdateFrameNameByIdRequest): Promise<{
    response?: UpdateFrameNameByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_frame_name_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateFrameNameByIdResponse,
    };
  }

  async updateFrameDescriptionById(
    request: UpdateFrameDescriptionByIdRequest
  ): Promise<{
    response?: UpdateFrameDescriptionByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_frame_description_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateFrameDescriptionByIdResponse,
    };
  }

  async updateFramePropertiesByIds(
    request: UpdateFramePropertiesByIdsRequest
  ): Promise<{
    response?: UpdateFramePropertiesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_frame_properties_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateFramePropertiesByIdsResponse,
    };
  }

  async hideFramePropertiesByIds(
    request: HideFramePropertiesByIdsRequest
  ): Promise<{
    response?: HideFramePropertiesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_frame_properties_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideFramePropertiesByIdsResponse,
    };
  }

  async createFrameProperties(request: CreateFramePropertiesRequest): Promise<{
    response?: CreateFramePropertiesResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_frame_properties",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as CreateFramePropertiesResponse,
    };
  }

  async getFramePropertiesByFrameId(
    request: GetFramePropertiesByFrameIdRequest
  ): Promise<{
    response?: GetFramePropertiesByFrameIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_frame_properties_by_frame_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetFramePropertiesByFrameIdResponse,
    };
  }
}
