import { Injectable } from '@nestjs/common';
import {
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
} from 'src/__generated__/supabase.interface';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class TopicsRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.getClient();
  }

  async createNewTopic(
    request: CreateNewTopicRequest,
  ): Promise<CreateNewTopicResponse> {
    const { data, error } = await this.client.rpc('create_new_topic', request);

    if (error) {
      console.error('Error creating new topic in repo', error);
      throw new Error(error.message);
    }
    return data as CreateNewTopicResponse;
  }

  async getTopicsByProject(
    request: GetTopicsByProjectIdRequest,
  ): Promise<GetTopicsByProjectIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_topics_by_project_id',
      request,
    );
    if (error) {
      console.error('Error fetching topics by project ID', error);
      throw new Error(error.message);
    }
    return data as GetTopicsByProjectIdResponse;
  }

  async searchTopicsByProject(
    request: SearchTopicsByProjectIdRequest,
  ): Promise<SearchTopicsByProjectIdResponse> {
    const { data, error } = await this.client.rpc(
      'search_topics_by_project_id',
      request,
    );
    if (error) {
      console.error('Error searching topics by project ID', error);
      throw new Error(error.message);
    }
    return data as SearchTopicsByProjectIdResponse;
  }

  async getFilteringShortcutsByProjectId(
    request: GetTopicsFilteringShortcutsByProjectIdRequest,
  ): Promise<GetTopicsFilteringShortcutsByProjectIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_topics_filtering_shortcuts_by_project_id',
      request,
    );
    if (error) {
      console.error('Error fetching filtering shortcuts by project ID', error);
      throw new Error(error.message);
    }
    return data as GetTopicsFilteringShortcutsByProjectIdResponse;
  }

  async getTopicDetailsByIds(
    request: GetTopicDetailsByIdsRequest,
  ): Promise<GetTopicDetailsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_details_by_ids',
      request,
    );
    if (error) {
      console.error('Error fetching topic details by IDs', error);
      throw new Error(error.message);
    }
    return data as GetTopicDetailsByIdsResponse;
  }

  async getTopicContextById(
    request: GetTopicContextByIdRequest,
  ): Promise<GetTopicContextByIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_context_by_id',
      request,
    );
    if (error) {
      console.error('Error fetching topic context by ID', error);
      throw new Error(error.message);
    }
    return data as GetTopicContextByIdResponse;
  }

  async getTopicContextsByTopicId(
    request: GetTopicContextsByTopicIdRequest,
  ): Promise<GetTopicContextsByTopicIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_contexts_by_topic_id',
      request,
    );
    if (error) {
      console.error('Error fetching topic contexts by topic ID', error);
      throw new Error(error.message);
    }
    return data as GetTopicContextsByTopicIdResponse;
  }

  async createNewTopicContext(
    request: CreateNewTopicContextRequest,
  ): Promise<CreateNewTopicContextResponse> {
    console.log('createNewTopicContext', request);

    const { data, error } = await this.client.rpc(
      'create_new_topic_context',
      request,
    );
    console.log('createNewTopicContext', data, error);

    if (error) {
      console.error('Error creating new topic context in repo', error);
      throw new Error(error.message);
    }
    return data as CreateNewTopicContextResponse;
  }

  async updateTopicContextById(
    request: UpdateTopicContextByIdRequest,
  ): Promise<UpdateTopicContextByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_topic_context_by_id',
      request,
    );
    if (error) {
      console.error('Error updating topic context by ID', error);
      throw new Error(error.message);
    }
    return data as UpdateTopicContextByIdResponse;
  }

  async hideTopicContextById(
    request: HideTopicContextByIdRequest,
  ): Promise<HideTopicContextByIdResponse> {
    const { data, error } = await this.client.rpc(
      'hide_topic_context_by_id',
      request,
    );
    if (error) {
      console.error('Error hiding topic context by ID', error);
      throw new Error(error.message);
    }
    return data as HideTopicContextByIdResponse;
  }

  async postNewTopicCommentActivity(
    request: PostNewTopicCommentActivityRequest,
  ): Promise<PostNewTopicCommentActivityResponse> {
    const { data, error } = await this.client.rpc(
      'post_new_topic_comment_activity',
      request,
    );
    if (error) {
      console.error('Error posting new topic comment activity in repo', error);
      throw new Error(error.message);
    }
    return data as PostNewTopicCommentActivityResponse;
  }

  async updateTopicCommentActivityById(
    request: UpdateTopicCommentActivityByIdRequest,
  ): Promise<UpdateTopicCommentActivityByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_topic_comment_activity_by_id',
      request,
    );
    if (error) {
      console.error('Error updating topic comment activity by ID', error);
      throw new Error(error.message);
    }
    return data as UpdateTopicCommentActivityByIdResponse;
  }

  async hideTopicActivityWithRepliesById(
    request: HideTopicActivityWithRepliesByIdRequest,
  ): Promise<HideTopicActivityWithRepliesByIdResponse> {
    const { data, error } = await this.client.rpc(
      'hide_topic_activity_with_replies_by_id',
      request,
    );
    if (error) {
      console.error('Error hiding topic activity with replies by ID', error);
      throw new Error(error.message);
    }
    return data as HideTopicActivityWithRepliesByIdResponse;
  }

  async updateTopicReplyById(
    request: UpdateTopicReplyByIdRequest,
  ): Promise<UpdateTopicReplyByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_topic_reply_by_id',
      request,
    );
    if (error) {
      console.error('Error updating topic reply by ID', error);
      throw new Error(error.message);
    }
    return data as UpdateTopicReplyByIdResponse;
  }

  async hideTopicReplyById(
    request: HideTopicReplyByIdRequest,
  ): Promise<HideTopicReplyByIdResponse> {
    const { data, error } = await this.client.rpc(
      'hide_topic_reply_by_id',
      request,
    );
    if (error) {
      console.error('Error hiding topic reply by ID', error);
      throw new Error(error.message);
    }
    return data as HideTopicReplyByIdResponse;
  }

  async hideTopicById(
    request: HideTopicByIdRequest,
  ): Promise<HideTopicByIdResponse> {
    const { data, error } = await this.client.rpc('hide_topic_by_id', request);
    if (error) {
      console.error('Error hiding topic by ID', error);
      throw new Error(error.message);
    }
    return data as HideTopicByIdResponse;
  }

  async postNewTopicReply(
    request: PostNewTopicReplyRequest,
  ): Promise<PostNewTopicReplyResponse> {
    const { data, error } = await this.client.rpc(
      'post_new_topic_reply',
      request,
    );
    if (error) {
      console.error('Error posting new topic reply in repo', error);
      throw new Error(error.message);
    }
    return data as PostNewTopicReplyResponse;
  }
  async createTopicTimeline(
    request: CreateTopicTimelineRequest,
  ): Promise<CreateTopicTimelineResponse> {
    const { data, error } = await this.client.rpc(
      'create_topic_timeline',
      request,
    );
    if (error) {
      console.error('Error creating topic timeline in repo', error);
      throw new Error(error.message);
    }
    return data as CreateTopicTimelineResponse;
  }
  async updateTopicProperties(
    request: UpdateTopicPropertiesRequest,
  ): Promise<UpdateTopicPropertiesResponse> {
    const { data, error } = await this.client.rpc(
      'update_topic_properties',
      request,
    );
    if (error) {
      console.error('Error updating topic properties in repo', error);
      throw new Error(error.message);
    }
    return data as UpdateTopicPropertiesResponse;
  }

  async getTopicParticipants(
    request: GetTopicParticipantsByTopicIdRequest,
  ): Promise<GetTopicParticipantsByTopicIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_participants_by_topic_id',
      request,
    );
    if (error) {
      console.error('Error fetching topic participants by topic ID', error);
      throw new Error(error.message);
    }
    return data as GetTopicParticipantsByTopicIdResponse;
  }

  async updateTopicContexts(
    request: UpdateTopicContextsRequest,
  ): Promise<UpdateTopicContextsResponse> {
    const { data, error } = await this.client.rpc(
      'update_topic_contexts',
      request,
    );
    if (error) {
      console.error('Error updating topic contexts in repo', error);
      throw new Error(error.message);
    }
    return data as UpdateTopicContextsResponse;
  }

  async getTopicContextsByProjectId(
    request: GetTopicContextsByProjectIdRequest,
  ): Promise<GetTopicContextsByProjectIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_contexts_by_project_id',
      request,
    );
    if (error) {
      console.error('Error fetching topic contexts by project ID', error);
      throw new Error(error.message);
    }
    return data as GetTopicContextsByProjectIdResponse;
  }

  async updateTopicTitle(
    request: UpdateTopicTitleRequest,
  ): Promise<UpdateTopicTitleResponse> {
    const { data, error } = await this.client.rpc(
      'update_topic_title',
      request,
    );
    if (error) {
      console.error('Error updating topic title in repo', error);
      throw new Error(error.message);
    }
    return data as UpdateTopicTitleResponse;
  }

  async getTagsByIds(
    request: GetTagsByIdsRequest,
  ): Promise<GetTagsByIdsResponse> {
    const { data, error } = await this.client.rpc('get_tags_by_ids', request);
    if (error) {
      console.error('Error fetching tags by IDs', error);
      throw new Error(error.message);
    }
    return data as GetTagsByIdsResponse;
  }

  async getTopicActivitiesByIds(
    request: GetTopicActivitiesByIdsRequest,
  ): Promise<GetTopicActivitiesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_activities_by_ids',
      request,
    );
    if (error) {
      console.error('Error fetching topic activities by IDs', error);
      throw new Error(error.message);
    }
    return data as GetTopicActivitiesByIdsResponse;
  }

  async getTopicRepliesByIds(
    request: GetTopicRepliesByIdsRequest,
  ): Promise<GetTopicRepliesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_replies_by_ids',
      request,
    );
    if (error) {
      console.error('Error fetching topic replies by IDs', error);
      throw new Error(error.message);
    }
    return data as GetTopicRepliesByIdsResponse;
  }

  async getTopicContextsByIds(
    request: GetTopicContextsByIdsRequest,
  ): Promise<GetTopicContextsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_contexts_by_ids',
      request,
    );
    if (error) {
      console.error('Error fetching topic contexts by IDs', error);
      throw new Error(error.message);
    }
    return data as GetTopicContextsByIdsResponse;
  }

  async getTopicPropertiesByIds(
    request: GetTopicPropertiesByIdsRequest,
  ): Promise<GetTopicPropertiesByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_properties_by_ids',
      request,
    );
    if (error) {
      console.error('Error fetching topic properties by IDs', error);
      throw new Error(error.message);
    }
    return data as GetTopicPropertiesByIdsResponse;
  }

  async getTopicDocumentsByIds(
    request: GetTopicDocumentsByIdsRequest,
  ): Promise<GetTopicDocumentsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_documents_by_ids',
      request,
    );
    if (error) {
      console.error('Error fetching topic documents by IDs', error);
      throw new Error(error.message);
    }
    return data as GetTopicDocumentsByIdsResponse;
  }

  async getUpdatedTopicsByProject(
    request: GetUpdatedTopicsByProjectRequest,
  ): Promise<GetUpdatedTopicsByProjectResponse> {
    const { data, error } = await this.client.rpc(
      'get_updated_topics_by_project',
      request,
    );
    if (error) {
      console.error('Error fetching updated topics by project', error);
      throw new Error(error.message);
    }
    return data as GetUpdatedTopicsByProjectResponse;
  }

  async addTopicTagsByIds(
    request: AddTopicTagsByIdsRequest,
  ): Promise<AddTopicTagsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'add_topic_tags_by_ids',
      request,
    );
    if (error) {
      console.error('Error adding topic tags by IDs', error);
      throw new Error(error.message);
    }
    return data as AddTopicTagsByIdsResponse;
  }

  async hideTopicTagsByIds(
    request: HideTopicTagsByIdsRequest,
  ): Promise<HideTopicTagsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'hide_topic_tags_by_ids',
      request,
    );
    if (error) {
      console.error('Error hiding topic tags by IDs', error);
      throw new Error(error.message);
    }
    return data as HideTopicTagsByIdsResponse;
  }

  async getTopicTagIdsByTopicIds(
    request: GetTopicTagIdsByTopicIdsRequest,
  ): Promise<GetTopicTagIdsByTopicIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_tag_ids_by_topic_ids',
      request,
    );
    if (error) {
      console.error('Error fetching topic tag IDs by topic IDs', error);
      throw new Error(error.message);
    }
    return data as GetTopicTagIdsByTopicIdsResponse;
  }

  async addTopicUsersByIds(
    request: AddTopicUsersByIdsRequest,
  ): Promise<AddTopicUsersByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'add_topic_users_by_ids',
      request,
    );
    if (error) {
      console.error('Error adding topic users by IDs', error);
      throw new Error(error.message);
    }
    return data as AddTopicUsersByIdsResponse;
  }

  async hideTopicUsersByIds(
    request: HideTopicUsersByIdsRequest,
  ): Promise<HideTopicUsersByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'hide_topic_users_by_ids',
      request,
    );
    if (error) {
      console.error('Error hiding topic users by IDs', error);
      throw new Error(error.message);
    }
    return data as HideTopicUsersByIdsResponse;
  }

  async getTopicUserIdsByTopicIds(
    request: GetTopicUserIdsByTopicIdsRequest,
  ): Promise<GetTopicUserIdsByTopicIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_topic_user_ids_by_topic_ids',
      request,
    );
    if (error) {
      console.error('Error fetching topic user IDs by topic IDs', error);
      throw new Error(error.message);
    }
    return data as GetTopicUserIdsByTopicIdsResponse;
  }

  async updateTopicStateById(
    request: UpdateTopicStateByIdRequest,
  ): Promise<UpdateTopicStateByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_topic_state_by_id',
      request,
    );
    if (error) {
      console.error('Error updating topic state by ID', error);
      throw new Error(error.message);
    }
    return data as UpdateTopicStateByIdResponse;
  }

  async updateTopicFrameById(
    request: UpdateTopicFrameByIdRequest,
  ): Promise<UpdateTopicFrameByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_topic_frame_by_id',
      request,
    );
    if (error) {
      console.error('Error updating topic frame by ID', error);
      throw new Error(error.message);
    }
    return data as UpdateTopicFrameByIdResponse;
  }

  async hideTopicsFilteringShortcutsByIds(
    request: HideTopicsFilteringShortcutsByIdsRequest,
  ): Promise<HideTopicsFilteringShortcutsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'hide_topics_filtering_shortcuts_by_ids',
      request,
    );
    if (error) {
      console.error('Error hiding topics filtering shortcuts by IDs', error);
      throw new Error(error.message);
    }
    return data as HideTopicsFilteringShortcutsByIdsResponse;
  }

  async updateTopicsFilteringShortcutById(
    request: UpdateTopicsFilteringShortcutByIdRequest,
  ): Promise<UpdateTopicsFilteringShortcutByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_topics_filtering_shortcut_by_id',
      request,
    );
    if (error) {
      console.error('Error updating topics filtering shortcut by ID', error);
      throw new Error(error.message);
    }
    return data as UpdateTopicsFilteringShortcutByIdResponse;
  }

  async addTopicsFilteringShortcutTagsById(
    request: AddTopicsFilteringShortcutTagsByIdRequest,
  ): Promise<AddTopicsFilteringShortcutTagsByIdResponse> {
    const { data, error } = await this.client.rpc(
      'add_topics_filtering_shortcut_tags_by_id',
      request,
    );
    if (error) {
      console.error('Error adding topics filtering shortcut tags by ID', error);
      throw new Error(error.message);
    }
    return data as AddTopicsFilteringShortcutTagsByIdResponse;
  }

  async hideTopicsFilteringShortcutTagsByIds(
    request: HideTopicsFilteringShortcutTagsByIdsRequest,
  ): Promise<HideTopicsFilteringShortcutTagsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'hide_topics_filtering_shortcut_tags_by_ids',
      request,
    );
    if (error) {
      console.error(
        'Error hiding topics filtering shortcut tags by IDs',
        error,
      );
      throw new Error(error.message);
    }
    return data as HideTopicsFilteringShortcutTagsByIdsResponse;
  }

  async getTopicsFilteringShortcutTagsById(
    request: GetTopicsFilteringShortcutTagsByIdRequest,
  ): Promise<GetTopicsFilteringShortcutTagsByIdResponse> {
    const { data, error } = await this.client.rpc(
      'get_topics_filtering_shortcut_tags_by_id',
      request,
    );
    if (error) {
      console.error(
        'Error fetching topics filtering shortcut tags by ID',
        error,
      );
      throw new Error(error.message);
    }
    return data as GetTopicsFilteringShortcutTagsByIdResponse;
  }

  async createTopicsFilteringShortcut(
    request: CreateTopicsFilteringShortcutRequest,
  ): Promise<CreateTopicsFilteringShortcutResponse> {
    const { data, error } = await this.client.rpc(
      'create_topics_filtering_shortcut',
      request,
    );
    if (error) {
      console.error('Error creating topics filtering shortcut in repo', error);
      throw new Error(error.message);
    }
    return data as CreateTopicsFilteringShortcutResponse;
  }
}
