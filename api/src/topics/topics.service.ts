import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TopicsRepository } from 'src/topics/topics.repository';
import * as Y from 'yjs';
import { Uint8ArrayToHex } from 'helpers/binary';
import { Json } from 'src/__generated__/schema';
import { v4 as uuidv4 } from 'uuid';
import {
  GetTopicsByProjectIdRequest,
  SearchTopicsByProjectIdRequest,
  GetTopicsFilteringShortcutsByProjectIdRequest,
  GetTopicContextByIdRequest,
  GetTopicContextsByTopicIdRequest,
  CreateNewTopicContextRequest,
  UpdateTopicContextByIdRequest,
  HideTopicContextByIdRequest,
  CreateNewTopicRequest,
  PostNewTopicCommentActivityRequest,
  UpdateTopicCommentActivityByIdRequest,
  HideTopicActivityWithRepliesByIdRequest,
  UpdateTopicReplyByIdRequest,
  HideTopicReplyByIdRequest,
  HideTopicByIdRequest,
  PostNewTopicReplyRequest,
  GetUserInfoByEmailRequest,
  GetTagsByProjectIdRequest,
  CreateTopicTimelineRequest,
  UpdateTopicPropertiesRequest,
  GetTopicParticipantsByTopicIdRequest,
  UpdateTopicContextsRequest,
  GetTopicContextsByProjectIdRequest,
  UpdateTopicTitleRequest,
  GetTopicDetailsByIdsRequest,
  GetTagsByIdsRequest,
  GetTopicActivitiesByIdsRequest,
  GetTopicRepliesByIdsRequest,
  GetTopicContextsByIdsRequest,
  GetTopicPropertiesByIdsRequest,
  GetTopicDocumentsByIdsRequest,
  AddTopicTagsByIdsRequest,
  HideTopicTagsByIdsRequest,
  GetTopicTagIdsByTopicIdsRequest,
  AddTopicUsersByIdsRequest,
  HideTopicUsersByIdsRequest,
  GetTopicUserIdsByTopicIdsRequest,
  UpdateTopicStateByIdRequest,
  CreateTopicsFilteringShortcutRequest,
  HideTopicsFilteringShortcutsByIdsRequest,
  UpdateTopicsFilteringShortcutByIdRequest,
  AddTopicsFilteringShortcutTagsByIdRequest,
  HideTopicsFilteringShortcutTagsByIdsRequest,
  GetTopicsFilteringShortcutTagsByIdRequest,
  UpdateTopicFrameByIdRequest,
  GetUpdatedTopicsByProjectRequest,
  GetTopicDetailsByIdsResponse,
  GetTopicsFilteringShortcutsByProjectIdResponse,
  GetTopicContextByIdResponse,
  GetTopicContextsByTopicIdResponse,
  GetTopicTagIdsByTopicIdsResponse,
} from 'src/__generated__/supabase.interface';
import {
  searchTopicsByProjectModel,
  TopicOutline,
  GetTopicsFilteringShortcutsByProjectIdModel,
  GetTopicTagIdsByIdsModel,
  TopicContextDetail,
  NewTopicContextId,
  UpdateTopicContext,
  HideTopicContext,
  TopicId,
  UpdateTopicDetailHeader,
  PostNewTopicCommentActivity,
  UpdateTopicCommentActivityById,
  HideTopicActivityWithRepliesById,
  UpdateTopicReplyById,
  HideTopicReplyById,
  HideTopicById,
  PostNewTopicReply,
  ProjectTopicContext,
  UpdateTopicFrameByIdModel,
  UpdateTopicTagsByIdsModel,
  UpdateTopicUsersByIdsModel,
  UpdateTopicStateByIdModel,
  CreateTopicsFilteringShortcutModel,
  HideTopicsFilteringShortcutsByIdsModel,
  UpdateTopicsFilteringShortcutByIdModel,
  TopicDetail,
} from './entities/topic.entity';
import { OwnersService } from 'src/owners/owners.service';
import { ProjectsService } from 'src/projects/projects.service';
import { FramesService } from 'src/frames/frames.service';
import { GetFrameDetailsByIdsModel } from 'src/frames/entities/frame.entity';
import { promiseAll } from 'helpers/utills';
import { AuthResponse } from '@supabase/supabase-js';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class TopicsService {
  constructor(
    private readonly topicsRepository: TopicsRepository,
    private readonly ownersService: OwnersService,
    private readonly projectsService: ProjectsService,
    private readonly framesService: FramesService,
    private readonly supabaseService: SupabaseService,
  ) {}

  private get client() {
    return this.supabaseService.getClient();
  }

  async createNewTopic({
    // ownerId,
    topicId,
    title,
    state,
    frameId,
    projectId,
    participants,
    createdBy,
    reviewer,
    assignee,
    tags,
    createdAt,
    timeline,
    properties,
    templateId,
    document,
    suggestionId,
  }: {
    topicId?: string;
    // ownerId: string,
    projectId: string;
    frameId: string | undefined;
    participants: {
      id: string;
      email: string;
    }[];
    title: string;
    state: string;
    createdBy: {
      id: string;
      email: string;
    };
    reviewer: {
      id: string;
      email: string;
    };
    assignee: {
      id: string;
      email: string;
    };
    tags: {
      name: string;
      color: string;
    }[];
    createdAt: number;
    timeline?: {
      activities: {
        type: string;
        postedBy: {
          id: string;
          email: string;
        };
        content: JSON;
        link: string;
        createdAt: number;
        replies: {
          postedBy: {
            id: string;
            email: string;
          };
          link: string;
          content: JSON;
          createdAt: number;
        }[];
      }[];
    };
    properties?: {
      id: string;
      type: string;
      name: string;
      frameId: string;
      content: string;
    }[];
    templateId?: string;
    document?: JSON;
    suggestionId?: string;
  }): Promise<{
    topicId: string;
  }> {
    // ユーザーIDを取得する
    const userEmails: string[] = [];
    participants.forEach((participant) => {
      if (!userEmails.includes(participant.email)) {
        userEmails.push(participant.email);
      }
    });
    if (!userEmails.includes(createdBy.email)) {
      userEmails.push(createdBy.email);
    }
    if (!userEmails.includes(reviewer.email)) {
      userEmails.push(reviewer.email);
    }
    if (!userEmails.includes(assignee.email)) {
      userEmails.push(assignee.email);
    }
    timeline?.activities.forEach((activity) => {
      if (!userEmails.includes(activity.postedBy.email)) {
        userEmails.push(activity.postedBy.email);
      }
      activity.replies.forEach((reply) => {
        if (!userEmails.includes(reply.postedBy.email)) {
          userEmails.push(reply.postedBy.email);
        }
      });
    });

    const userInfoResults = await Promise.all(
      userEmails.map((email) => this.ownersService.getUserInfoByEmail(email)),
    );

    const userInfos: {
      id: string;
      email: string;
      userName: string;
    }[] = [];
    userInfoResults.forEach((results) => {
      if (results) {
        userInfos.push({
          id: results[0].user_id ?? null,
          email: results[0].user_email ?? null,
          userName: results[0].user_name ?? null,
        });
      }
    });

    //  tagを確認して、なければ作成する
    const tagIds: string[] = [];
    const newTags: {
      name: string;
      color: string;
    }[] = [];
    try {
      const tagResults = await this.projectsService.getTagsByProjectId({
        projectId,
      });
      if (tagResults) {
        tags.forEach((tag) => {
          const tagResult = tagResults?.find(
            (tagResult) => tagResult.name === tag.name,
          );
          if (tagResult) {
            tagIds.push(tagResult.id);
          } else {
            newTags.push(tag);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching tags by project:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching tags.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const newTagResults = await Promise.all(
        newTags.map((tag) =>
          this.projectsService.createNewTag({
            projectId: projectId,
            name: tag.name,
            color: tag.color,
            creatorId: createdBy.id,
            description: '',
          }),
        ),
      );
      newTagResults.forEach((result) => {
        if (result) {
          tagIds.push(result.newTagId.split(':')[1]?.trim());
        }
      });
    } catch (error) {
      console.error('Error creating new tags:', error);
      throw new HttpException(
        'An unexpected error occurred while creating new tags.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    let newTopicId: string;
    try {
      const ydoc = new Y.Doc();
      const encodedContent = Y.encodeStateAsUpdate(ydoc);
      const hexContent = Uint8ArrayToHex(encodedContent);

      //  topicを作成する
      const request: CreateNewTopicRequest = {
        p_topic_id: topicId,
        p_suggestion_id: suggestionId,
        p_user_id:
          createdBy.id !== '' && createdBy.id
            ? createdBy.id
            : (userInfos.find((userInfo) => userInfo.email === createdBy.email)
                ?.id ?? 'c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7'),
        p_title: title,
        p_state: state,
        p_frame_id: frameId,
        p_project_id: projectId,
        p_created_at: new Date(createdAt * 1000).toISOString(),
        p_participant_ids: [
          ...participants.map((participant) =>
            participant.id !== '' && participant.id
              ? participant.id
              : (userInfos.find(
                  (userInfo) => userInfo.email === participant.email,
                )?.id ?? 'c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7'),
          ),
          '12345678-aaaa-bbbb-cccc-000000000000',
        ],
        p_reviewer_id:
          reviewer.id !== '' && reviewer.id
            ? reviewer.id
            : (userInfos.find((userInfo) => userInfo.email === reviewer.email)
                ?.id ?? 'c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7'),
        p_assignee_id:
          assignee.id !== '' && assignee.id
            ? assignee.id
            : (userInfos.find((userInfo) => userInfo.email === assignee.email)
                ?.id ?? 'c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7'),
        p_tag_ids: tagIds,
        p_priority: 'Medium', // TODO: ここを修正する
        p_is_subscribe: true, // TODO: ここを修正する
        p_config: { setting1: 'value1', setting2: 'value2' },
        p_template_id: templateId,
        p_initial_content: document as unknown as Json,
        p_initial_content_hex: hexContent,
      };

      const result = await this.topicsRepository.createNewTopic(request);
      newTopicId = result;
    } catch (error) {
      console.error('Error creating new topic:', error);
      throw new HttpException(
        'An unexpected error occurred while creating a new topic.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // propertyを作成する
    if (properties) {
      try {
        const propertyRequests: UpdateTopicPropertiesRequest = {
          p_topic_id: newTopicId,
          p_properties: properties.map((property) => {
            return {
              property_id: property.id,
              content: property.content,
            };
          }),
          p_creator_id:
            userInfos.find((userInfo) => userInfo.email === createdBy.email)
              ?.id ?? 'c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7', // TODO: ここを修正する
        };
        const propertyResult =
          await this.topicsRepository.updateTopicProperties(propertyRequests);
      } catch (error) {
        console.error('Error creating properties:', error);
        throw new HttpException(
          'An unexpected error occurred while creating properties.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // timelineを作成する
    if (timeline) {
      try {
        const timelineRequest: CreateTopicTimelineRequest = {
          p_activities: timeline.activities.map((activity) => {
            return {
              topicId: topicId,
              postedBy:
                userInfos.find(
                  (userInfo) => userInfo.email === activity.postedBy.email,
                )?.id ?? 'c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7', // TODO: ここを修正する
              content: activity.content,
              createdAt: new Date(activity.createdAt * 1000).toISOString(),
              type: activity.type,
              reply: activity.replies.map((reply) => {
                return {
                  postedBy:
                    userInfos.find(
                      (userInfo) => userInfo.email === reply.postedBy.email,
                    )?.id ?? 'c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7', // TODO: ここを修正する
                  comment: reply.content,
                  createdAt: new Date(reply.createdAt * 1000).toISOString(),
                };
              }),
            };
          }) as unknown as Json,
        };

        const timelineResult =
          await this.topicsRepository.createTopicTimeline(timelineRequest);
      } catch (error) {
        console.error('Error creating timeline:', error);
        throw new HttpException(
          'An unexpected error occurred while creating a timeline.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return {
      topicId: newTopicId,
    };
  }

  async getTopicsByProject({
    projectId,
  }: {
    projectId: string;
  }): Promise<TopicOutline[]> {
    let data: TopicOutline[];
    try {
      const request: GetTopicsByProjectIdRequest = {
        p_project_id: projectId,
      };
      const result = await this.topicsRepository.getTopicsByProject(request);
      data = result;
    } catch (error) {
      console.error('Error fetching topics by project:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topics.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return data;
  }

  async getTopicDetailsByIds({
    topicIds,
  }: {
    topicIds: string[];
  }): Promise<TopicDetail[]> {
    let details: GetTopicDetailsByIdsResponse = [];
    try {
      const request: GetTopicDetailsByIdsRequest = {
        p_topic_ids: topicIds,
      };
      const result = await this.topicsRepository.getTopicDetailsByIds(request);
      details = result;
    } catch (error) {
      console.error('Error fetching topic details:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic details.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    let [
      tags,
      participants,
      activities,
      contexts,
      properties,
      documents,
      frames,
    ]: [
      {
        id: string;
        name: string;
        color: string;
      }[],
      {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
      }[],
      {
        id: string;
        icon: string;
        postedBy: string;
        postedAt: string;
        contentJson: Json;
        type: string;
        suggestionId: string;
        replies: {
          id: string;
          parentId: string;
          icon: string;
          postedBy: string;
          postedAt: string;
          contentJson: Json;
        }[];
      }[],
      {
        id: string;
        name: string;
        description: string;
        type: string;
        topicId: string;
        topicNum: number;
        topicName: string;
        suggestionId?: string;
      }[],
      {
        id: string;
        name: string;
        type: string;
        content: string;
        creatorId: string;
        createdAt: string;
        framePropertyId: string;
      }[],
      {
        id: string;
        contentJson: Json;
        contentHex: string;
        version: number;
      }[],
      GetFrameDetailsByIdsModel,
    ] = [[], [], [], [], [], [], []];
    try {
      const promises = [
        this.getTagsByIds({
          tagIds: details?.map((topic) => topic.tag_ids).flat() ?? [],
        }),
        this.ownersService.getUserInfosByIds({
          userIds: details?.map((topic) => topic.participant_ids).flat() ?? [],
        }),
        this.getTopicActivitiesByIds({
          activityIds: details?.map((topic) => topic.activity_ids).flat() ?? [],
        }),
        this.getTopicContextsByIds({
          contextIds: details?.map((topic) => topic.context_ids).flat() ?? [],
        }),
        this.getTopicPropertiesByIds({
          propertyIds: details?.map((topic) => topic.property_ids).flat() ?? [],
        }),
        this.getTopicDocumentsByIds({
          documentIds: details?.map((topic) => topic.document_ids).flat() ?? [],
        }),
        this.framesService.getFrameDetailsByIds({
          frameIds: details?.map((topic) => topic.frame_id).flat() ?? [],
        }),
      ];
      const [
        tagsResult,
        participantsResult,
        activitiesResult,
        contextsResult,
        propertiesResult,
        documentsResult,
        framesResult,
      ] = await Promise.all(promises);
      tags = tagsResult as {
        id: string;
        name: string;
        color: string;
      }[];
      participants = participantsResult as {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
      }[];
      activities = activitiesResult as {
        id: string;
        icon: string;
        postedBy: string;
        postedAt: string;
        contentJson: Json;
        type: string;
        suggestionId: string;
        replies: {
          id: string;
          parentId: string;
          icon: string;
          postedBy: string;
          postedAt: string;
          contentJson: Json;
        }[];
      }[];

      contexts = contextsResult as {
        id: string;
        name: string;
        description: string;
        type: string;
        topicId: string;
        topicNum: number;
        topicName: string;
        suggestionId: string;
      }[];

      properties = propertiesResult as {
        id: string;
        name: string;
        type: string;
        content: string;
        creatorId: string;
        createdAt: string;
        framePropertyId: string;
      }[];
      documents = documentsResult as {
        id: string;
        contentJson: Json;
        contentHex: string;
        version: number;
      }[];
      frames = framesResult as GetFrameDetailsByIdsModel;
    } catch (error) {
      console.error('Error fetching related data:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching related data.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const response = details.map((topic) => {
      return {
        id: topic.topic_id,
        title: topic.title,
        topicNum: topic.topic_num as unknown as number,
        state: topic.state,
        createdBy: topic.created_by,
        createdAt: topic.created_at,
        frame: frames.find((frame) => topic.frame_id === frame.id),
        tags: tags.filter((tag) => topic.tag_ids.includes(tag.id)) ?? [],
        participants:
          participants.filter((participant) =>
            topic.participant_ids.includes(participant.id),
          ) ?? [],
        activities:
          activities.filter((activity) =>
            topic.activity_ids.includes(activity.id),
          ) ?? [],
        contexts:
          contexts.filter((context) =>
            topic.context_ids.includes(context.id),
          ) ?? [],
        properties:
          properties.filter((property) =>
            topic.property_ids.includes(property.id),
          ) ?? [],
        documnets:
          documents.filter((document) =>
            topic.document_ids.includes(document.id),
          ) ?? [],
      };
    });

    return response;
  }

  async getTagsByIds({ tagIds }: { tagIds: string[] }): Promise<
    {
      id: string;
      name: string;
      color: string;
    }[]
  > {
    let tags: {
      id: string;
      name: string;
      color: string;
    }[] = [];
    try {
      const request: GetTagsByIdsRequest = {
        p_tag_ids: tagIds,
      };
      const result = await this.topicsRepository.getTagsByIds(request);
      tags = result;
    } catch (error) {
      console.error('Error fetching tags by ids:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching tags.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return tags ?? [];
  }

  async getTopicActivitiesByIds({
    activityIds,
  }: {
    activityIds: string[];
  }): Promise<
    {
      id: string;
      icon: string;
      postedBy: string;
      postedAt: string;
      contentJson: Json;
      type: string;
      suggestionId: string;
      replies: {
        id: string;
        parentId: string;
        icon: string;
        postedBy: string;
        postedAt: string;
        contentJson: Json;
      }[];
    }[]
  > {
    let activities: {
      id: string;
      icon: string;
      postedBy: string;
      postedAt: string;
      contentJson: Json;
      type: string;
      replyIds: string[];
      suggestionId: string;
    }[] = [];
    try {
      const request: GetTopicActivitiesByIdsRequest = {
        p_activity_ids: activityIds,
      };
      const result =
        await this.topicsRepository.getTopicActivitiesByIds(request);
      activities = result.map((activity) => {
        return {
          id: activity.id,
          icon: activity.icon,
          postedBy: activity.postedby,
          postedAt: activity.postedat,
          contentJson: activity.content_json,
          type: activity.type,
          replyIds: activity.reply_ids,
          suggestionId: activity.suggestionid,
        };
      });
    } catch (error) {
      console.error('Error fetching topic activities:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic activities.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const replyIds = activities?.map((activity) => activity.replyIds).flat();

    let replies: {
      id: string;
      parentId: string;
      icon: string;
      postedBy: string;
      postedAt: string;
      contentJson: Json;
    }[] = [];
    try {
      const repliesResult = await this.getTopicRepliesByIds({
        replyIds: replyIds ?? [],
      });
      replies = repliesResult ?? [];
    } catch (error) {
      console.error('Error fetching topic replies:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic replies.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const response = activities?.map((activity) => {
      return {
        id: activity.id,
        icon: activity.icon,
        postedBy: activity.postedBy,
        postedAt: activity.postedAt,
        contentJson: activity.contentJson,
        type: activity.type,
        suggestionId: activity.suggestionId,
        replies:
          replies?.filter((reply) => activity.replyIds.includes(reply.id)) ??
          [],
      };
    });
    return response ?? [];
  }

  async getTopicRepliesByIds({ replyIds }: { replyIds: string[] }): Promise<
    {
      id: string;
      parentId: string;
      icon: string;
      postedBy: string;
      postedAt: string;
      contentJson: Json;
    }[]
  > {
    let replies: {
      id: string;
      parentId: string;
      icon: string;
      postedBy: string;
      postedAt: string;
      contentJson: Json;
    }[];
    try {
      const request: GetTopicRepliesByIdsRequest = {
        p_reply_ids: replyIds,
      };
      const result = await this.topicsRepository.getTopicRepliesByIds(request);
      replies = result.map((reply) => {
        return {
          id: reply.id,
          parentId: reply.parent_id,
          icon: reply.icon,
          postedBy: reply.postedby,
          postedAt: reply.postedat,
          contentJson: reply.content_json,
        };
      });
    } catch (error) {
      console.error('Error fetching topic replies:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic replies.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return replies ?? [];
  }

  async getTopicContextsByIds({
    contextIds,
  }: {
    contextIds: string[];
  }): Promise<
    {
      id: string;
      name: string;
      description: string;
      type: string;
      topicId: string;
      topicNum: number;
      topicName: string;
      suggestionId?: string;
    }[]
  > {
    let contexts: {
      id: string;
      name: string;
      description: string;
      type: string;
      topicId: string;
      topicNum: number;
      topicName: string;
      suggestionId?: string;
    }[];
    try {
      const request: GetTopicContextsByIdsRequest = {
        p_context_ids: contextIds,
      };
      const result = await this.topicsRepository.getTopicContextsByIds(request);
      contexts = result.map((context) => {
        return {
          id: context.id,
          name: context.name,
          description: context.description,
          type: context.type,
          topicId: context.topic_id,
          topicNum: context.topic_num as unknown as number,
          topicName: context.topic_name,
          suggestionId: context.suggestion_id,
        };
      });
    } catch (error) {
      console.error('Error fetching topic contexts:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic contexts.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return contexts ?? [];
  }

  async getTopicPropertiesByIds({
    propertyIds,
  }: {
    propertyIds: string[];
  }): Promise<
    {
      id: string;
      name: string;
      type: string;
      content: string;
      creatorId: string;
      createdAt: string;
      framePropertyId: string;
    }[]
  > {
    let properties: {
      id: string;
      name: string;
      type: string;
      content: string;
      creatorId: string;
      createdAt: string;
      framePropertyId: string;
    }[];
    try {
      const request: GetTopicPropertiesByIdsRequest = {
        p_property_ids: propertyIds,
      };
      const result =
        await this.topicsRepository.getTopicPropertiesByIds(request);
      properties = result.map((property) => {
        return {
          id: property.id,
          name: property.name,
          type: property.type,
          content: property.content,
          creatorId: property.creator_id,
          createdAt: property.created_at,
          framePropertyId: property.frame_property_id,
        };
      });
    } catch (error) {
      console.error('Error fetching topic properties:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic properties.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return properties ?? [];
  }

  async getTopicDocumentsByIds({
    documentIds,
  }: {
    documentIds: string[];
  }): Promise<
    {
      id: string;
      contentJson: Json;
      contentHex: string;
      version: number;
    }[]
  > {
    let documents: {
      id: string;
      contentJson: Json;
      contentHex: string;
      version: number;
    }[];
    try {
      const request: GetTopicDocumentsByIdsRequest = {
        p_document_ids: documentIds,
      };
      const result =
        await this.topicsRepository.getTopicDocumentsByIds(request);
      documents = result.map((document) => {
        return {
          id: document.id,
          contentJson: document.content_json,
          contentHex: document.content_hex,
          version: document.version,
        };
      });
    } catch (error) {
      console.error('Error fetching topic documents:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic documents.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return documents ?? [];
  }
  async getUpdatedTopicsByProject({
    projectId,
  }: {
    projectId: string;
  }): Promise<
    {
      topicId: string;
      topicNum: number;
      title: string;
    }[]
  > {
    let topics: {
      topicId: string;
      topicNum: number;
      title: string;
    }[];
    try {
      const request: GetUpdatedTopicsByProjectRequest = {
        p_project_id: projectId,
      };
      const result =
        await this.topicsRepository.getUpdatedTopicsByProject(request);
      topics = result.map((topic) => {
        return {
          topicId: topic.topic_id,
          topicNum: topic.topic_num,
          title: topic.title,
        };
      });
    } catch (error) {
      console.error('Error fetching updated topics:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching updated topics.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return topics ?? [];
  }

  async searchTopicsByProject({
    projectId,
    userId,
    status,
    frameId,
    tags,
    search,
    isFrameConflict,
    sort,
    page,
    pageSize,
  }: {
    projectId: string;
    userId: string;
    status: string;
    frameId: string | undefined;
    tags: string[];
    search: string;
    isFrameConflict: boolean;
    sort: string;
    page: number;
    pageSize: number;
  }): Promise<searchTopicsByProjectModel[]> {
    let topics: {
      topicId: string;
      state: string;
      title: string;
      frameId: string;
      propertyIds: string[];
      tagIds: string[];
      topicNum: number;
      createdBy: string;
      createdAt: string;
      icon: string;
      participantIds: string[];
      commentNum: number;
      isConflicting: boolean;
      suggestionId: string;
    }[];
    try {
      const request: SearchTopicsByProjectIdRequest = {
        p_project_id: projectId,
        p_user_id: userId,
        p_status: status,
        p_frame_id: frameId,
        p_tags: tags,
        p_search: search,
        p_is_frame_conflict: isFrameConflict,
        p_sort: sort,
        p_page: page,
        p_page_size: pageSize,
      };
      const result = await this.topicsRepository.searchTopicsByProject(request);
      topics = result.map((topic) => {
        return {
          topicId: topic.topic_id,
          title: topic.title,
          topicNum: topic.topic_num as unknown as number,
          state: topic.state,
          commentNum: topic.comment_num as unknown as number,
          createdBy: topic.created_by,
          createdAt: topic.created_at,
          frameId: topic.frame_id,
          isConflicting: topic.is_conflicting,
          suggestionId: topic.suggestion_id ?? undefined,
          propertyIds: topic.property_ids,
          tagIds: topic.tag_ids,
          icon: topic.icon,
          participantIds: topic.participant_ids,
        };
      });
    } catch (error) {
      console.error('Error fetching topics by project:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topics by project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const frameIds = topics?.map((topic) => topic.frameId).flat();
    const tagIds = topics?.map((topic) => topic.tagIds).flat();
    const participantIds = topics?.map((topic) => topic.participantIds).flat();
    const propertyIds = topics?.map((topic) => topic.propertyIds).flat();

    let frames: GetFrameDetailsByIdsModel = [];
    let tagDetails: {
      id: string;
      name: string;
      color: string;
    }[] = [];
    let participants: {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    }[] = [];
    let properties: {
      id: string;
      name: string;
      type: string;
      content: string;
      creatorId: string;
      createdAt: string;
      framePropertyId: string;
    }[] = [];
    try {
      const promises = [
        this.framesService.getFrameDetailsByIds({ frameIds: frameIds }),
        this.getTagsByIds({ tagIds: tagIds }),
        this.ownersService.getUserInfosByIds({ userIds: participantIds }),
        this.getTopicPropertiesByIds({ propertyIds: propertyIds }),
      ] as const;

      const [framesResult, tagsResult, participantsResult, propertiesResult] =
        await promiseAll(promises);
      frames = framesResult;
      tagDetails = tagsResult;
      participants = participantsResult;
      properties = propertiesResult;
    } catch (error) {
      console.error('Error fetching related data:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching related data.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const response: searchTopicsByProjectModel[] = topics?.map((topic) => {
      return {
        topicId: topic.topicId,
        title: topic.title,
        topicNum: topic.topicNum as unknown as number,
        state: topic.state,
        commentNum: topic.commentNum as unknown as number,
        createdBy: topic.createdBy,
        createdAt: topic.createdAt,
        frameId: topic.frameId,
        frameName:
          frames?.find((frame) => frame.id === topic.frameId)?.name ?? '',
        frameDescription:
          frames?.find((frame) => frame.id === topic.frameId)?.description ??
          '',
        frameIcon: '', // TODO: fix this
        tags: tagDetails.filter((tag) => topic.tagIds.includes(tag.id)),
        participants: participants.filter((participant) =>
          topic.participantIds.includes(participant.id),
        ),
        properties: properties.filter((property) =>
          topic.propertyIds.includes(property.id),
        ),
        isConflicting: topic.isConflicting,
        suggestionId: topic.suggestionId ?? undefined,
      };
    });

    return response ?? [];
  }

  async getTopicsFilteringShortcutsByProjectId({
    projectId,
  }: {
    projectId: string;
  }): Promise<GetTopicsFilteringShortcutsByProjectIdModel> {
    let filteringShortcuts: GetTopicsFilteringShortcutsByProjectIdResponse = [];
    try {
      const getFilteringShortcutsByProjectIdRequest: GetTopicsFilteringShortcutsByProjectIdRequest =
        {
          p_project_id: projectId,
        };
      filteringShortcuts =
        await this.topicsRepository.getFilteringShortcutsByProjectId(
          getFilteringShortcutsByProjectIdRequest,
        );
    } catch (error) {
      console.error('Error fetching filtering shortcuts:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching filtering shortcuts.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 追加のビジネスロジックをここに記述可能
    const response: GetTopicsFilteringShortcutsByProjectIdModel =
      filteringShortcuts.map((shortcut) => {
        return {
          id: shortcut.shortcut_id,
          name: shortcut.name,
          description: shortcut.description,
          frameId: shortcut.frame_id,
          sort: shortcut.sort,
          state: shortcut.state,
          tagIds: shortcut.tag_ids,
        };
      });
    return response;
  }

  async getTopicContextById({
    topicContextId,
  }: {
    topicContextId: string;
  }): Promise<TopicContextDetail> {
    let topicContexts: GetTopicContextByIdResponse = [];
    try {
      const request: GetTopicContextByIdRequest = {
        p_topic_context_id: topicContextId,
      };
      topicContexts = await this.topicsRepository.getTopicContextById(request);
    } catch (error) {
      console.error('Error fetching topic context by id:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic context.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data: TopicContextDetail = {
      topicContextId: topicContexts[0].topic_context_id,
      name: topicContexts[0].name,
      description: topicContexts[0].description,
      type: topicContexts[0].type,
      topicId: topicContexts[0].topic_id,
      topicName: topicContexts[0].topic_name,
      topicNum: topicContexts[0].topic_num,
    };
    return data;
  }

  async getTopicContextsByTopicId({
    topicId,
  }: {
    topicId: string;
  }): Promise<TopicContextDetail[]> {
    let topicContexts: GetTopicContextsByTopicIdResponse = [];
    try {
      const request: GetTopicContextsByTopicIdRequest = {
        p_topic_id: topicId,
      };
      topicContexts =
        await this.topicsRepository.getTopicContextsByTopicId(request);
    } catch (error) {
      console.error('Error fetching topic contexts by topic id:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic contexts.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // 追加のビジネスロジックをここに記述可能
    const data: TopicContextDetail[] = topicContexts.map((context) => {
      return {
        topicContextId: context.topic_context_id,
        name: context.name,
        description: context.description,
        type: context.type,
        topicId: context.topic_id,
        topicName: context.topic_name,
        topicNum: context.topic_num,
      };
    });
    return data;
  }

  async createNewTopicContext({
    topicContextId,
    name,
    description,
    type,
    topicId,
    opponentTopicId,
    updaterId,
    suggestionId,
  }: {
    topicContextId: string;
    name: string;
    description: string;
    type: string;
    topicId: string;
    opponentTopicId: string;
    updaterId: string;
    suggestionId?: string;
  }): Promise<NewTopicContextId> {
    let newTopicContextId: string;
    try {
      const request: CreateNewTopicContextRequest = {
        p_topic_context_id: topicContextId,
        p_name: name,
        p_description: description,
        p_type: type,
        p_topic_id: topicId,
        p_opponent_topic_id: opponentTopicId,
        p_updater_id: updaterId,
        p_suggestion_id: suggestionId,
      };
      newTopicContextId =
        await this.topicsRepository.createNewTopicContext(request);
    } catch (error) {
      console.error('Error creating new topic context:', error);
      throw new HttpException(
        'An unexpected error occurred while creating a new topic context.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data: NewTopicContextId = {
      topicContextId: newTopicContextId,
    };
    return data;
  }

  async updateTopicContextById({
    topicContextId,
    name,
    description,
    type,
    updaterId,
    opponentTopicId,
  }: {
    topicContextId: string;
    name: string;
    description: string;
    type: string;
    updaterId: string;
    opponentTopicId: string;
  }): Promise<UpdateTopicContext> {
    try {
      const request: UpdateTopicContextByIdRequest = {
        p_topic_context_id: topicContextId,
        p_name: name,
        p_description: description,
        p_type: type,
        p_updater_id: updaterId,
        p_opponent_topic_id: opponentTopicId,
      };
      const result =
        await this.topicsRepository.updateTopicContextById(request);
    } catch (error) {
      console.error('Error updating topic context:', error);
      throw new HttpException(
        'An unexpected error occurred while updating topic context.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data: UpdateTopicContext = {
      topicContextId: topicContextId,
    };
    return data;
  }

  async hideTopicContextById({
    topicContextId,
    updaterId,
  }: {
    topicContextId: string;
    updaterId: string;
  }): Promise<HideTopicContext> {
    try {
      const request: HideTopicContextByIdRequest = {
        p_topic_context_id: topicContextId,
        p_updater_id: updaterId,
      };
      const result = await this.topicsRepository.hideTopicContextById(request);
    } catch (error) {
      console.error('Error hiding topic context:', error);
      throw new HttpException(
        'An unexpected error occurred while hiding topic context.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data: HideTopicContext = {
      topicContextId: topicContextId,
    };
    return data;
  }

  async postNewTopicCommentActivity({
    topicId,
    newComment,
    suggestionId,
  }: {
    topicId: string;
    newComment: Json;
    suggestionId?: string;
  }): Promise<PostNewTopicCommentActivity> {
    let activityId: string;
    try {
      const request: PostNewTopicCommentActivityRequest = {
        p_topic_id: topicId,
        p_new_comment: newComment,
        p_suggestion_id: suggestionId,
      };
      activityId =
        await this.topicsRepository.postNewTopicCommentActivity(request);
    } catch (error) {
      console.error('Error posting new comment activity:', error);
      throw new HttpException(
        'An unexpected error occurred while posting a new comment activity.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data: PostNewTopicCommentActivity = {
      activityId: activityId,
    };
    return data;
  }

  async updateTopicCommentActivityById({
    activityId,
    content,
  }: {
    activityId: string;
    content: Json;
  }): Promise<UpdateTopicCommentActivityById> {
    try {
      const request: UpdateTopicCommentActivityByIdRequest = {
        p_activity_id: activityId,
        p_new_content: content,
      };
      const result =
        await this.topicsRepository.updateTopicCommentActivityById(request);
    } catch (error) {
      console.error('Error updating comment activity:', error);
      throw new HttpException(
        'An unexpected error occurred while updating comment activity.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data: UpdateTopicCommentActivityById = {};
    return data;
  }

  async hideTopicActivityWithRepliesById({
    activityId,
  }: {
    activityId: string;
  }): Promise<HideTopicActivityWithRepliesById> {
    try {
      const request: HideTopicActivityWithRepliesByIdRequest = {
        p_activity_id: activityId,
      };
      const result =
        await this.topicsRepository.hideTopicActivityWithRepliesById(request);
    } catch (error) {
      console.error('Error hiding activity with replies:', error);
      throw new HttpException(
        'An unexpected error occurred while hiding activity with replies.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data: HideTopicActivityWithRepliesById = {};
    return {
      data: data,
    };
  }

  async updateTopicReplyById({
    replyId,
    content,
  }: {
    replyId: string;
    content: Json;
  }): Promise<UpdateTopicReplyById> {
    try {
      const request: UpdateTopicReplyByIdRequest = {
        p_reply_id: replyId,
        p_new_content: content,
      };
      const result = await this.topicsRepository.updateTopicReplyById(request);
    } catch (error) {
      console.error('Error updating reply:', error);
      throw new HttpException(
        'An unexpected error occurred while updating reply.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data: UpdateTopicReplyById = {};
    return {
      data: data,
    };
  }

  async hideTopicReplyById({
    replyId,
  }: {
    replyId: string;
  }): Promise<HideTopicReplyById> {
    try {
      const request: HideTopicReplyByIdRequest = {
        p_reply_id: replyId,
      };
      const result = await this.topicsRepository.hideTopicReplyById(request);
    } catch (error) {
      console.error('Error hiding reply:', error);
      throw new HttpException(
        'An unexpected error occurred while hiding reply.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data: HideTopicReplyById = {};
    return {
      data: data,
    };
  }

  async hideTopicById({
    topicId,
    hiderId,
  }: {
    topicId: string;
    hiderId: string;
  }): Promise<HideTopicById> {
    try {
      const request: HideTopicByIdRequest = {
        p_topic_id: topicId,
        p_hider_id: hiderId,
      };
      const result = await this.topicsRepository.hideTopicById(request);
    } catch (error) {
      console.error('Error hiding topic:', error);
      throw new HttpException(
        'An unexpected error occurred while hiding topic.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data: HideTopicById = {};
    return data;
  }

  async postNewTopicReply({
    topicId,
    newReply,
  }: {
    topicId: string;
    newReply: Json;
  }): Promise<PostNewTopicReply> {
    try {
      const request: PostNewTopicReplyRequest = {
        p_topic_id: topicId,
        p_new_reply: newReply,
      };
      const result = await this.topicsRepository.postNewTopicReply(request);
    } catch (error) {
      console.error('Error posting new reply:', error);
      throw new HttpException(
        'An unexpected error occurred while posting a new reply.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data: PostNewTopicReply = {};
    return data;
  }

  async getTopicParticipants({ topicId }: { topicId: string }): Promise<
    {
      participantId: string;
      userName: string;
      email: string;
      avatarUrl: string;
    }[]
  > {
    let participants: {
      participantId: string;
      userName: string;
      email: string;
      avatarUrl: string;
    }[];
    try {
      const request: GetTopicParticipantsByTopicIdRequest = {
        p_topic_uuid: topicId,
      };
      const result = await this.topicsRepository.getTopicParticipants(request);
      participants = result.map((participant) => {
        return {
          participantId: participant.participant_id,
          userName: participant.user_name,
          email: participant.email,
          avatarUrl: participant.avatar_url,
        };
      });
    } catch (error) {
      console.error('Error fetching topic participants:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic participants.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return participants ?? [];
  }

  async updateTopicContexts({
    topicId,
    contexts,
  }: {
    topicId: string;
    contexts: {
      contextId: string;
      name: string;
      description: string;
      type: string;
      opponentTopicId: string;
      updaterId: string;
    }[];
  }): Promise<{ message: string }> {
    try {
      const request: UpdateTopicContextsRequest = {
        p_topic_id: topicId,
        p_update_contexts: contexts.map((context) => {
          return {
            context_id: context.contextId,
            name: context.name,
            description: context.description,
            opponent_topic_id: context.opponentTopicId,
            type: context.type,
            updater_id: context.updaterId,
          };
        }),
      };
      const result = await this.topicsRepository.updateTopicContexts(request);
    } catch (error) {
      console.error('Error updating topic contexts:', error);
      throw new HttpException(
        'An unexpected error occurred while updating topic contexts.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const data = { message: 'success' };
    return data;
  }

  async getTopicContextsByProjectId({
    projectId,
  }: {
    projectId: string;
  }): Promise<ProjectTopicContext[]> {
    let contexts: {
      id: string;
      name: string;
      description: string;
      type: string;
      topicId: string;
      opponentTopicId: string;
    }[];
    try {
      const request: GetTopicContextsByProjectIdRequest = {
        p_project_id: projectId,
      };
      const result =
        await this.topicsRepository.getTopicContextsByProjectId(request);
      contexts = result.map((context) => {
        return {
          id: context.id,
          name: context.name,
          description: context.description,
          type: context.type,
          topicId: context.topic_id,
          opponentTopicId: context.opponent_topic_id,
        };
      });
    } catch (error) {
      console.error('Error fetching topic contexts by project id:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic contexts by project id.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return contexts ?? [];
  }

  async updateTopicTitle({
    topicId,
    title,
    updaterId,
  }: {
    topicId: string;
    title: string;
    updaterId: string;
  }): Promise<void> {
    try {
      const request: UpdateTopicTitleRequest = {
        p_topic_id: topicId,
        p_title: title,
        p_updater_id: updaterId,
      };
      const result = await this.topicsRepository.updateTopicTitle(request);
    } catch (error) {
      console.error('Error updating topic title:', error);
      throw new HttpException(
        'An unexpected error occurred while updating topic title.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return;
  }

  async updateTopicTagsByIds({
    topicId,
    tagIds,
    updaterId,
  }: {
    topicId: string;
    tagIds: string[];
    updaterId: string;
  }): Promise<UpdateTopicTagsByIdsModel> {
    // 既存のタグを確認し、addとhideに振り分け
    let existingTagIds: string[] = [];
    try {
      const getTopicTagIdsRequest: GetTopicTagIdsByTopicIdsRequest = {
        p_topic_ids: [topicId],
      };
      const result = await this.topicsRepository.getTopicTagIdsByTopicIds(
        getTopicTagIdsRequest,
      );
      existingTagIds = result[0]?.tag_ids ?? [];
    } catch (error) {
      console.error('Error getting topic tag ids:', error);
      throw new HttpException(
        'An unexpected error occurred while getting topic tag ids.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const addTagIds = tagIds.filter((tagId) => !existingTagIds.includes(tagId));
    const hideTagIds = existingTagIds.filter(
      (tagId) => !tagIds.includes(tagId),
    );

    // タグを追加
    try {
      const addTopicTagsByIdsRequest: AddTopicTagsByIdsRequest = {
        p_topic_id: topicId,
        p_tag_ids: addTagIds,
        p_updater_id: updaterId,
      };
      const addTopicTagsByIdsResult =
        await this.topicsRepository.addTopicTagsByIds(addTopicTagsByIdsRequest);
    } catch (error) {
      console.error('Error adding topic tags:', error);
      throw new HttpException(
        'An unexpected error occurred while adding topic tags.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // タグを非表示
    try {
      const hideTopicTagsByIdsRequest: HideTopicTagsByIdsRequest = {
        p_topic_id: topicId,
        p_tag_ids: hideTagIds,
        p_updater_id: updaterId,
      };
      const hideTopicTagsByIdsResult =
        await this.topicsRepository.hideTopicTagsByIds(
          hideTopicTagsByIdsRequest,
        );
    } catch (error) {
      console.error('Error hiding topic tags:', error);
      throw new HttpException(
        'An unexpected error occurred while hiding topic tags.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const response: UpdateTopicTagsByIdsModel = {};
    return response;
  }

  async updateTopicUsersByIds({
    topicId,
    userIds,
    updaterId,
  }: {
    topicId: string;
    userIds: string[];
    updaterId: string;
  }): Promise<UpdateTopicUsersByIdsModel> {
    // 既存のユーザーを確認し、addとhideに振り分け
    let existingUserIds: string[] = [];
    try {
      const getTopicUserIdsRequest: GetTopicUserIdsByTopicIdsRequest = {
        p_topic_ids: [topicId],
      };
      const getTopicUserIdsResult =
        await this.topicsRepository.getTopicUserIdsByTopicIds(
          getTopicUserIdsRequest,
        );
      existingUserIds = getTopicUserIdsResult[0]?.user_ids ?? [];
    } catch (error) {
      console.error('Error getting topic user ids:', error);
      throw new HttpException(
        'An unexpected error occurred while getting topic user ids.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const addUserIds = userIds.filter(
      (userId) => !existingUserIds.includes(userId),
    );
    const hideUserIds = existingUserIds.filter(
      (userId) => !userIds.includes(userId),
    );

    // ユーザーを追加
    try {
      const addTopicUsersByIdsRequest: AddTopicUsersByIdsRequest = {
        p_topic_id: topicId,
        p_user_ids: addUserIds,
        p_updater_id: updaterId,
      };
      const addTopicUsersByIdsResult =
        await this.topicsRepository.addTopicUsersByIds(
          addTopicUsersByIdsRequest,
        );
    } catch (error) {
      console.error('Error adding topic users:', error);
      throw new HttpException(
        'An unexpected error occurred while adding topic users.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // ユーザーを非表示
    try {
      const hideTopicUsersByIdsRequest: HideTopicUsersByIdsRequest = {
        p_topic_id: topicId,
        p_user_ids: hideUserIds,
        p_updater_id: updaterId,
      };
      const hideTopicUsersByIdsResult =
        await this.topicsRepository.hideTopicUsersByIds(
          hideTopicUsersByIdsRequest,
        );
    } catch (error) {
      console.error('Error hiding topic users:', error);
      throw new HttpException(
        'An unexpected error occurred while hiding topic users.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const response: UpdateTopicUsersByIdsModel = {};
    return response;
  }

  async updateTopicStateById({
    topicId,
    state,
    updaterId,
  }: {
    topicId: string;
    state: string;
    updaterId: string;
  }): Promise<UpdateTopicStateByIdModel> {
    let topicStates: {
      id: string;
      state: string;
      updaterId: string;
    }[];
    try {
      const request: UpdateTopicStateByIdRequest = {
        p_topic_id: topicId,
        p_state: state,
        p_updater_id: updaterId,
      };
      const result = await this.topicsRepository.updateTopicStateById(request);
      topicStates = result.map((ts) => {
        return {
          id: ts.id,
          state: ts.state,
          updaterId: ts.updater_id,
        };
      });
    } catch (error) {
      console.error('Error updating topic state:', error);
      throw new HttpException(
        'An unexpected error occurred while updating topic state.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return topicStates ?? [];
  }

  async updateTopicFrameById({
    topicId,
    frameId,
    updaterId,
  }: {
    topicId: string;
    frameId: string;
    updaterId: string;
  }): Promise<UpdateTopicFrameByIdModel> {
    let topicFrames: {
      id: string;
      frameId: string;
      updaterId: string;
    }[];
    try {
      const request: UpdateTopicFrameByIdRequest = {
        p_topic_id: topicId,
        p_frame_id: frameId,
        p_updater_id: updaterId,
      };
      const result = await this.topicsRepository.updateTopicFrameById(request);
      topicFrames = result.map((topic) => {
        return {
          id: topic.topic_id,
          frameId: topic.frame_id,
          updaterId: topic.updater_id,
        };
      });
    } catch (error) {
      console.error('Error updating topic frame:', error);
      throw new HttpException(
        'An unexpected error occurred while updating topic frame.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return topicFrames ?? [];
  }

  async createTopicsFilteringShortcut({
    projectId,
    name,
    description,
    frameId,
    sort,
    state,
    tagIds,
    creatorId,
  }: {
    projectId: string;
    name: string;
    description: string;
    frameId: string | undefined;
    sort: string | undefined;
    state: string | undefined;
    tagIds: string[];
    creatorId: string;
  }): Promise<CreateTopicsFilteringShortcutModel> {
    let shortcuts: {
      shortcutId: string;
      projectId: string;
      name: string;
      description: string;
      frameId: string;
      sort: string;
      state: string;
      tagIds: string[];
      creatorId: string;
    }[];
    try {
      const request: CreateTopicsFilteringShortcutRequest = {
        p_project_id: projectId,
        p_name: name,
        p_description: description,
        p_frame_id: frameId,
        p_sort: sort,
        p_state: state,
        p_tag_ids: tagIds,
        p_creator_id: creatorId,
      };
      const result =
        await this.topicsRepository.createTopicsFilteringShortcut(request);
      shortcuts = result.map((shortcut) => {
        return {
          shortcutId: shortcut.shortcut_id,
          projectId: shortcut.project_id,
          name: shortcut.name,
          description: shortcut.description,
          frameId: shortcut.frame_id,
          sort: shortcut.sort,
          state: shortcut.state,
          tagIds: shortcut.tag_ids,
          creatorId: shortcut.creator_id,
        };
      });
    } catch (error) {
      console.error('Error creating topics filtering shortcut:', error);
      throw new HttpException(
        'An unexpected error occurred while creating topics filtering shortcut.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return shortcuts ?? [];
  }

  async hideTopicsFilteringShortcutsByIds({
    shortcutIds,
  }: {
    shortcutIds: string[];
  }): Promise<HideTopicsFilteringShortcutsByIdsModel> {
    let hideResult: {
      hiddenId: string;
    }[];
    try {
      const request: HideTopicsFilteringShortcutsByIdsRequest = {
        p_shortcut_ids: shortcutIds,
      };
      const result =
        await this.topicsRepository.hideTopicsFilteringShortcutsByIds(request);
      hideResult = result.map((shortcut) => {
        return {
          hiddenId: shortcut.hidden_id,
        };
      });
    } catch (error) {
      console.error('Error hiding topics filtering shortcuts:', error);
      throw new HttpException(
        'An unexpected error occurred while hiding topics filtering shortcuts.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return hideResult ?? [];
  }

  async updateTopicsFilteringShortcutById({
    id,
    name,
    description,
    frameId,
    sort,
    state,
    tagIds,
  }: {
    id: string;
    name: string;
    description: string;
    frameId: string | undefined;
    sort: string | undefined;
    state: string | undefined;
    tagIds: string[];
  }): Promise<UpdateTopicsFilteringShortcutByIdModel> {
    // tag以外のショートカット情報を更新
    try {
      const updateTopicsFilteringShortcutByIdRequest: UpdateTopicsFilteringShortcutByIdRequest =
        {
          p_shortcut_id: id,
          p_name: name,
          p_description: description,
          p_frame_id: frameId,
          p_sort: sort,
          p_state: state,
        };
      const updateTopicsFilteringShortcutByIdResult =
        await this.topicsRepository.updateTopicsFilteringShortcutById(
          updateTopicsFilteringShortcutByIdRequest,
        );
    } catch (error) {
      console.error('Error updating topics filtering shortcut:', error);
      throw new HttpException(
        'An unexpected error occurred while updating topics filtering shortcut.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // tag情報を取得
    let existingTagIds: string[] = [];
    try {
      const getTopicsFilteringShortcutTagsByIdRequest: GetTopicsFilteringShortcutTagsByIdRequest =
        {
          p_shortcut_id: id,
        };
      const getTopicsFilteringShortcutTagsByIdResult =
        await this.topicsRepository.getTopicsFilteringShortcutTagsById(
          getTopicsFilteringShortcutTagsByIdRequest,
        );
      existingTagIds = getTopicsFilteringShortcutTagsByIdResult.map(
        (tag) => tag.tag_id,
      );
    } catch (error) {
      console.error(
        'Error getting topics filtering shortcut tags by id:',
        error,
      );
      throw new HttpException(
        'An unexpected error occurred while getting topics filtering shortcut tags by id.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 既存のタグを確認し、addとhideに振り分け
    const addTagIds = tagIds.filter((tagId) => !existingTagIds.includes(tagId));
    const hideTagIds = existingTagIds.filter(
      (tagId) => !tagIds.includes(tagId),
    );

    // タグを追加
    try {
      const addTopicsFilteringShortcutTagsByIdRequest: AddTopicsFilteringShortcutTagsByIdRequest =
        {
          p_shortcut_id: id,
          p_tag_ids: addTagIds,
        };
      const addTopicsFilteringShortcutTagsByIdResult =
        await this.topicsRepository.addTopicsFilteringShortcutTagsById(
          addTopicsFilteringShortcutTagsByIdRequest,
        );
    } catch (error) {
      console.error('Error adding topics filtering shortcut tags:', error);
      throw new HttpException(
        'An unexpected error occurred while adding topics filtering shortcut tags.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // タグを非表示
    try {
      const hideTopicsFilteringShortcutTagsByIdsRequest: HideTopicsFilteringShortcutTagsByIdsRequest =
        {
          p_shortcut_id: id,
          p_tag_ids: hideTagIds,
        };
      const hideTopicsFilteringShortcutTagsByIdsResult =
        await this.topicsRepository.hideTopicsFilteringShortcutTagsByIds(
          hideTopicsFilteringShortcutTagsByIdsRequest,
        );
    } catch (error) {
      console.error('Error hiding topics filtering shortcut tags:', error);
      throw new HttpException(
        'An unexpected error occurred while hiding topics filtering shortcut tags.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const response: UpdateTopicsFilteringShortcutByIdModel = {
      shortcutId: id,
      name: name,
      description: description,
      frameId: frameId,
      sort: sort,
      state: state,
      tagIds: tagIds,
    };
    return response;
  }

  async updateTopicProperties({
    topicId,
    properties,
    creatorId,
  }: {
    topicId: string;
    properties: {
      // id: string;
      // type: string;
      // name: string;
      framePropertyId: string;
      content: JSON;
    }[];
    creatorId: string;
  }): Promise<string> {
    try {
      const request: UpdateTopicPropertiesRequest = {
        p_topic_id: topicId,
        p_properties: properties.map((p) => {
          return {
            frame_property_id: p.framePropertyId,
            content: p.content,
          };
        }) as unknown as Json,
        p_creator_id: creatorId,
      };
      const result = await this.topicsRepository.updateTopicProperties(request);
    } catch (error) {
      console.error('Error updating topic properties:', error);
      throw new HttpException(
        'An unexpected error occurred while updating topic properties.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return 'success';
  }

  async createNewTopicFromFormat({
    // ownerId,
    topicId,
    uploaderId,
    projectId,
    metadata,
    userdata,
    tagdata,
    filedata,
    data,
    framedata,
    snapshotdata,
    timelinedata,
    contextdata,
  }: {
    topicId?: string;
    uploaderId: string;
    // ownerId: string,
    projectId: string;
    metadata: {
      size: number;
      topic_id: string;
      file_id: string;
      version: string;
      title: string;
      created_at: string;
      created_by: string;
      reviewer: string[];
      assignee: string[];
      participants: string[];
      status: string;
      latest_snapshot_id: string;
    };
    userdata: {
      id: string;
      name: string;
      email: string;
      description: string;
      accounts: {
        service: string;
        username: string;
        user_id: string;
        profile_url: string;
        metadate: JSON;
      }[];
    }[];
    tagdata: {
      name: string;
      color: string;
      description: string;
    }[];
    filedata: {
      path: string;
      size: number;
      hash: string;
      compression_method: string;
      compression_level: number;
      content: JSON;
    }[];
    data: {
      id: string;
      frame_id: string;
      frame_version: string;
      attributes: {
        attribute_name: string;
        value: JSON;
      }[];
    }[];
    framedata: {
      id: string;
      name: string;
      version: number;
      description: string;
      attribute_definitions: {
        name: string;
        description: string;
        type: {
          name: string;
          description: string;
          base_type: string;
          validator: string;
          serializer: string;
          deserializer: string;
          metadata: JSON;
        };
      }[];
    }[];
    snapshotdata: {
      id: string;
      parent_shapshot_id: string;
      data_id: string;
      new_version: number;
      user_id: string;
      message: string;
      timestamp: string;
      type: string;
    }[];
    timelinedata: {
      id: string;
      user_id: string;
      timestamp: string;
      event_type: number;
      description: string;
      body: JSON;
      metadata: JSON;
    }[];
    contextdata: {
      id: string;
      relation_type: string;
      name: string;
      description: string;
    }[];
  }): Promise<TopicId> {
    // ユーザーIDを取得する
    const userEmails: string[] = [];
    userdata.forEach((user) => {
      if (!userEmails.includes(user.email)) {
        userEmails.push(user.email);
      }
    });
    if (
      !userEmails.includes(
        userdata.find((user) => user.id === metadata.created_by)?.email ?? '',
      )
    ) {
      userEmails.push(
        userdata.find((user) => user.id === metadata.created_by)?.email ?? '',
      );
    }
    let userInfoResults: {
      userName: string;
      userId: string;
      userEmail?: string;
    }[] = [];
    try {
      userInfoResults = await promiseAll(
        userEmails.map((email) => this.ownersService.getUserInfoByEmail(email)),
      );
    } catch (error) {
      console.error('Error fetching user info by email:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching user info by email.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      const authPromises: Promise<AuthResponse>[] = [];
      userdata.forEach((user) => {
        if (
          !userInfoResults.find((result) => {
            if (result) {
              return result.userEmail === user.email;
            } else {
              false;
            }
          }) ||
          userEmails.length === 0
        ) {
          // ユーザーが存在しない場合、ゲストユーザーとして登録
          authPromises.push(
            this.client.auth.signUp({
              email: user.email,
              password: 'password123',
              options: {
                data: {
                  user_name: user.name,
                  email: user.email,
                  avatar_url: '',
                  type: 'guest',
                },
              },
            }),
          );
        }
      });

      const signupResults = await promiseAll(authPromises);
    } catch (error) {
      console.error('Error signing up users:', error);
      throw new HttpException(
        'An unexpected error occurred while signing up users.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      userInfoResults = await Promise.all(
        userEmails.map((email) => this.ownersService.getUserInfoByEmail(email)),
      );
    } catch (error) {
      console.error('Error fetching user info by email:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching user info by email.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const userInfos: {
      id_from_format: string;
      id: string;
      email: string;
      userName: string;
    }[] = [];
    userInfoResults.forEach((result) => {
      if (result) {
        const id_from_format =
          userdata.find((user) => user.email === result.userEmail)?.id ?? '';
        userInfos.push({
          id_from_format: id_from_format,
          id: result.userId ?? null,
          email: result.userEmail ?? '',
          userName: result.userName ?? null,
        });
      }
    });

    //  tagを確認して、なければ作成する
    const tagIds: string[] = [];
    const newTags: {
      name: string;
      color: string;
      description: string;
    }[] = [];
    let projectTags: {
      id: string;
      name: string;
      color: string;
      description: string;
    }[];
    try {
      const tagResults = await this.projectsService.getTagsByProjectId({
        projectId,
      });
      projectTags = tagResults;
    } catch (error) {
      console.error('Error fetching tags by project:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching tags by project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (projectTags) {
      tagdata.forEach((tag) => {
        const tagResult = projectTags?.find((ptag) => ptag.name === tag.name);
        if (tagResult) {
          tagIds.push(tagResult.id);
        } else {
          newTags.push(tag);
        }
      });
    }
    // タグを作成する
    try {
      const newTagResults = await Promise.all(
        newTags.map((tags) =>
          this.projectsService.createNewTag({
            ...tags,
            projectId,
            creatorId: uploaderId,
          }),
        ),
      );
      newTagResults.forEach((result) => {
        if (result) {
          tagIds.push(result.newTagId.split(':')[1]?.trim());
        }
      });
      newTags.forEach((tag, index) => {
        projectTags.push({
          id: newTagResults[index].newTagId ?? '',
          name: tag.name,
          color: tag.color,
          description: tag.description,
        });
      });
    } catch (error) {
      console.error('Error creating new tags:', error);
      throw new HttpException(
        'An unexpected error occurred while creating new tags.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // Frameを確認して、なければ作成する
    let projectFrames: {
      id: string;
      name: string;
      description: string;
      createdBy: {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
      };
      createdAt: string;
      properties: {
        id: string;
        name: string;
        type: string;
        description: string;
        creatorId: string;
        createdAt: string;
      }[];
      templates: {
        id: string;
        name: string;
        contentJson: Json;
        creatorId: string;
        createdAt: string;
      }[];
    }[];
    try {
      projectFrames = await this.framesService.getFramesByProjectId({
        projectId: projectId,
      });
    } catch (error) {
      console.error('Error fetching frames by project:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching frames by project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const frameIds: string[] = [];
    const newFrames: {
      id: string;
      name: string;
      version: number;
      description: string;
      attribute_definitions: {
        name: string;
        description: string;
        type: {
          name: string;
          description: string;
          base_type: string;
          validator: string;
          serializer: string;
          deserializer: string;
          metadata: JSON;
        };
      }[];
    }[] = [];
    framedata.forEach((frame) => {
      const existingFrame = projectFrames.find(
        (projectFrame) => projectFrame.id === frame.id,
      );
      if (existingFrame) {
        frameIds.push(existingFrame.id);
      } else {
        newFrames.push(frame);
      }
    });
    const convertType = (type: string) => {
      switch (type) {
        case 'stringType':
          return 'text';
        case 'intType':
          return 'number';
        case 'booleanType':
          return 'boolean';
        case 'dateType':
          return 'date';
        case 'mapType':
          return 'map';
        case 'listType':
          return 'list';
        default:
          return 'text';
      }
    };
    const newFrameRequests: {
      id?: string;
      name: string;
      description: string | null;
      icon: string | null;
      projectId: string;
      creatorId: string;
      properties: {
        name: string;
        type: string;
      }[];
    }[] = newFrames.map((frame) => {
      return {
        id: frame.id,
        creatorId: uploaderId,
        projectId: projectId,
        name: frame.name,
        icon: null,
        description: frame.description,
        properties: frame.attribute_definitions
          .filter((a) => a.name !== '__document')
          .map((a) => {
            return {
              name: a.name,
              type: convertType(a.type.name),
            };
          }),
      };
    });

    try {
      const newFrameResults = await promiseAll(
        newFrameRequests.map((request) =>
          this.framesService.createNewFrame(request),
        ),
      );
    } catch (error) {
      console.error('Error creating new frames:', error);
      throw new HttpException(
        'An unexpected error occurred while creating new frames.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // Frameを取得する
    try {
      projectFrames = await this.framesService.getFramesByProjectId({
        projectId: projectId,
      });
    } catch (error) {
      console.error('Error fetching frames by project:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching frames by project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 最新のデータを取得する TODO: version管理できるようになったら、全てのバージョンを取得するように修正する
    const latestdata = data.find(
      (data) =>
        data.id ===
        snapshotdata.find(
          (snapshot) => snapshot.id === metadata.latest_snapshot_id,
        )?.data_id,
    );
    const document = latestdata?.attributes.find(
      (a) => a.attribute_name === '__document',
    )?.value;

    // 既存のトピックを取得する
    try {
      const existingTopics = await this.getTopicsByProject({
        projectId: projectId,
      });
      if (existingTopics.find((topic) => topic.id === topicId)) {
        throw new HttpException(
          'Topic already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error('Error fetching topics by project:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topics by project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 初期docを作成する
    const ydoc = new Y.Doc();
    const encodedContent = Y.encodeStateAsUpdate(ydoc);
    const hexContent = Uint8ArrayToHex(encodedContent);

    const participantIds = metadata.participants.map(
      (participantId) =>
        userInfos.find((userInfo) => userInfo.id_from_format === participantId)
          ?.id ?? '',
    );

    const reviewerId = metadata.reviewer.map(
      (reviewerId) =>
        userInfos.find((userInfo) => userInfo.id_from_format === reviewerId)
          ?.id ?? '',
    )[0];

    const assigneeId = metadata.assignee.map(
      (assigneeId) =>
        userInfos.find((userInfo) => userInfo.id_from_format === assigneeId)
          ?.id ?? '',
    )[0];
    console.log('assigneeId', assigneeId);

    //  topicを作成する
    const request: CreateNewTopicRequest = {
      p_topic_id: topicId,
      p_user_id:
        userInfos.find(
          (userInfo) => userInfo.id_from_format === metadata.created_by,
        )?.id ?? '',
      p_title: metadata.title,
      p_state: metadata.status,
      p_frame_id: latestdata?.frame_id ?? '',
      p_project_id: projectId,
      p_created_at: metadata.created_at,
      p_participant_ids: participantIds,
      p_reviewer_id: reviewerId ?? null, // TODO: reviewrを複数登録できるように修正する
      p_assignee_id: assigneeId ?? null, // TODO: assigneeを複数登録できるように修正する
      p_tag_ids: tagIds,
      p_priority: 'Medium', // TODO: ここを修正する
      p_is_subscribe: true, // TODO: ここを修正する
      p_config: { setting1: 'value1', setting2: 'value2' },
      p_initial_content:
        (document as unknown as Json) ?? ('{}' as unknown as Json),
      p_initial_content_hex: hexContent,
    };
    console.log('request', request);

    let newTopicId: string;
    try {
      newTopicId = await this.topicsRepository.createNewTopic(request);
    } catch (error) {
      console.error('Error creating new topic:', error);
      throw new HttpException(
        'An unexpected error occurred while creating new topic.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    console.log('topicId', newTopicId);

    // topic detail を取得する
    let topicDetail: TopicDetail;
    try {
      const topicDetails = await this.getTopicDetailsByIds({
        topicIds: [newTopicId ?? ''],
      });
      topicDetail = topicDetails[0];
    } catch (error) {
      console.error('Error fetching topic details by id:', error);
      throw new HttpException(
        'An unexpected error occurred while fetching topic details by id.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    console.log('topicDetail', topicDetail);

    // propertyを作成する
    if (latestdata?.attributes) {
      const properties = latestdata.attributes;
      try {
        const propertyResult = await this.updateTopicProperties({
          topicId: newTopicId,
          properties: properties
            .filter((property) => property.attribute_name !== '__document')
            .map((property) => {
              return {
                content: property.value as JSON,
                framePropertyId:
                  projectFrames
                    .find((frame) => frame.id === topicDetail.frame?.id)
                    ?.properties.find(
                      (propertyDefinition) =>
                        propertyDefinition.name === property.attribute_name,
                    )?.id ?? '',
              };
            }),
          creatorId: uploaderId,
        });
      } catch (error) {
        console.error('Error updating topic properties:', error);
        throw new HttpException(
          'An unexpected error occurred while updating topic properties.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // timelineを作成する
    if (timelinedata) {
      const replies = timelinedata.filter((activity) => {
        if (activity.event_type === 4) {
          const body = activity.body as unknown as {
            message_id: string;
            root_event_id?: string;
            content: Json;
            action: string;
          };
          return body.root_event_id === undefined;
        }
      });
      const dataWithoutRep = timelinedata.filter((activity) => {
        if (activity.event_type === 4) {
          const body = activity.body as unknown as {
            message_id: string;
            root_event_id?: string;
            content: Json;
            action: string;
          };
          return body.root_event_id !== undefined;
        } else {
          return true;
        }
      });
      const data = dataWithoutRep.map((activity) => {
        if (activity.event_type === 4) {
          const body = activity.body as unknown as {
            message_id: string;
            content: Json;
            action: string;
          };
          return {
            ...activity,
            body: {
              ...body,
              replies: replies.filter((reply) => {
                const replyBody = reply.body as unknown as {
                  message_id: string;
                  root_event_id?: string;
                  content: Json;
                  action: string;
                };
                return replyBody.root_event_id === body.message_id;
              }),
            },
          };
        } else {
          return activity;
        }
      });

      const timelineRequest: CreateTopicTimelineRequest = {
        p_activities: data.map((activity) => {
          let content = {} as Json;
          switch (activity.event_type) {
            case 1: {
              console.log('activity', activity);
              const body = activity.body as unknown as {
                new_title: string;
                old_title: string;
              };
              content = {
                key: 'title',
                title: body.new_title,
                pastTitle: body.old_title,
              };
              break;
            }
            case 2: {
              const body = activity.body as unknown as {
                new_state: string;
                old_state: string;
              };
              content = {
                key: 'state',
                state: body.new_state,
                pastState: body.old_state,
              };
              break;
            }
            case 3: {
              const body = activity.body as unknown as {
                new_tags: {
                  name: string;
                  color: string;
                  description: string;
                }[];
                old_tags: {
                  name: string;
                  color: string;
                  description: string;
                }[];
              };

              const newTags = projectTags
                .filter((tag) => body.new_tags.some((t) => t.name === tag.name))
                .reduce<
                  Record<string, { id: string; name: string; color: string }>
                >((acc, tag) => {
                  acc[tag.id] = {
                    id: tag.id,
                    name: tag.name,
                    color: tag.color,
                  };
                  return acc;
                }, {});

              const oldTags = projectTags
                .filter((tag) => body.old_tags.some((t) => t.name === tag.name))
                .reduce<
                  Record<string, { id: string; name: string; color: string }>
                >((acc, tag) => {
                  acc[tag.id] = {
                    id: tag.id,
                    name: tag.name,
                    color: tag.color,
                  };
                  return acc;
                }, {});

              content = {
                key: 'tag',
                tags: newTags,
                pastTags: oldTags,
              };
              break;
            }
            case 4: {
              const body = activity.body as unknown as {
                message_id: string;
                root_event_id?: string;
                content: Json;
                replies: {
                  id: string;
                  user_id: string;
                  timestamp: string;
                  event_type: number;
                  description: string;
                  body: JSON;
                  metadata: JSON;
                }[];
                action: string;
              };
              content = {
                comment: body.content,
                replies: body.replies.map((reply) => {
                  return {
                    user_id: reply.user_id,
                    comment: (
                      reply.body as unknown as {
                        message_id: string;
                        root_event_id: string;
                        content: Json;
                        action: string;
                      }
                    ).content,
                    timestamp: reply.timestamp,
                  };
                }),
              };
              break;
            }
            case 5: {
              // TODO: snapshot eventを定義する
              break;
            }
            case 6: {
              const body = activity.body as unknown as {
                new_frame_name: string;
                old_frame_name: string;
              };
              content = {
                key: 'frame', // TODO: ここを修正する
                frame: body.new_frame_name,
                pastFrame: body.old_frame_name,
              };
              break;
            }
            case 7: {
              // TODO: reaction eventを定義する
              break;
            }
            case 8: {
              //TODO: 型の確認
              const body = activity.body as unknown as {
                new_contexts: {
                  topic_id: string;
                  name: string;
                  description: string;
                  relation_type: string;
                }[];
                old_contexts: {
                  topic_id: string;
                  name: string;
                  description: string;
                  relation_type: string;
                }[];
              };
              content = {
                key: 'contexts',
                contexts: body.new_contexts,
                pastContexts: body.old_contexts,
              };
              break;
            }
          }

          return {
            topicId: newTopicId,
            postedBy:
              userInfos.find((userInfo) => {
                return userInfo.id_from_format === activity.user_id;
              })?.id ?? '',
            content:
              activity.event_type === 4
                ? (content as unknown as { comment: Json; replies: Json[] })
                    .comment
                : content,
            createdAt: activity.timestamp,
            type: activity.event_type === 4 ? 'comment' : 'action log',
            reply:
              activity.event_type === 4
                ? (
                    content as unknown as {
                      comment: Json;
                      replies: {
                        user_id: string;
                        comment: Json;
                        timestamp: string;
                      }[];
                    }
                  ).replies.map((reply) => {
                    return {
                      postedBy:
                        userInfos.find(
                          (userInfo) =>
                            userInfo.id_from_format === reply.user_id,
                        )?.id ?? '', // TODO: ここを修正する
                      comment: reply.comment,
                      createdAt: reply.timestamp,
                    };
                  })
                : [],
          };
        }) as unknown as Json,
      };
      console.log('timelineRequest', JSON.stringify(timelineRequest));
      try {
        const timelineResult =
          await this.topicsRepository.createTopicTimeline(timelineRequest);
      } catch (error) {
        console.error('Error creating topic timeline:', error);
        throw new HttpException(
          'An unexpected error occurred while creating topic timeline.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // context を作成する
    if (contextdata) {
      try {
        const contextResult = await this.updateTopicContexts({
          topicId: newTopicId,
          contexts: contextdata.map((context) => {
            return {
              contextId: uuidv4(),
              name: context.name,
              description: context.description,
              type: context.relation_type,
              opponentTopicId: context.id,
              updaterId: uploaderId,
            };
          }),
        });
      } catch (error) {
        console.error('Error creating context:', error);
        throw new HttpException(
          'An unexpected error occurred while creating context.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    console.log('create topic from format success');
    console.log('topic id', newTopicId);

    return {
      topicId: newTopicId,
    };
  }
}
