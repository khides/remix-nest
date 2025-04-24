import { SupabaseServerClient } from "~/supabase/supabase.server";
import { v4 as uuidv4 } from "uuid";
import type {
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
} from "~/supabase/__generated__/supabase.interface.d.ts";
import { TopicsRepository } from "~/supabase/Topics/topics.repository";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// プラグインを拡張
dayjs.extend(utc);
import {
  searchTopicsByProjectModel,
  TopicOutline,
  GetTopicsFilteringShortcutsByProjectIdModel,
  GetTopicTagIdsByIdsModel,
  TopicContext,
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
} from "~/supabase/Topics/topics.model";
import { TopicProperty } from "~/components/templates/Topic";
import * as Y from "yjs";
import { Uint8ArrayToHex } from "~/helpers/binary";
import { Json } from "~/supabase/__generated__/schema";
import { AuthRepository } from "~/supabase/Auth/auth.repository";
import { ProjectRepository } from "~/supabase/Project/project.repository";
import { UserService } from "~/supabase/User/user.service";
import { FrameService } from "~/supabase/Frame/frame.service";
import { GetFrameDetailsByIdsModel } from "~/supabase/Frame/frame.model";
import { ProjectService } from "~/supabase/Project/project.service";
import { AuthResponse } from "@supabase/supabase-js";

export class TopicsService {
  constructor(supabase: SupabaseServerClient) {
    this.repository = new TopicsRepository(supabase);
    this.authRepository = new AuthRepository(supabase);
    this.projectRepository = new ProjectRepository(supabase);
    this.userService = new UserService(supabase);
    this.frameService = new FrameService(supabase);
    this.projectService = new ProjectService(supabase);
    this.supabase = supabase;
  }
  private supabase: SupabaseServerClient;
  private repository: TopicsRepository;
  private authRepository: AuthRepository;
  private projectRepository: ProjectRepository;
  private userService: UserService;
  private frameService: FrameService;
  private projectService: ProjectService;

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
    response?: TopicId;
    error?: string;
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

    const userInfoReqests: GetUserInfoByEmailRequest[] = userEmails.map(
      (userEmail) => {
        return {
          p_email: userEmail,
        };
      }
    );
    const userInfoResults = await Promise.all(
      userInfoReqests.map((request) =>
        this.authRepository.getUserInfoByEmail(request)
      )
    );

    const userInfos: {
      id: string;
      email: string;
      userName: string;
    }[] = [];
    userInfoResults.forEach((results) => {
      if (results.response && results.response.length > 0) {
        userInfos.push({
          id: results.response[0].user_id ?? null,
          email: results.response[0].user_email ?? null,
          userName: results.response[0].user_name ?? null,
        });
      }
    });

    //  tagを確認して、なければ作成する
    const tagIds: string[] = [];
    const newTags: {
      name: string;
      color: string;
    }[] = [];
    const tagRequest: GetTagsByProjectIdRequest = {
      p_project_id: projectId,
    };
    const tagResults = await this.projectRepository.getTagsByProjectId(
      tagRequest
    );
    if (tagResults.response) {
      tags.forEach((tag) => {
        const tagResult = tagResults.response?.find(
          (tagResult) => tagResult.name === tag.name
        );
        if (tagResult) {
          tagIds.push(tagResult.id);
        } else {
          newTags.push(tag);
        }
      });
    } else {
      console.error("Error fetching tags by project:", tagResults.error);
      return { error: tagResults.error ?? "unknown error" };
    }
    const newTagRequests = newTags.map((tag) => {
      return {
        p_project_id: projectId,
        p_name: tag.name,
        p_color: tag.color,
        p_creator_id: createdBy.id,
        p_description: "",
      };
    });
    const newTagResults = await Promise.all(
      newTagRequests.map((request) =>
        this.projectRepository.createNewTag(request)
      )
    );
    newTagResults.forEach((result) => {
      if (result.response) {
        // TODO: responseの形式を確認する
        tagIds.push(result.response.split(":")[1]?.trim());
      } else {
        console.error("Error creating new tag:", result.error);
        return { error: result.error ?? "unknown error" };
      }
    });

    // 初期docを作成する
    const ydoc = new Y.Doc();
    const encodedContent = Y.encodeStateAsUpdate(ydoc);
    const hexContent = Uint8ArrayToHex(encodedContent);

    //  topicを作成する
    const request: CreateNewTopicRequest = {
      p_topic_id: topicId,
      p_suggestion_id: suggestionId,
      p_user_id:
        createdBy.id !== "" && createdBy.id
          ? createdBy.id
          : userInfos.find((userInfo) => userInfo.email === createdBy.email)
              ?.id ?? "c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7",
      p_title: title,
      p_state: state,
      p_frame_id: frameId,
      p_project_id: projectId,
      p_created_at: new Date(createdAt * 1000).toISOString(),
      p_participant_ids: [
        ...participants.map((participant) =>
          participant.id !== "" && participant.id
            ? participant.id
            : userInfos.find((userInfo) => userInfo.email === participant.email)
                ?.id ?? "c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7"
        ),
        "12345678-aaaa-bbbb-cccc-000000000000",
      ],
      p_reviewer_id:
        reviewer.id !== "" && reviewer.id
          ? reviewer.id
          : userInfos.find((userInfo) => userInfo.email === reviewer.email)
              ?.id ?? "c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7",
      p_assignee_id:
        assignee.id !== "" && assignee.id
          ? assignee.id
          : userInfos.find((userInfo) => userInfo.email === assignee.email)
              ?.id ?? "c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7",
      p_tag_ids: tagIds,
      p_priority: "Medium", // TODO: ここを修正する
      p_is_subscribe: true, // TODO: ここを修正する
      p_config: { setting1: "value1", setting2: "value2" },
      p_template_id: templateId,
      p_initial_content: document as unknown as Json,
      p_initial_content_hex: hexContent,
    };

    const result = await this.repository.createNewTopic(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error creating topics by project:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const new_topicId = result.response;
    console.log("topicId", new_topicId);

    // propertyを作成する
    if (properties) {
      const propertyRequests: UpdateTopicPropertiesRequest = {
        p_topic_id: new_topicId,
        p_properties: properties.map((property) => {
          return {
            property_id: property.id,
            content: property.content,
          };
        }),
        p_creator_id:
          userInfos.find((userInfo) => userInfo.email === createdBy.email)
            ?.id ?? "c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7", // TODO: ここを修正する
      };
      const propertyResult = await this.repository.updateTopicProperties(
        propertyRequests
      );
      if (propertyResult.error) {
        // エラーハンドリングなどの追加ロジックをここに記述可能
        console.error(
          "Error updating properties by topic:",
          propertyResult.error
        );
        return { error: propertyResult.error ?? "unknown error" };
      }
    }

    // timelineを作成する
    if (timeline) {
      const timelineRequest: CreateTopicTimelineRequest = {
        p_activities: timeline.activities.map((activity) => {
          return {
            topicId: topicId,
            postedBy:
              userInfos.find(
                (userInfo) => userInfo.email === activity.postedBy.email
              )?.id ?? "c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7", // TODO: ここを修正する
            content: activity.content,
            createdAt: new Date(activity.createdAt * 1000).toISOString(),
            type: activity.type,
            reply: activity.replies.map((reply) => {
              return {
                postedBy:
                  userInfos.find(
                    (userInfo) => userInfo.email === reply.postedBy.email
                  )?.id ?? "c5e56a8a-1ddb-45ef-9a26-49477c7ba1f7", // TODO: ここを修正する
                comment: reply.content,
                createdAt: new Date(reply.createdAt * 1000).toISOString(),
              };
            }),
          };
        }) as unknown as Json,
      };

      const timelineResult = await this.repository.createTopicTimeline(
        timelineRequest
      );
      if (timelineResult.error) {
        // エラーハンドリングなどの追加ロジックをここに記述可能
        console.error(
          "Error creating timeline by topic:",
          timelineResult.error
        );
        return { error: timelineResult.error ?? "unknown error" };
      }
    }

    return {
      response: {
        topicId: new_topicId,
      },
    };
  }

