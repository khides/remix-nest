import { SupabaseServerClient } from "~/supabase/supabase.server";
import type {
  GetTopicsByProjectIdRequest,
  GetTopicsByProjectIdResponse,
  SearchTopicsByProjectIdRequest,
  SearchTopicsByProjectIdResponse,
  GetTopicsFilteringShortcutsByProjectIdRequest,
  GetTopicsFilteringShortcutsByProjectIdResponse,
  GetTopicContextByIdRequest,
  GetTopicContextByIdResponse,
  GetTopicContextsByTopicIdRequest,
  GetTopicContextsByTopicIdResponse,
  CreateNewTopicContextRequest,
  CreateNewTopicContextResponse,
  UpdateTopicContextByIdRequest,
  UpdateTopicContextByIdResponse,
  HideTopicContextByIdRequest,
  HideTopicContextByIdResponse,
  CreateNewTopicRequest,
  CreateNewTopicResponse,
  PostNewTopicCommentActivityRequest,
  PostNewTopicCommentActivityResponse,
  UpdateTopicCommentActivityByIdRequest,
  UpdateTopicCommentActivityByIdResponse,
  HideTopicActivityWithRepliesByIdRequest,
  HideTopicActivityWithRepliesByIdResponse,
  UpdateTopicReplyByIdRequest,
  UpdateTopicReplyByIdResponse,
  HideTopicReplyByIdRequest,
  HideTopicReplyByIdResponse,
  HideTopicByIdRequest,
  HideTopicByIdResponse,
  PostNewTopicReplyRequest,
  PostNewTopicReplyResponse,
  CreateTopicTimelineRequest,
  CreateTopicTimelineResponse,
  UpdateTopicPropertiesRequest,
  UpdateTopicPropertiesResponse,
  GetTopicParticipantsByTopicIdRequest,
  GetTopicParticipantsByTopicIdResponse,
  UpdateTopicContextsRequest,
  UpdateTopicContextsResponse,
  GetTopicContextsByProjectIdRequest,
  GetTopicContextsByProjectIdResponse,
  UpdateTopicTitleRequest,
  UpdateTopicTitleResponse,
  GetTopicDetailsByIdsRequest,
  GetTopicDetailsByIdsResponse,
  GetTagsByIdsRequest,
  GetTagsByIdsResponse,
  GetTopicActivitiesByIdsRequest,
  GetTopicActivitiesByIdsResponse,
  GetTopicRepliesByIdsRequest,
  GetTopicRepliesByIdsResponse,
  GetTopicContextsByIdsRequest,
  GetTopicContextsByIdsResponse,
  GetTopicPropertiesByIdsRequest,
  GetTopicPropertiesByIdsResponse,
  GetTopicDocumentsByIdsRequest,
  GetTopicDocumentsByIdsResponse,
  AddTopicTagsByIdsRequest,
  AddTopicTagsByIdsResponse,
  HideTopicTagsByIdsRequest,
  HideTopicTagsByIdsResponse,
  GetTopicTagIdsByTopicIdsRequest,
  GetTopicTagIdsByTopicIdsResponse,
  AddTopicUsersByIdsRequest,
  AddTopicUsersByIdsResponse,
  HideTopicUsersByIdsRequest,
  HideTopicUsersByIdsResponse,
  GetTopicUserIdsByTopicIdsRequest,
  GetTopicUserIdsByTopicIdsResponse,
  UpdateTopicStateByIdRequest,
  UpdateTopicStateByIdResponse,
  CreateTopicsFilteringShortcutRequest,
  CreateTopicsFilteringShortcutResponse,
  HideTopicsFilteringShortcutsByIdsRequest,
  HideTopicsFilteringShortcutsByIdsResponse,
  UpdateTopicsFilteringShortcutByIdRequest,
  UpdateTopicsFilteringShortcutByIdResponse,
  AddTopicsFilteringShortcutTagsByIdRequest,
  AddTopicsFilteringShortcutTagsByIdResponse,
  HideTopicsFilteringShortcutTagsByIdsRequest,
  HideTopicsFilteringShortcutTagsByIdsResponse,
  GetTopicsFilteringShortcutTagsByIdRequest,
  GetTopicsFilteringShortcutTagsByIdResponse,
  UpdateTopicFrameByIdRequest,
  UpdateTopicFrameByIdResponse,
  GetUpdatedTopicsByProjectRequest,
  GetUpdatedTopicsByProjectResponse,
} from "~/supabase/__generated__/supabase.interface.d.ts";

export class TopicsRepository {
  constructor(private supabase: SupabaseServerClient) {}

  async createNewTopic(request: CreateNewTopicRequest): Promise<{
    response?: CreateNewTopicResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_new_topic",
      request
    );