  /** プロジェクトIDでトピックを取得するメソッド
   * @param projectId プロジェクトID
   * @returns トピックの概要
   */
  async getTopicsByProject({ projectId }: { projectId: string }): Promise<{
    response?: TopicOutline[];
    error?: string;
  }> {
    const request: GetTopicsByProjectIdRequest = {
      p_project_id: projectId,
    };
    const result = await this.repository.getTopicsByProject(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching topics by project:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: TopicOutline[] = result.response.map((topic) => {
      return {
        id: topic.id,
        number: topic.number,
        name: topic.name,
      };
    });
    return {
      response: response,
    };
  }

  async getTopicDetailsByIds({ topicIds }: { topicIds: string[] }): Promise<{
    response?: {
      id: string;
      title: string;
      topicNum: number;
      state: string;
      createdBy: string;
      createdAt: string;
      frame?: {
        id: string;
        name: string;
        description: string;
        createdBy: {
          id: string;
          email: string;
          name: string;
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
      };
      tags: {
        id: string;
        name: string;
        color: string;
      }[];
      participants: {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
      }[];
      activities: {
        id: string;
        icon: string;
        postedBy: string;
        postedAt: string;
        contentJson: Json;
        type: string;
        suggestionId: string | null;
        replies: {
          id: string;
          parentId: string;
          icon: string;
          postedBy: string;
          postedAt: string;
          contentJson: Json;
        }[];
      }[];
      contexts: {
        id: string;
        name: string;
        description: string;
        type: string;
        topicId: string;
        topicNum: number;
        topicName: string;
        suggestionId?: string;
      }[];
      properties: {
        id: string;
        name: string;
        type: string;
        content: string;
        creatorId: string;
        createdAt: string;
        framePropertyId: string;
      }[];
      documnets: {
        id: string;
        contentJson: Json;
        contentHex: string;
        version: number;
      }[];
    }[];
    error?: string;
  }> {
    const request: GetTopicDetailsByIdsRequest = {
      p_topic_ids: topicIds,
    };
    const result = await this.repository.getTopicDetailsByIds(request);
    if (!result.response && result.error) {
      console.error("Error get topic details:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    const details = result.response;
    const promises = [
      this.getTagsByIds({
        tagIds: details?.map((topic) => topic.tag_ids).flat() ?? [],
      }),
      this.userService.getUserInfosByIds({
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
      this.frameService.getFrameDetailsByIds({
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
    if (!tagsResult.response && tagsResult.error) {
      console.error("Error get tags:", tagsResult.error);
      return { error: tagsResult.error ?? "An unexpected error occurred." };
    }
    const tags = tagsResult.response as {
      id: string;
      name: string;
      color: string;
    }[];
    if (!participantsResult.response && participantsResult.error) {
      console.error("Error get participants:", participantsResult.error);
      return {
        error: participantsResult.error ?? "An unexpected error occurred.",
      };
    }
    const participants = participantsResult.response as {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    }[];
    if (!activitiesResult.response && activitiesResult.error) {
      console.error("Error get activities:", activitiesResult.error);
      return {
        error: activitiesResult.error ?? "An unexpected error occurred.",
      };
    }
    const activities = activitiesResult.response as {
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
    if (!contextsResult.response && contextsResult.error) {
      console.error("Error get contexts:", contextsResult.error);
      return { error: contextsResult.error ?? "An unexpected error occurred." };
    }
    const contexts = contextsResult.response as {
      id: string;
      name: string;
      description: string;
      type: string;
      topicId: string;
      topicNum: number;
      topicName: string;
      suggestionId: string;
    }[];
    if (!propertiesResult.response && propertiesResult.error) {
      console.error("Error get properties:", propertiesResult.error);
      return {
        error: propertiesResult.error ?? "An unexpected error occurred.",
      };
    }
    const properties = propertiesResult.response as {
      id: string;
      name: string;
      type: string;
      content: string;
      creatorId: string;
      createdAt: string;
      framePropertyId: string;
    }[];
    if (!documentsResult.response && documentsResult.error) {
      console.error("Error get documents:", documentsResult.error);
      return {
        error: documentsResult.error ?? "An unexpected error occurred.",
      };
    }
    const documents = documentsResult.response as {
      id: string;
      contentJson: Json;
      contentHex: string;
      version: number;
    }[];
    if (!framesResult.response && framesResult.error) {
      console.error("Error get frames:", framesResult.error);
      return { error: framesResult.error ?? "An unexpected error occurred." };
    }
    const frames = framesResult.response as GetFrameDetailsByIdsModel;

    const response = result.response?.map((topic) => {
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
            topic.participant_ids.includes(participant.id)
          ) ?? [],
        activities:
          activities.filter((activity) =>
            topic.activity_ids.includes(activity.id)
          ) ?? [],
        contexts:
          contexts.filter((context) =>
            topic.context_ids.includes(context.id)
          ) ?? [],
        properties:
          properties.filter((property) =>
            topic.property_ids.includes(property.id)
          ) ?? [],
        documnets:
          documents.filter((document) =>
            topic.document_ids.includes(document.id)
          ) ?? [],
      };
    });

    return {
      response: response,
    };
  }

  async getTagsByIds({ tagIds }: { tagIds: string[] }): Promise<{
    response?: {
      id: string;
      name: string;
      color: string;
    }[];
    error?: string;
  }> {
    const request: GetTagsByIdsRequest = {
      p_tag_ids: tagIds,
    };
    const result = await this.repository.getTagsByIds(request);
    if (!result.response && result.error) {
      console.error("Error get tag details:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    const response = result.response?.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
        color: tag.color,
      };
    });
    return {
      response: response,
    };
  }

  async getTopicActivitiesByIds({
    activityIds,
  }: {
    activityIds: string[];
  }): Promise<{
    response?: {
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
    error?: string;
  }> {
    const request: GetTopicActivitiesByIdsRequest = {
      p_activity_ids: activityIds,
    };
    const result = await this.repository.getTopicActivitiesByIds(request);
    if (!result.response && result.error) {
      console.error("Error get topic activities:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    const actiities = result.response?.map((activity) => {
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
    const replyIds = actiities?.map((activity) => activity.replyIds).flat();
    const repliesResult = await this.getTopicRepliesByIds({
      replyIds: replyIds ?? [],
    });
    if (!repliesResult.response && repliesResult.error) {
      console.error("Error get topic replies:", repliesResult.error);
      return { error: repliesResult.error ?? "An unexpected error occurred." };
    }
    const replies = repliesResult.response;
    const response = actiities?.map((activity) => {
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
    return {
      response: response,
    };
  }

  async getTopicRepliesByIds({ replyIds }: { replyIds: string[] }): Promise<{
    response?: {
      id: string;
      parentId: string;
      icon: string;
      postedBy: string;
      postedAt: string;
      contentJson: Json;
    }[];
    error?: string;
  }> {
    const request: GetTopicRepliesByIdsRequest = {
      p_reply_ids: replyIds,
    };
    const result = await this.repository.getTopicRepliesByIds(request);
    if (!result.response && result.error) {
      console.error("Error get topic replies:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    const response = result.response?.map((reply) => {
      return {
        id: reply.id,
        parentId: reply.parent_id,
        icon: reply.icon,
        postedBy: reply.postedby,
        postedAt: reply.postedat,
        contentJson: reply.content_json,
      };
    });
    return {
      response: response,
    };
  }

  async getTopicContextsByIds({
    contextIds,
  }: {
    contextIds: string[];
  }): Promise<{
    response?: {
      id: string;
      name: string;
      description: string;
      type: string;
      topicId: string;
      topicNum: number;
      topicName: string;
      suggestionId?: string;
    }[];
    error?: string;
  }> {
    const request: GetTopicContextsByIdsRequest = {
      p_context_ids: contextIds,
    };
    const result = await this.repository.getTopicContextsByIds(request);
    if (!result.response && result.error) {
      console.error("Error get topic contexts:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    const response = result.response?.map((context) => {
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
    return {
      response: response,
    };
  }

  async getTopicPropertiesByIds({
    propertyIds,
  }: {
    propertyIds: string[];
  }): Promise<{
    response?: {
      id: string;
      name: string;
      type: string;
      content: string;
      creatorId: string;
      createdAt: string;
      framePropertyId: string;
    }[];
    error?: string;
  }> {
    const request: GetTopicPropertiesByIdsRequest = {
      p_property_ids: propertyIds,
    };
    const result = await this.repository.getTopicPropertiesByIds(request);
    if (!result.response && result.error) {
      console.error("Error get topic properties:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    const response = result.response?.map((property) => {
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
    return {
      response: response,
    };
  }

  async getTopicDocumentsByIds({
    documentIds,
  }: {
    documentIds: string[];
  }): Promise<{
    response?: {
      id: string;
      contentJson: Json;
      contentHex: string;
      version: number;
    }[];
    error?: string;
  }> {
    const request: GetTopicDocumentsByIdsRequest = {
      p_document_ids: documentIds,
    };
    const result = await this.repository.getTopicDocumentsByIds(request);
    if (!result.response && result.error) {
      console.error("Error get topic documnets:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    const response = result.response?.map((document) => {
      return {
        id: document.id,
        contentJson: document.content_json,
        contentHex: document.content_hex,
        version: document.version,
      };
    });
    return {
      response: response,
    };
  }
  async getUpdatedTopicsByProject({
    projectId,
  }: {
    projectId: string;
  }): Promise<{
    response?: {
      topic_id: string;
      topic_num: number;
      title: string;
    }[];
    error?: string;
  }> {
    const request: GetUpdatedTopicsByProjectRequest = {
      p_project_id: projectId,
    };
    const result = await this.repository.getUpdatedTopicsByProject(request);
    if (!result.response && result.error) {
      console.error("Error get topic updated:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    const response = result.response?.map((topic) => {
      return {
        topic_id: topic.topic_id,
        topic_num: topic.topic_num,
        title: topic.title,
      };
    });
    return {
      response: response,
    };
  }

  /**
   * プロジェクトIDでトピックを検索するメソッド
   * @param projectId プロジェクトID
   * @param userId ユーザーID
   * @param status ステータス
   * @param frameId カテゴリID
   * @param tags タグ
   * @param search 検索文字列
   * @param isFrameConflict カテゴリの競合
   * @param sort ソート
   * @param page ページ
   * @param pageSize ページサイズ
   * @returns トピックの詳細
   */
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
  }): Promise<{
    response?: searchTopicsByProjectModel[];
    error?: string;
  }> {
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
    const result = await this.repository.searchTopicsByProject(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error searching topics by project:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const details = result.response;

    const frameIds = details?.map((topic) => topic.frame_id).flat();
    const tagIds = details?.map((topic) => topic.tag_ids).flat();
    const participantIds = details
      ?.map((topic) => topic.participant_ids)
      .flat();
    const propertyIds = details?.map((topic) => topic.property_ids).flat();

    const promises = [
      this.frameService.getFrameDetailsByIds({ frameIds: frameIds }),
      this.getTagsByIds({ tagIds: tagIds }),
      this.userService.getUserInfosByIds({ userIds: participantIds }),
      this.getTopicPropertiesByIds({ propertyIds: propertyIds }),
    ];
    const [framesResult, tagsResult, participantsResult, propertiesResult] =
      await Promise.all(promises);
    if (!framesResult.response && framesResult.error) {
      console.error("Error get frames:", framesResult.error);
      return { error: framesResult.error ?? "An unexpected error occurred." };
    }
    const frames = framesResult.response as GetFrameDetailsByIdsModel;
    if (!tagsResult.response && tagsResult.error) {
      console.error("Error get tags:", tagsResult.error);
      return { error: tagsResult.error ?? "An unexpected error occurred." };
    }

    const tagDetails = tagsResult.response as {
      id: string;
      name: string;
      color: string;
    }[];
    if (!participantsResult.response && participantsResult.error) {
      console.error("Error get participants:", participantsResult.error);
      return {
        error: participantsResult.error ?? "An unexpected error occurred.",
      };
    }
    const participants = participantsResult.response as {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    }[];
    if (!propertiesResult.response && propertiesResult.error) {
      console.error("Error get properties:", propertiesResult.error);
      return {
        error: propertiesResult.error ?? "An unexpected error occurred.",
      };
    }
    const properties = propertiesResult.response as {
      id: string;
      name: string;
      type: string;
      content: string;
      creatorId: string;
      createdAt: string;
      framePropertyId: string;
    }[];
    const response: searchTopicsByProjectModel[] = details?.map((topic) => {
      return {
        topicId: topic.topic_id,
        title: topic.title,
        topicNum: topic.topic_num as unknown as number,
        state: topic.state,
        commentNum: topic.comment_num as unknown as number,
        createdBy: topic.created_by,
        createdAt: topic.created_at,
        frameId: topic.frame_id,
        frameName:
          frames?.find((frame) => frame.id === topic.frame_id)?.name ?? "",
        frameDescription:
          frames?.find((frame) => frame.id === topic.frame_id)?.description ??
          "",
        frameIcon: "", // TODO: fix this
        tags: tagDetails.filter((tag) => topic.tag_ids.includes(tag.id)),
        participants: participants.filter((participant) =>
          topic.participant_ids.includes(participant.id)
        ),
        properties: properties.filter((property) =>
          topic.property_ids.includes(property.id)
        ),
        isConflicting: topic.is_conflicting,
        suggestionId: topic.suggestion_id ?? undefined,
      };
    });

    return {
      response: response,
    };
  }

  /** プロジェクトIDでフィルタリングショートカットを取得するメソッド
   * @param projectId プロジェクトID
   * @returns トピックのフィルタリングショートカット
   */
  async getTopicsFilteringShortcutsByProjectId({
    projectId,
  }: {
    projectId: string;
  }): Promise<{
    response?: GetTopicsFilteringShortcutsByProjectIdModel;
    error?: string;
  }> {
    const getFilteringShortcutsByProjectIdRequest: GetTopicsFilteringShortcutsByProjectIdRequest =
      {
        p_project_id: projectId,
      };
    const {
      response: getFilteringShortcutsByProjectIdResponse,
      error: getFilteringShortcutsByProjectIdError,
    } = await this.repository.getFilteringShortcutsByProjectId(
      getFilteringShortcutsByProjectIdRequest
    );
    if (
      !getFilteringShortcutsByProjectIdResponse ||
      getFilteringShortcutsByProjectIdError
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error fetching filtering shortcuts by project:",
        getFilteringShortcutsByProjectIdError
      );
      return {
        error: getFilteringShortcutsByProjectIdError ?? "unknown error",
      };
    }

    // 追加のビジネスロジックをここに記述可能
    const response: GetTopicsFilteringShortcutsByProjectIdModel =
      getFilteringShortcutsByProjectIdResponse.map((shortcut) => {
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
    return {
      response: response,
    };
  }

  /** トピックコンテキストを取得するメソッド
   * @param topicId トピックID
   * @returns トピックコンテキスト
   */
  async getTopicContextById({
    topicContextId,
  }: {
    topicContextId: string;
  }): Promise<{
    data?: TopicContext;
    error?: string;
  }> {
    const request: GetTopicContextByIdRequest = {
      p_topic_context_id: topicContextId,
    };
    const result = await this.repository.getTopicContextById(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching topic context by id:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response = result.response;
    const data: TopicContext = {
      topicContextId: response[0].topic_context_id,
      name: response[0].name,
      description: response[0].description,
      type: response[0].type,
      topicId: response[0].topic_id,
      topicName: response[0].topic_name,
      topicNum: response[0].topic_num,
    };
    return {
      data: data,
    };
  }

  /** トピックコンテキストを取得するメソッド
   * @param topicId トピックID
   * @returns トピックコンテキスト
   */
  async getTopicContextsByTopicId({ topicId }: { topicId: string }): Promise<{
    data?: TopicContext[];
    error?: string;
  }> {
    const request: GetTopicContextsByTopicIdRequest = {
      p_topic_id: topicId,
    };
    const result = await this.repository.getTopicContextsByTopicId(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching topic contexts by topic id:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: TopicContext[] = result.response.map((context) => {
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
    return {
      data: data,
    };
  }

  /** トピックコンテキストを作成するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
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
  }): Promise<{
    data?: NewTopicContextId;
    error?: string;
  }> {
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
    const result = await this.repository.createNewTopicContext(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error creating new topic context:", result.error);
      return { error: result.error ?? "unknown error" };
    }

    // 追加のビジネスロジックをここに記述可能
    const data: NewTopicContextId = {
      topicContextId: result.response,
    };
    return {
      data: data,
    };
  }

  /** トピックコンテキストを更新するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
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
  }): Promise<{
    data?: UpdateTopicContext;
    error?: string;
  }> {
    const request: UpdateTopicContextByIdRequest = {
      p_topic_context_id: topicContextId,
      p_name: name,
      p_description: description,
      p_type: type,
      p_updater_id: updaterId,
      p_opponent_topic_id: opponentTopicId,
    };
    const result = await this.repository.updateTopicContextById(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error updating topic context:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: UpdateTopicContext = {
      topicContextId: topicContextId,
    };
    return {
      data: data,
    };
  }

  /** トピックコンテキストを非表示にするメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async hideTopicContextById({
    topicContextId,
    updaterId,
  }: {
    topicContextId: string;
    updaterId: string;
  }): Promise<{
    data?: HideTopicContext;
    error?: string;
  }> {
    const request: HideTopicContextByIdRequest = {
      p_topic_context_id: topicContextId,
      p_updater_id: updaterId,
    };
    const result = await this.repository.hideTopicContextById(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error hiding topic context:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: HideTopicContext = {
      topicContextId: topicContextId,
    };
    return {
      data: data,
    };
  }

  /** 新しいアクティビティを投稿するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async postNewTopicCommentActivity({
    topicId,
    newComment,
    suggestionId,
  }: {
    topicId: string;
    newComment: Json;
    suggestionId?: string;
  }): Promise<{
    data?: PostNewTopicCommentActivity;
    error?: string;
  }> {
    console.log("newComment", newComment);

    const request: PostNewTopicCommentActivityRequest = {
      p_topic_id: topicId,
      p_new_comment: newComment,
      p_suggestion_id: suggestionId,
    };
    const result = await this.repository.postNewTopicCommentActivity(request);
    if (!result.response || result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error posting new activity:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: PostNewTopicCommentActivity = {
      activityId: result.response,
    };
    return {
      data: data,
    };
  }

  /** コメントアクティビティを更新するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async updateTopicCommentActivityById({
    activityId,
    content,
  }: {
    activityId: string;
    content: Json;
  }): Promise<{
    data?: UpdateTopicCommentActivityById;
    error?: string;
  }> {
    const request: UpdateTopicCommentActivityByIdRequest = {
      p_activity_id: activityId,
      p_new_content: content,
    };
    const result = await this.repository.updateTopicCommentActivityById(
      request
    );
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error updating comment activity:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: UpdateTopicCommentActivityById = {};
    return {
      data: data,
    };
  }

  /** アクティビティを非表示にするメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async hideTopicActivityWithRepliesById({
    activityId,
  }: {
    activityId: string;
  }): Promise<{
    data?: HideTopicActivityWithRepliesById;
    error?: string;
  }> {
    const request: HideTopicActivityWithRepliesByIdRequest = {
      p_activity_id: activityId,
    };
    const result = await this.repository.hideTopicActivityWithRepliesById(
      request
    );
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error hiding activity with replies:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: HideTopicActivityWithRepliesById = {};
    return {
      data: data,
    };
  }

  /** リプライを更新するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async updateTopicReplyById({
    replyId,
    content,
  }: {
    replyId: string;
    content: Json;
  }): Promise<{
    data?: UpdateTopicReplyById;
    error?: string;
  }> {
    const request: UpdateTopicReplyByIdRequest = {
      p_reply_id: replyId,
      p_new_content: content,
    };
    const result = await this.repository.updateTopicReplyById(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error updating reply:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: UpdateTopicReplyById = {};
    return {
      data: data,
    };
  }

  /** リプライを非表示にするメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async hideTopicReplyById({ replyId }: { replyId: string }): Promise<{
    data?: HideTopicReplyById;
    error?: string;
  }> {
    const request: HideTopicReplyByIdRequest = {
      p_reply_id: replyId,
    };
    const result = await this.repository.hideTopicReplyById(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error hiding reply:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: HideTopicReplyById = {};
    return {
      data: data,
    };
  }

  /** トピックを非表示にするメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async hideTopicById({
    topicId,
    hiderId,
  }: {
    topicId: string;
    hiderId: string;
  }): Promise<{
    data?: HideTopicById;
    error?: string;
  }> {
    const request: HideTopicByIdRequest = {
      p_topic_id: topicId,
      p_hider_id: hiderId,
    };
    const result = await this.repository.hideTopicById(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error hiding topic:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: HideTopicById = {};
    return {
      data: data,
    };
  }

  /** 新しいリプライを投稿するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async postNewTopicReply({
    topicId,
    newReply,
  }: {
    topicId: string;
    newReply: Json;
  }): Promise<{
    data?: PostNewTopicReply;
    error?: string;
  }> {
    const request: PostNewTopicReplyRequest = {
      p_topic_id: topicId,
      p_new_reply: newReply,
    };
    const result = await this.repository.postNewTopicReply(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error posting new reply:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: PostNewTopicReply = {};
    return {
      data: data,
    };
  }

  async getTopicParticipants({ topicId }: { topicId: string }): Promise<{
    data?: {
      participantId: string;
      userName: string;
      email: string;
      avatarUrl: string;
    }[];
    error?: string;
  }> {
    const request: GetTopicParticipantsByTopicIdRequest = {
      p_topic_uuid: topicId,
    };
    const result = await this.repository.getTopicParticipants(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching participants by topic:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    return {
      data: result.response.map((participant) => {
        return {
          participantId: participant.participant_id,
          userName: participant.user_name,
          email: participant.email,
          avatarUrl: participant.avatar_url,
        };
      }),
    };
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
  }): Promise<{
    data?: { message: string };
    error?: string;
  }> {
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
    const result = await this.repository.updateTopicContexts(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error updating topic contexts:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data = { message: "success" };
    return {
      data: data,
    };
  }

  async getTopicContextsByProjectId({
    projectId,
  }: {
    projectId: string;
  }): Promise<{
    data?: ProjectTopicContext[];
    error?: string;
  }> {
    const request: GetTopicContextsByProjectIdRequest = {
      p_project_id: projectId,
    };

    const result = await this.repository.getTopicContextsByProjectId(request);

    if (!result.response) {
      console.error(
        `Error fetching contexts by project (ID: ${projectId}):`,
        result.error
      );
      return { error: result.error ?? "An unexpected error occurred." };
    }

    return {
      data: result.response.map((context) => {
        return {
          id: context.id, // 修正: contextId → id
          name: context.name,
          description: context.description,
          type: context.type,
          topicId: context.topic_id,
          opponentTopicId: context.opponent_topic_id,
        };
      }),
    };
  }

  async updateTopicTitle({
    topicId,
    title,
    updaterId,
  }: {
    topicId: string;
    title: string;
    updaterId: string;
  }) {
    const request: UpdateTopicTitleRequest = {
      p_topic_id: topicId,
      p_title: title,
      p_updater_id: updaterId,
    };
    const result = await this.repository.updateTopicTitle(request);
    if (!result.response && result.error) {
      console.error("Error updating topic title:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    return {
      data: {},
    };
  }

  async updateTopicTagsByIds({
    topicId,
    tagIds,
    updaterId,
  }: {
    topicId: string;
    tagIds: string[];
    updaterId: string;
  }): Promise<{
    response?: UpdateTopicTagsByIdsModel;
    error?: string;
  }> {
    // 既存のタグを確認し、addとhideに振り分け
    const getTopicTagIdsRequest: GetTopicTagIdsByTopicIdsRequest = {
      p_topic_ids: [topicId],
    };
    const getTopicTagIdsResult = await this.repository.getTopicTagIdsByTopicIds(
      getTopicTagIdsRequest
    );
    if (!getTopicTagIdsResult.response && getTopicTagIdsResult.error) {
      console.error("Error getting topic tag ids:", getTopicTagIdsResult.error);
      return {
        error: getTopicTagIdsResult.error ?? "An unexpected error occurred.",
      };
    }

    const existingTagIds = getTopicTagIdsResult.response?.[0]?.tag_ids ?? [];
    const addTagIds = tagIds.filter((tagId) => !existingTagIds.includes(tagId));
    const hideTagIds = existingTagIds.filter(
      (tagId) => !tagIds.includes(tagId)
    );

    // タグを追加
    const addTopicTagsByIdsRequest: AddTopicTagsByIdsRequest = {
      p_topic_id: topicId,
      p_tag_ids: addTagIds,
      p_updater_id: updaterId,
    };
    const addTopicTagsByIdsResult = await this.repository.addTopicTagsByIds(
      addTopicTagsByIdsRequest
    );
    if (!addTopicTagsByIdsResult.response && addTopicTagsByIdsResult.error) {
      console.error("Error adding topic tags:", addTopicTagsByIdsResult.error);
      return {
        error: addTopicTagsByIdsResult.error ?? "An unexpected error occurred.",
      };
    }

    // タグを非表示
    const hideTopicTagsByIdsRequest: HideTopicTagsByIdsRequest = {
      p_topic_id: topicId,
      p_tag_ids: hideTagIds,
      p_updater_id: updaterId,
    };
    const hideTopicTagsByIdsResult = await this.repository.hideTopicTagsByIds(
      hideTopicTagsByIdsRequest
    );
    if (!hideTopicTagsByIdsResult.response && hideTopicTagsByIdsResult.error) {
      console.error("Error hiding topic tags:", hideTopicTagsByIdsResult.error);
      return {
        error:
          hideTopicTagsByIdsResult.error ?? "An unexpected error occurred.",
      };
    }

    const response: UpdateTopicTagsByIdsModel = {};
    return {
      response: response,
    };
  }

  async updateTopicUsersByIds({
    topicId,
    userIds,
    updaterId,
  }: {
    topicId: string;
    userIds: string[];
    updaterId: string;
  }): Promise<{
    response?: UpdateTopicUsersByIdsModel;
    error?: string;
  }> {
    // 既存のユーザーを確認し、addとhideに振り分け
    const getTopicUserIdsRequest: GetTopicUserIdsByTopicIdsRequest = {
      p_topic_ids: [topicId],
    };
    const getTopicUserIdsResult =
      await this.repository.getTopicUserIdsByTopicIds(getTopicUserIdsRequest);
    if (!getTopicUserIdsResult.response && getTopicUserIdsResult.error) {
      console.error(
        "Error getting topic user ids:",
        getTopicUserIdsResult.error
      );
      return {
        error: getTopicUserIdsResult.error ?? "An unexpected error occurred.",
      };
    }
    const existingUserIds = getTopicUserIdsResult.response?.[0]?.user_ids ?? [];
    const addUserIds = userIds.filter(
      (userId) => !existingUserIds.includes(userId)
    );
    const hideUserIds = existingUserIds.filter(
      (userId) => !userIds.includes(userId)
    );

    // ユーザーを追加
    const addTopicUsersByIdsRequest: AddTopicUsersByIdsRequest = {
      p_topic_id: topicId,
      p_user_ids: addUserIds,
      p_updater_id: updaterId,
    };
    const addTopicUsersByIdsResult = await this.repository.addTopicUsersByIds(
      addTopicUsersByIdsRequest
    );
    if (!addTopicUsersByIdsResult.response && addTopicUsersByIdsResult.error) {
      console.error(
        "Error adding topic users:",
        addTopicUsersByIdsResult.error
      );
      return {
        error:
          addTopicUsersByIdsResult.error ?? "An unexpected error occurred.",
      };
    }

    // ユーザーを非表示
    const hideTopicUsersByIdsRequest: HideTopicUsersByIdsRequest = {
      p_topic_id: topicId,
      p_user_ids: hideUserIds,
      p_updater_id: updaterId,
    };
    const hideTopicUsersByIdsResult = await this.repository.hideTopicUsersByIds(
      hideTopicUsersByIdsRequest
    );
    if (
      !hideTopicUsersByIdsResult.response &&
      hideTopicUsersByIdsResult.error
    ) {
      console.error(
        "Error hiding topic users:",
        hideTopicUsersByIdsResult.error
      );
      return {
        error:
          hideTopicUsersByIdsResult.error ?? "An unexpected error occurred.",
      };
    }

    const response: UpdateTopicUsersByIdsModel = {};
    return {
      response: response,
    };
  }

  async updateTopicStateById({
    topicId,
    state,
    updaterId,
  }: {
    topicId: string;
    state: string;
    updaterId: string;
  }): Promise<{
    response?: UpdateTopicStateByIdModel;
    error?: string;
  }> {
    const request: UpdateTopicStateByIdRequest = {
      p_topic_id: topicId,
      p_state: state,
      p_updater_id: updaterId,
    };
    const result = await this.repository.updateTopicStateById(request);
    if (!result.response && result.error) {
      console.error("Error updating topic state:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }

    const response = result.response!.map((topic) => {
      return {
        id: topic.id,
        state: topic.state,
        updaterId: topic.updater_id,
      };
    });
    return {
      response: response,
    };
  }

  async updateTopicFrameById({
    topicId,
    frameId,
    updaterId,
  }: {
    topicId: string;
    frameId: string;
    updaterId: string;
  }): Promise<{
    response?: UpdateTopicFrameByIdModel;
    error?: string;
  }> {
    const request: UpdateTopicFrameByIdRequest = {
      p_topic_id: topicId,
      p_frame_id: frameId,
      p_updater_id: updaterId,
    };
    const result = await this.repository.updateTopicFrameById(request);
    if (!result.response && result.error) {
      console.error("Error updating topic frame:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }

    const response: UpdateTopicFrameByIdModel = result.response!.map(
      (topic) => {
        return {
          id: topic.topic_id,
          frameId: topic.frame_id,
          updaterId: topic.updater_id,
        };
      }
    );
    return {
      response: response,
    };
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
  }): Promise<{
    response?: CreateTopicsFilteringShortcutModel;
    error?: string;
  }> {
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
    const result = await this.repository.createTopicsFilteringShortcut(request);
    if (!result.response && result.error) {
      console.error("Error creating topics filtering shortcut:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }

    const response: CreateTopicsFilteringShortcutModel = result.response!.map(
      (shortcut) => {
        return {
          id: shortcut.shortcut_id,
          projectId: shortcut.project_id,
          name: shortcut.name,
          description: shortcut.description,
          frameId: shortcut.frame_id,
          sort: shortcut.sort,
          state: shortcut.state,
          tagIds: shortcut.tag_ids,
          creatorId: shortcut.creator_id,
        };
      }
    );
    return {
      response: response,
    };
  }

  async hideTopicsFilteringShortcutsByIds({
    shortcutIds,
  }: {
    shortcutIds: string[];
  }): Promise<{
    response?: HideTopicsFilteringShortcutsByIdsModel;
    error?: string;
  }> {
    const request: HideTopicsFilteringShortcutsByIdsRequest = {
      p_shortcut_ids: shortcutIds,
    };
    const result = await this.repository.hideTopicsFilteringShortcutsByIds(
      request
    );
    if (!result.response && result.error) {
      console.error("Error hiding topics filtering shortcut:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }

    const response: HideTopicsFilteringShortcutsByIdsModel =
      result.response!.map((shortcut) => {
        return {
          hiddenId: shortcut.hidden_id,
        };
      });
    return {
      response: response,
    };
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
  }): Promise<{
    response?: UpdateTopicsFilteringShortcutByIdModel;
    error?: string;
  }> {
    // tag以外のショートカット情報を更新
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
      await this.repository.updateTopicsFilteringShortcutById(
        updateTopicsFilteringShortcutByIdRequest
      );
    if (
      !updateTopicsFilteringShortcutByIdResult.response &&
      updateTopicsFilteringShortcutByIdResult.error
    ) {
      console.error(
        "Error updating topics filtering shortcut:",
        updateTopicsFilteringShortcutByIdResult.error
      );
      return {
        error:
          updateTopicsFilteringShortcutByIdResult.error ??
          "An unexpected error occurred.",
      };
    }

    // tag情報を取得
    const getTopicsFilteringShortcutTagsByIdRequest: GetTopicsFilteringShortcutTagsByIdRequest =
      {
        p_shortcut_id: id,
      };
    const getTopicsFilteringShortcutTagsByIdResult =
      await this.repository.getTopicsFilteringShortcutTagsById(
        getTopicsFilteringShortcutTagsByIdRequest
      );
    if (
      !getTopicsFilteringShortcutTagsByIdResult.response &&
      getTopicsFilteringShortcutTagsByIdResult.error
    ) {
      console.error(
        "Error getting topics filtering shortcut tags:",
        getTopicsFilteringShortcutTagsByIdResult.error
      );
      return {
        error:
          getTopicsFilteringShortcutTagsByIdResult.error ??
          "An unexpected error occurred.",
      };
    }

    // 既存のタグを確認し、addとhideに振り分け
    const existingTagIds =
      getTopicsFilteringShortcutTagsByIdResult.response?.map(
        (tag) => tag.tag_id
      ) ?? [];
    const addTagIds = tagIds.filter((tagId) => !existingTagIds.includes(tagId));
    const hideTagIds = existingTagIds.filter(
      (tagId) => !tagIds.includes(tagId)
    );

    // タグを追加
    const addTopicsFilteringShortcutTagsByIdRequest: AddTopicsFilteringShortcutTagsByIdRequest =
      {
        p_shortcut_id: id,
        p_tag_ids: addTagIds,
      };
    const addTopicsFilteringShortcutTagsByIdResult =
      await this.repository.addTopicsFilteringShortcutTagsById(
        addTopicsFilteringShortcutTagsByIdRequest
      );
    if (
      !addTopicsFilteringShortcutTagsByIdResult.response &&
      addTopicsFilteringShortcutTagsByIdResult.error
    ) {
      console.error(
        "Error adding topics filtering shortcut tags:",
        addTopicsFilteringShortcutTagsByIdResult.error
      );
      return {
        error:
          addTopicsFilteringShortcutTagsByIdResult.error ??
          "An unexpected error occurred.",
      };
    }

    // タグを非表示
    const hideTopicsFilteringShortcutTagsByIdsRequest: HideTopicsFilteringShortcutTagsByIdsRequest =
      {
        p_shortcut_id: id,
        p_tag_ids: hideTagIds,
      };
    const hideTopicsFilteringShortcutTagsByIdsResult =
      await this.repository.hideTopicsFilteringShortcutTagsByIds(
        hideTopicsFilteringShortcutTagsByIdsRequest
      );
    if (
      !hideTopicsFilteringShortcutTagsByIdsResult.response &&
      hideTopicsFilteringShortcutTagsByIdsResult.error
    ) {
      console.error(
        "Error hiding topics filtering shortcut tags:",
        hideTopicsFilteringShortcutTagsByIdsResult.error
      );
      return {
        error:
          hideTopicsFilteringShortcutTagsByIdsResult.error ??
          "An unexpected error occurred.",
      };
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
    return {
      response: response,
    };
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
  }): Promise<{
    response?: string;
    error?: string;
  }> {
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
    const result = await this.repository.updateTopicProperties(request);
    if (!result.response && result.error) {
      console.error("Error updating topic properties:", result.error);
      return { error: result.error ?? "An unexpected error occurred." };
    }
    return {
      response: "OK",
    };
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
  }): Promise<{
    response?: TopicId;
    error?: string;
  }> {
    // ユーザーIDを取得する
    const userEmails: string[] = [];
    userdata.forEach((user) => {
      if (!userEmails.includes(user.email)) {
        userEmails.push(user.email);
      }
    });
    if (
      !userEmails.includes(
        userdata.find((user) => user.id === metadata.created_by)?.email ?? ""
      )
    ) {
      userEmails.push(
        userdata.find((user) => user.id === metadata.created_by)?.email ?? ""
      );
    }
    console.log("userEmails", userEmails);
    const userInfoReqests: GetUserInfoByEmailRequest[] = userEmails.map(
      (userEmail) => {
        return {
          p_email: userEmail,
        };
      }
    );
    const userInfoResults = await Promise.all(
      userInfoReqests.map((request) =>
        this.authRepository.getUserInfoByEmail(request)
      )
    );
    console.log(userInfoResults);
    const authPromises: Promise<AuthResponse>[] = [];
    userdata.forEach((user) => {
      if (
        !userInfoResults.find((result) => {
          if (result.response && result.response[0]) {
            return result.response[0].user_email === user.email;
          } else {
            false;
          }
        }) ||
        userInfoReqests.length === 0
      ) {
        // ユーザーが存在しない場合、ゲストユーザーとして登録
        authPromises.push(
          this.supabase.client.auth.signUp({
            email: user.email,
            password: "password123",
            options: {
              data: {
                user_name: user.name,
                email: user.email,
                avatar_url: "",
                type: "guest",
              },
            },
          })
        );
      }
    });

    const signupResults = await Promise.all(authPromises);
    signupResults.forEach((result) => {
      if (result.error) {
        console.error("Error creating new user:", result.error);
        return { error: result.error ?? "unknown error" };
      }
    });

    const userInfoReqests2: GetUserInfoByEmailRequest[] = userEmails.map(
      (userEmail) => {
        return {
          p_email: userEmail,
        };
      }
    );
    const userInfoResults2 = await Promise.all(
      userInfoReqests2.map((request) =>
        this.authRepository.getUserInfoByEmail(request)
      )
    );

    const userInfos: {
      id_from_format: string;
      id: string;
      email: string;
      userName: string;
    }[] = [];
    userInfoResults2.forEach((result) => {
      if (result.response && result.response.length > 0) {
        const id_from_format =
          userdata.find((user) => user.email === result.response![0].user_email)
            ?.id ?? "";
        userInfos.push({
          id_from_format: id_from_format,
          id: result.response[0].user_id ?? null,
          email: result.response[0].user_email ?? null,
          userName: result.response[0].user_name ?? null,
        });
      }
    });
    console.log("userInfos", userInfos);

    //  tagを確認して、なければ作成する
    const tagIds: string[] = [];
    const newTags: {
      name: string;
      color: string;
      description: string;
    }[] = [];
    const tagRequest: GetTagsByProjectIdRequest = {
      p_project_id: projectId,
    };

    const tagResults = await this.projectRepository.getTagsByProjectId(
      tagRequest
    );
    const projectTags = tagResults.response ?? [];
    if (tagResults.response) {
      tagdata.forEach((tag) => {
        const tagResult = tagResults.response?.find(
          (tagResult) => tagResult.name === tag.name
        );
        if (tagResult) {
          tagIds.push(tagResult.id);
        } else {
          newTags.push(tag);
        }
      });
    } else {
      console.error("Error fetching tags by project:", tagResults.error);
      return { error: tagResults.error ?? "unknown error" };
    }
    const newTagRequests = newTags.map((tag) => {
      return {
        p_project_id: projectId,
        p_name: tag.name,
        p_color: tag.color,
        p_creator_id: uploaderId, // TODO: 暫定的な処理
        p_description: tag.description,
      };
    });
    const newTagResults = await Promise.all(
      newTagRequests.map((request) =>
        this.projectRepository.createNewTag(request)
      )
    );
    newTagResults.forEach((result) => {
      if (result.response) {
        // TODO: responseの形式を確認する
        tagIds.push(result.response.split(":")[1]?.trim());
      } else {
        console.error("Error creating new tag:", result.error);
        return { error: result.error ?? "unknown error" };
      }
    });
    newTags.forEach((tag, index) => {
      projectTags.push({
        id: newTagResults[index].response ?? "",
        name: tag.name,
        color: tag.color,
        description: tag.description,
      });
    });
    console.log("tagIds", tagIds);
    console.log("projectTags", projectTags);

    // Frameを確認して、なければ作成する
    const projectFramesResult = await this.frameService.getFramesByProjectId({
      projectId: projectId,
    });
    if (!projectFramesResult.response) {
      console.error(
        "Error fetching schemas by project:",
        projectFramesResult.error
      );
      return { error: projectFramesResult.error ?? "unknown error" };
    }
    const projectFrames = projectFramesResult.response;
    console.log("projectFrames", projectFrames);

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
        (projectFrame) => projectFrame.id === frame.id
      );
      if (existingFrame) {
        frameIds.push(existingFrame.id);
      } else {
        newFrames.push(frame);
      }
    });
    const convertType = (type: string) => {
      switch (type) {
        case "stringType":
          return "text";
        case "intType":
          return "number";
        case "booleanType":
          return "boolean";
        case "dateType":
          return "date";
        case "mapType":
          return "map";
        case "listType":
          return "list";
        default:
          return "text";
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
          .filter((a) => a.name !== "__document")
          .map((a) => {
            return {
              name: a.name,
              type: convertType(a.type.name),
            };
          }),
      };
    });
    console.log("newFrameRequests", JSON.stringify(newFrameRequests));
    const newFrameResults = await Promise.all(
      newFrameRequests.map((request) =>
        this.frameService.createNewFrame(request)
      )
    );
    newFrameResults.forEach((result) => {
      if (result.error) {
        console.error("Error creating new frame from format:", result.error);
      }
    });

    if (newFrameRequests.length > 0) {
      const errorResults = newFrameResults.filter(
        (result) => result.error && result.error.trim() !== ""
      );
      if (errorResults.length > 0) {
        const errors = errorResults.map((result) => result.error);
        console.error("Error creating new frames from format:", errors);
        return { error: `Failed to create frames: ${errors.join(", ")}` };
      }
    }

    const projectFramesResult2 = await this.frameService.getFramesByProjectId({
      projectId: projectId,
    });
    if (!projectFramesResult2.response) {
      console.error(
        "Error fetching frames by project:",
        projectFramesResult2.error
      );
      return { error: projectFramesResult2.error ?? "unknown error" };
    }
    const projectFrames2 = projectFramesResult2.response;
    console.log("projectSchemas2", projectFrames2);

    // 最新のデータを取得する TODO: version管理できるようになったら、全てのバージョンを取得するように修正する
    const latestdata = data.find(
      (data) =>
        data.id ===
        snapshotdata.find(
          (snapshot) => snapshot.id === metadata.latest_snapshot_id
        )?.data_id
    );
    const document = latestdata?.attributes.find(
      (a) => a.attribute_name === "__document"
    )?.value;

    // 既存のトピックを取得する
    const existingTopicResult = await this.getTopicsByProject({
      projectId: projectId,
    });
    if (!existingTopicResult.response) {
      console.error(
        "Error fetching topics by project:",
        existingTopicResult.error
      );
      return { error: existingTopicResult.error ?? "unknown error" };
    }
    const existingTopics = existingTopicResult.response;
    console.log("existingTopics", existingTopics);
    if (existingTopics.find((topic) => topic.id === topicId)) {
      return { error: "The topic already exists." };
    }

    // 初期docを作成する
    const ydoc = new Y.Doc();
    const encodedContent = Y.encodeStateAsUpdate(ydoc);
    const hexContent = Uint8ArrayToHex(encodedContent);

    console.log("userinfos", userInfos);
    console.log("assignee", metadata.assignee);

    const participantIds = metadata.participants.map(
      (participantId) =>
        userInfos.find((userInfo) => userInfo.id_from_format === participantId)
          ?.id ?? ""
    );

    const reviewerId = metadata.reviewer.map(
      (reviewerId) =>
        userInfos.find((userInfo) => userInfo.id_from_format === reviewerId)
          ?.id ?? ""
    )[0];

    const assigneeId = metadata.assignee.map(
      (assigneeId) =>
        userInfos.find((userInfo) => userInfo.id_from_format === assigneeId)
          ?.id ?? ""
    )[0];
    console.log("assigneeId", assigneeId);

    //  topicを作成する
    const request: CreateNewTopicRequest = {
      p_topic_id: topicId,
      p_user_id:
        userInfos.find(
          (userInfo) => userInfo.id_from_format === metadata.created_by
        )?.id ?? "",
      p_title: metadata.title,
      p_state: metadata.status,
      p_frame_id: latestdata?.frame_id ?? "",
      p_project_id: projectId,
      p_created_at: metadata.created_at,
      p_participant_ids: participantIds,
      p_reviewer_id: reviewerId ?? null, // TODO: reviewrを複数登録できるように修正する
      p_assignee_id: assigneeId ?? null, // TODO: assigneeを複数登録できるように修正する
      p_tag_ids: tagIds,
      p_priority: "Medium", // TODO: ここを修正する
      p_is_subscribe: true, // TODO: ここを修正する
      p_config: { setting1: "value1", setting2: "value2" },
      p_initial_content:
        (document as unknown as Json) ?? ("{}" as unknown as Json),
      p_initial_content_hex: hexContent,
    };
    console.log("request", request);

    const result = await this.repository.createNewTopic(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error creating topics from format:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const newTopicId = result.response;
    console.log("topicId", newTopicId);

    // topic detail を取得する
    const topicDetailsResult = await this.getTopicDetailsByIds({
      topicIds: [newTopicId ?? ""],
    });
    if (!topicDetailsResult.response) {
      console.error(
        "Error fetching topic details by topic:",
        topicDetailsResult.error
      );
      return { error: topicDetailsResult.error ?? "unknown error" };
    }
    const topicDetail = topicDetailsResult.response[0];
    console.log("topicDetail", topicDetail);

    // propertyを作成する
    if (latestdata?.attributes) {
      const properties = latestdata.attributes;
      console.log("properties", properties);

      const propertyResult = await this.updateTopicProperties({
        topicId: newTopicId,
        properties: properties
          .filter((property) => property.attribute_name !== "__document")
          .map((property) => {
            return {
              content: property.value as JSON,
              framePropertyId:
                projectFrames2
                  .find((frame) => frame.id === topicDetail.frame?.id)
                  ?.properties.find(
                    (propertyDefinition) =>
                      propertyDefinition.name === property.attribute_name
                  )?.id ?? "",
            };
          }),
        creatorId: uploaderId,
      });
      if (propertyResult.error) {
        // エラーハンドリングなどの追加ロジックをここに記述可能
        console.error(
          "Error updating attributes by topic:",
          propertyResult.error
        );
        return { error: propertyResult.error ?? "unknown error" };
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
              console.log("activity", activity);
              const body = activity.body as unknown as {
                new_title: string;
                old_title: string;
              };
              content = {
                key: "title",
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
                key: "state",
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
                key: "tag",
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
                key: "frame", // TODO: ここを修正する
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
                key: "contexts",
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
              })?.id ?? "",
            content:
              activity.event_type === 4
                ? (content as unknown as { comment: Json; replies: Json[] })
                    .comment
                : content,
            createdAt: activity.timestamp,
            type: activity.event_type === 4 ? "comment" : "action log",
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
                            userInfo.id_from_format === reply.user_id
                        )?.id ?? "", // TODO: ここを修正する
                      comment: reply.comment,
                      createdAt: reply.timestamp,
                    };
                  })
                : [],
          };
        }) as unknown as Json,
      };
      console.log("timelineRequest", JSON.stringify(timelineRequest));
      const timelineResult = await this.repository.createTopicTimeline(
        timelineRequest
      );
      if (timelineResult.error) {
        // エラーハンドリングなどの追加ロジックをここに記述可能
        console.error(
          "Error creating timeline by topic:",
          timelineResult.error
        );
        return { error: timelineResult.error ?? "unknown error" };
      }
    }

    // context を作成する
    if (contextdata) {
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
      if (contextResult.error) {
        // エラーハンドリングなどの追加ロジックをここに記述可能
        console.error("Error creating context by topic:", contextResult.error);
        return { error: contextResult.error ?? "unknown error" };
      }
    }

    console.log("create topic from format success");
    console.log("topic id", newTopicId);

    return {
      response: {
        topicId: newTopicId,
      },
    };
  }
}