    if (error) {
      console.error("Error creating new topic in repo", error);

      return { error: error.message };
    }
    return {
      response: data as CreateNewTopicResponse,
    };
  }

  async getTopicsByProject(request: GetTopicsByProjectIdRequest): Promise<{
    response?: GetTopicsByProjectIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topics_by_project_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicsByProjectIdResponse,
    };
  }

  async searchTopicsByProject(
    request: SearchTopicsByProjectIdRequest
  ): Promise<{
    response?: SearchTopicsByProjectIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "search_topics_by_project_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as SearchTopicsByProjectIdResponse,
    };
  }

  async getFilteringShortcutsByProjectId(
    request: GetTopicsFilteringShortcutsByProjectIdRequest
  ): Promise<{
    response?: GetTopicsFilteringShortcutsByProjectIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topics_filtering_shortcuts_by_project_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicsFilteringShortcutsByProjectIdResponse,
    };
  }

  async getTopicDetailsByIds(request: GetTopicDetailsByIdsRequest): Promise<{
    response?: GetTopicDetailsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_details_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicDetailsByIdsResponse,
    };
  }

  async getTopicContextById(request: GetTopicContextByIdRequest): Promise<{
    response?: GetTopicContextByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_context_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicContextByIdResponse,
    };
  }

  async getTopicContextsByTopicId(
    request: GetTopicContextsByTopicIdRequest
  ): Promise<{
    response?: GetTopicContextsByTopicIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_contexts_by_topic_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicContextsByTopicIdResponse,
    };
  }

  async createNewTopicContext(request: CreateNewTopicContextRequest): Promise<{
    response?: CreateNewTopicContextResponse;
    error?: string;
  }> {
    console.log("createNewTopicContext", request);

    const { data, error } = await this.supabase.client.rpc(
      "create_new_topic_context",
      request
    );
    console.log("createNewTopicContext", data, error);

    if (error) {
      return { error: error.message };
    }
    return {
      response: data as CreateNewTopicContextResponse,
    };
  }

  async updateTopicContextById(
    request: UpdateTopicContextByIdRequest
  ): Promise<{
    response?: UpdateTopicContextByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_topic_context_by_id",
      request
    );
    if (error) {
      console.error("Error updating topic context", error);
      return { error: error.message };
    }
    return {
      response: data as UpdateTopicContextByIdResponse,
    };
  }

  async hideTopicContextById(request: HideTopicContextByIdRequest): Promise<{
    response?: HideTopicContextByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_topic_context_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideTopicContextByIdResponse,
    };
  }

  async postNewTopicCommentActivity(
    request: PostNewTopicCommentActivityRequest
  ): Promise<{
    response?: PostNewTopicCommentActivityResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "post_new_topic_comment_activity",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as PostNewTopicCommentActivityResponse,
    };
  }

  async updateTopicCommentActivityById(
    request: UpdateTopicCommentActivityByIdRequest
  ): Promise<{
    response?: UpdateTopicCommentActivityByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_topic_comment_activity_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateTopicCommentActivityByIdResponse,
    };
  }

  async hideTopicActivityWithRepliesById(
    request: HideTopicActivityWithRepliesByIdRequest
  ): Promise<{
    response?: HideTopicActivityWithRepliesByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_topic_activity_with_replies_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideTopicActivityWithRepliesByIdResponse,
    };
  }

  async updateTopicReplyById(request: UpdateTopicReplyByIdRequest): Promise<{
    response?: UpdateTopicReplyByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_topic_reply_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateTopicReplyByIdResponse,
    };
  }

  async hideTopicReplyById(request: HideTopicReplyByIdRequest): Promise<{
    response?: HideTopicReplyByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_topic_reply_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideTopicReplyByIdResponse,
    };
  }

  async hideTopicById(request: HideTopicByIdRequest): Promise<{
    response?: HideTopicByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_topic_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideTopicByIdResponse,
    };
  }

  async postNewTopicReply(request: PostNewTopicReplyRequest): Promise<{
    response?: PostNewTopicReplyResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "post_new_topic_reply",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as PostNewTopicReplyResponse,
    };
  }
  async createTopicTimeline(request: CreateTopicTimelineRequest): Promise<{
    response?: CreateTopicTimelineResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_topic_timeline",
      request
    );
    if (error) {
      console.error("Error creating topic timeline in repo", error);
      return { error: error.message };
    }
    return {
      response: data as CreateTopicTimelineResponse,
    };
  }
  async updateTopicProperties(request: UpdateTopicPropertiesRequest): Promise<{
    response?: UpdateTopicPropertiesResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_topic_properties",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateTopicPropertiesResponse,
    };
  }

  async getTopicParticipants(
    request: GetTopicParticipantsByTopicIdRequest
  ): Promise<{
    response?: GetTopicParticipantsByTopicIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_participants_by_topic_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicParticipantsByTopicIdResponse,
    };
  }

  async updateTopicContexts(request: UpdateTopicContextsRequest): Promise<{
    response?: UpdateTopicContextsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_topic_contexts",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateTopicContextsResponse,
    };
  }

  async getTopicContextsByProjectId(
    request: GetTopicContextsByProjectIdRequest
  ): Promise<{
    response?: GetTopicContextsByProjectIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_contexts_by_project_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicContextsByProjectIdResponse,
    };
  }

  async updateTopicTitle(request: UpdateTopicTitleRequest): Promise<{
    response?: UpdateTopicTitleResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_topic_title",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateTopicTitleResponse,
    };
  }

  async getTagsByIds(request: GetTagsByIdsRequest): Promise<{
    response?: GetTagsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_tags_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTagsByIdsResponse,
    };
  }

  async getTopicActivitiesByIds(
    request: GetTopicActivitiesByIdsRequest
  ): Promise<{
    response?: GetTopicActivitiesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_activities_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicActivitiesByIdsResponse,
    };
  }

  async getTopicRepliesByIds(request: GetTopicRepliesByIdsRequest): Promise<{
    response?: GetTopicRepliesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_replies_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicRepliesByIdsResponse,
    };
  }

  async getTopicContextsByIds(request: GetTopicContextsByIdsRequest): Promise<{
    response?: GetTopicContextsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_contexts_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicContextsByIdsResponse,
    };
  }

  async getTopicPropertiesByIds(
    request: GetTopicPropertiesByIdsRequest
  ): Promise<{
    response?: GetTopicPropertiesByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_properties_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicPropertiesByIdsResponse,
    };
  }

  async getTopicDocumentsByIds(
    request: GetTopicDocumentsByIdsRequest
  ): Promise<{
    response?: GetTopicDocumentsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_documents_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicDocumentsByIdsResponse,
    };
  }

  async getUpdatedTopicsByProject(
    request: GetUpdatedTopicsByProjectRequest
  ): Promise<{
    response?: GetUpdatedTopicsByProjectResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_updated_topics_by_project",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetUpdatedTopicsByProjectResponse,
    };
  }

  async addTopicTagsByIds(request: AddTopicTagsByIdsRequest): Promise<{
    response?: AddTopicTagsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "add_topic_tags_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as AddTopicTagsByIdsResponse,
    };
  }

  async hideTopicTagsByIds(request: HideTopicTagsByIdsRequest): Promise<{
    response?: HideTopicTagsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_topic_tags_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideTopicTagsByIdsResponse,
    };
  }

  async getTopicTagIdsByTopicIds(
    request: GetTopicTagIdsByTopicIdsRequest
  ): Promise<{
    response?: GetTopicTagIdsByTopicIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_tag_ids_by_topic_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicTagIdsByTopicIdsResponse,
    };
  }

  async addTopicUsersByIds(request: AddTopicUsersByIdsRequest): Promise<{
    response?: AddTopicUsersByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "add_topic_users_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as AddTopicUsersByIdsResponse,
    };
  }

  async hideTopicUsersByIds(request: HideTopicUsersByIdsRequest): Promise<{
    response?: HideTopicUsersByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_topic_users_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideTopicUsersByIdsResponse,
    };
  }

  async getTopicUserIdsByTopicIds(
    request: GetTopicUserIdsByTopicIdsRequest
  ): Promise<{
    response?: GetTopicUserIdsByTopicIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topic_user_ids_by_topic_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicUserIdsByTopicIdsResponse,
    };
  }

  async updateTopicStateById(request: UpdateTopicStateByIdRequest): Promise<{
    response?: UpdateTopicStateByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_topic_state_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateTopicStateByIdResponse,
    };
  }

  async updateTopicFrameById(request: UpdateTopicFrameByIdRequest): Promise<{
    response?: UpdateTopicFrameByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_topic_frame_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateTopicFrameByIdResponse,
    };
  }

  async hideTopicsFilteringShortcutsByIds(
    request: HideTopicsFilteringShortcutsByIdsRequest
  ): Promise<{
    response?: HideTopicsFilteringShortcutsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_topics_filtering_shortcuts_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideTopicsFilteringShortcutsByIdsResponse,
    };
  }

  async updateTopicsFilteringShortcutById(
    request: UpdateTopicsFilteringShortcutByIdRequest
  ): Promise<{
    response?: UpdateTopicsFilteringShortcutByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_topics_filtering_shortcut_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as UpdateTopicsFilteringShortcutByIdResponse,
    };
  }

  async addTopicsFilteringShortcutTagsById(
    request: AddTopicsFilteringShortcutTagsByIdRequest
  ): Promise<{
    response?: AddTopicsFilteringShortcutTagsByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "add_topics_filtering_shortcut_tags_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as AddTopicsFilteringShortcutTagsByIdResponse,
    };
  }

  async hideTopicsFilteringShortcutTagsByIds(
    request: HideTopicsFilteringShortcutTagsByIdsRequest
  ): Promise<{
    response?: HideTopicsFilteringShortcutTagsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "hide_topics_filtering_shortcut_tags_by_ids",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as HideTopicsFilteringShortcutTagsByIdsResponse,
    };
  }

  async getTopicsFilteringShortcutTagsById(
    request: GetTopicsFilteringShortcutTagsByIdRequest
  ): Promise<{
    response?: GetTopicsFilteringShortcutTagsByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_topics_filtering_shortcut_tags_by_id",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetTopicsFilteringShortcutTagsByIdResponse,
    };
  }

  async createTopicsFilteringShortcut(
    request: CreateTopicsFilteringShortcutRequest
  ): Promise<{
    response?: CreateTopicsFilteringShortcutResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_topics_filtering_shortcut",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as CreateTopicsFilteringShortcutResponse,
    };
  }
}
