import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FramesRepository } from 'src/frames/frames.repository';
import {
  HideFrameTemplateByIdRequest,
  HideFrameByIdRequest,
  PostNewFrameCommentActivityRequest,
  UpdateFrameCommentActivityByIdRequest,
  HideFrameActivityWithRepliesByIdRequest,
  PostNewFrameReplyRequest,
  UpdateFrameReplyByIdRequest,
  HideFrameReplyByIdRequest,
  CreateNewFrameRequest,
  CreateNewFramePropertiesRequest,
  CreateNewTemplateRequest,
  UpdateFrameTemplateRequest,
  GetFrameDetailsByIdsRequest,
  GetFrameIdsByProjectIdRequest,
  GetFramePropertiesByIdsRequest,
  GetTemplatesByIdsRequest,
  GetFrameTopicsByIdsRequest,
  GetFrameActivitiesByIdsRequest,
  GetFrameRepliesByIdsRequest,
  SearchFrameIdsRequest,
  UpdateFrameNameByIdRequest,
  UpdateFrameDescriptionByIdRequest,
  UpdateFramePropertiesByIdsRequest,
  HideFramePropertiesByIdsRequest,
  CreateFramePropertiesRequest,
  GetFramePropertiesByFrameIdRequest,
  GetFrameDetailsByIdsResponse,
  GetUserInfosByIdsResponse,
  GetFramePropertiesByIdsResponse,
  GetTemplatesByIdsResponse,
  GetFrameActivitiesByIdsResponse,
  GetFrameRepliesByIdsResponse,
  GetFrameTopicsByIdsResponse,
  GetFramePropertiesByFrameIdResponse,
  UpdateFramePropertiesByIdsResponse,
  CreateFramePropertiesResponse,
} from 'src/__generated__/supabase.interface';

import {
  HideFrameTemplateByIdModel,
  HideFrameByIdModel,
  PostNewFrameCommentActivityModel,
  UpdateFrameCommentActivityByIdModel,
  HideFrameActivityWithRepliesByIdModel,
  PostNewFrameReplyModel,
  UpdateFrameReplyByIdModel,
  HideFrameReplyByIdModel,
  CreateNewFramePropertiesModel,
  GetFramesByProjectIdModel,
  SearchFramesByProjectIdModel,
  GetFrameDetailsByIdsModel,
  CreateNewTemplateModel,
  UpdateFrameTemplateModel,
  UpdateFrameNameByIdModel,
  UpdateFrameDescriptionByIdModel,
  UpdateFramePropertiesByIdsModel,
  GetFramePropertiesByFrameIdModel,
  CreateNewFrameModel,
} from './entities/frame.entity';
import { Json } from 'src/__generated__/schema';
import { OwnersService } from 'src/owners/owners.service';

@Injectable()
export class FramesService {
  constructor(
    private readonly framesRepository: FramesRepository,
    private readonly ownersService: OwnersService,
  ) {}

  async hideFrameTemplateById({
    templateId,
  }: {
    templateId: string;
  }): Promise<HideFrameTemplateByIdModel> {
    try {
      const request: HideFrameTemplateByIdRequest = {
        p_template_id: templateId,
      };
      const result = await this.framesRepository.hideFrameTemplateById(request);
      const response: HideFrameTemplateByIdModel = result;
      return response;
    } catch (error) {
      console.error('Error hiding frame template:', error);
      throw new HttpException(
        `Error hiding frame template: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hideFrameById({
    frameId,
  }: {
    frameId: string;
  }): Promise<HideFrameByIdModel> {
    try {
      const request: HideFrameByIdRequest = {
        p_frame_id: frameId,
      };
      const result = await this.framesRepository.hideFrameById(request);
      const response: HideFrameByIdModel = result;
      return response;
    } catch (error) {
      console.error('Error hiding frame:', error);
      throw new HttpException(
        `Error hiding frame: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async postNewFrameCommentActivity({
    frameId,
    newComment,
  }: {
    frameId: string;
    newComment: Json;
  }): Promise<PostNewFrameCommentActivityModel> {
    try {
      const request: PostNewFrameCommentActivityRequest = {
        p_frame_id: frameId,
        p_new_comment: newComment,
      };
      const result =
        await this.framesRepository.postNewFrameCommentActivity(request);
      const response: PostNewFrameCommentActivityModel = result!;
      return response;
    } catch (error) {
      console.error('Error posting new frame comment activity:', error);
      throw new HttpException(
        `Error posting new frame comment activity: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFrameCommentActivityById({
    activityId,
    content,
  }: {
    activityId: string;
    content: Json;
  }): Promise<UpdateFrameCommentActivityByIdModel> {
    try {
      const request: UpdateFrameCommentActivityByIdRequest = {
        p_activity_id: activityId,
        p_new_content: content,
      };
      const result =
        await this.framesRepository.updateFrameCommentActivityById(request);
      // 追加のビジネスロジックをここに記述可能
      const response: UpdateFrameCommentActivityByIdModel = result!;
      return response;
    } catch (error) {
      console.error('Error updating frame comment activity:', error);
      throw new HttpException(
        `Error updating frame comment activity: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hideFrameActivityWithRepliesById({
    activityId,
  }: {
    activityId: string;
  }): Promise<HideFrameActivityWithRepliesByIdModel> {
    try {
      const request: HideFrameActivityWithRepliesByIdRequest = {
        p_activity_id: activityId,
      };
      const result =
        await this.framesRepository.hideFrameActivityWithRepliesById(request);
      const response: HideFrameActivityWithRepliesByIdModel = result;
      return response;
    } catch (error) {
      console.error('Error hiding frame activity with replies:', error);
      throw new HttpException(
        `Error hiding frame activity with replies: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async postNewFrameReply({
    frameId,
    newReply,
  }: {
    frameId: string;
    newReply: Json;
  }): Promise<PostNewFrameReplyModel> {
    try {
      const request: PostNewFrameReplyRequest = {
        p_frame_id: frameId,
        p_new_reply: newReply,
      };
      const result = await this.framesRepository.postNewFrameReply(request);
      const response: PostNewFrameReplyModel = result;
      return response;
    } catch (error) {
      console.error('Error posting new frame reply:', error);
      throw new HttpException(
        `Error posting new frame reply: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFrameReplyById({
    replyId,
    content,
  }: {
    replyId: string;
    content: Json;
  }): Promise<UpdateFrameReplyByIdModel> {
    try {
      const request: UpdateFrameReplyByIdRequest = {
        p_reply_id: replyId,
        p_new_content: content,
      };
      const result = await this.framesRepository.updateFrameReplyById(request);
      const response: UpdateFrameReplyByIdModel = result;
      return {
        response: response,
      };
    } catch (error) {
      console.error('Error updating frame reply:', error);
      throw new HttpException(
        `Error updating frame reply: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async hideFrameReplyById({
    replyId,
  }: {
    replyId: string;
  }): Promise<HideFrameReplyByIdModel> {
    try {
      const request: HideFrameReplyByIdRequest = {
        p_reply_id: replyId,
      };
      const result = await this.framesRepository.hideFrameReplyById(request);
      const response: HideFrameReplyByIdModel = result;
      return response;
    } catch (error) {
      console.error('Error hiding frame reply:', error);
      throw new HttpException(
        `Error hiding frame reply: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createNewFrame({
    id,
    name,
    description,
    icon,
    projectId,
    creatorId,
    properties,
  }: {
    id?: string;
    name: string;
    description: string | null;
    icon: string | null;
    projectId: string;
    creatorId: string;
    properties:
      | {
          name: string;
          type: string;
        }[]
      | null;
  }): Promise<CreateNewFrameModel> {
    // Frame 作成
    let newFrameId: string;
    try {
      const createNewFrameRequest: CreateNewFrameRequest = {
        p_frame_id: id,
        p_name: name,
        p_description: description ?? '',
        p_icon: icon ?? '',
        p_project_id: projectId,
        p_creator_id: creatorId,
      };
      const createNewFrameResult = await this.framesRepository.createNewFrame(
        createNewFrameRequest,
      );
      newFrameId = createNewFrameResult;
    } catch (error) {
      console.error('Error creating new frame:', error);
      throw new HttpException(
        `Error creating new frame: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Frame Properties 作成
    if (!properties) {
      const response: CreateNewFrameModel = {
        newFrameId,
      };
      return response;
    }
    try {
      const createNewFramePropertiesRequest: CreateNewFramePropertiesRequest = {
        p_frame_id: newFrameId,
        p_properties: properties,
        p_creator_id: creatorId,
      };
      const createNewFramePropertiesResult =
        await this.framesRepository.createNewFrameProperties(
          createNewFramePropertiesRequest,
        );
      const response: CreateNewFrameModel = {
        newFrameId: newFrameId,
      };
      return response;
    } catch (error) {
      console.error('Error creating new frame properties:', error);
      throw new HttpException(
        `Error creating new frame properties: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFramesByProjectId({
    projectId,
  }: {
    projectId: string;
  }): Promise<GetFramesByProjectIdModel> {
    // project id から frame id を取得
    let frameIds: string[] = [];
    try {
      const getFrameIdsByProjectIdRequest: GetFrameIdsByProjectIdRequest = {
        p_project_id: projectId,
      };
      const getFrameIdsByProjectIdResult =
        await this.framesRepository.getFrameIdsByProjectId(
          getFrameIdsByProjectIdRequest,
        );
      frameIds = getFrameIdsByProjectIdResult.map((frame) => frame.frame_id);
    } catch (error) {
      console.error('Error getting frame ids by project id:', error);
      throw new HttpException(
        `Error getting frame ids by project id: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame 詳細を取得
    let frames: GetFrameDetailsByIdsResponse;
    try {
      const getFrameDetailsByIdsRequest: GetFrameDetailsByIdsRequest = {
        p_frame_ids: frameIds,
      };
      frames = await this.framesRepository.getFrameDetailsByIds(
        getFrameDetailsByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting frame details by ids:', error);
      throw new HttpException(
        `Error getting frame details by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // creator id から user info を取得
    let creators: {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    }[];
    try {
      const creatorIdsSet = new Set(
        frames.map((frame) => frame.creator_id).flat(),
      );
      const creatorIdsArray = Array.from(creatorIdsSet);
      const creatorIdsRequest = {
        userIds: creatorIdsArray,
      };

      creators = await this.ownersService.getUserInfosByIds(creatorIdsRequest);
    } catch (error) {
      console.error('Error getting user info by ids:', error);
      throw new HttpException(
        `Error getting user info by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame properties を取得
    let properties: GetFramePropertiesByIdsResponse;
    try {
      const getFramePropertiesByIdsRequest: GetFramePropertiesByIdsRequest = {
        // flatMap で property_ids を取得
        p_property_ids: frames.map((frame) => frame.property_ids).flat(),
      };
      properties = await this.framesRepository.getFramePropertiesByIds(
        getFramePropertiesByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting frame properties by ids:', error);
      throw new HttpException(
        `Error getting frame properties by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame templates を取得
    let templates: GetTemplatesByIdsResponse;
    try {
      const getTemplatesByIdsRequest: GetTemplatesByIdsRequest = {
        // flatMap で template_ids を取得
        p_template_ids: frames.map((frame) => frame.template_ids).flat(),
      };
      templates = await this.framesRepository.getTemplatesByIds(
        getTemplatesByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting templates by ids:', error);
      throw new HttpException(
        `Error getting templates by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // flatMap で得た情報をframeごとにまとめる
    const response: GetFramesByProjectIdModel = frames.map((frame) => {
      return {
        id: frame.frame_id,
        name: frame.name,
        description: frame.description,
        createdAt: frame.created_at,
        createdBy: creators.find((user) => user.id === frame.creator_id)!,
        properties: properties
          .filter((property) => frame.property_ids.includes(property.id))
          .map((property) => {
            return {
              id: property.id,
              name: property.name,
              type: property.type,
              description: property.description,
              creatorId: property.creator_id,
              createdAt: property.created_at,
            };
          }),
        templates: templates
          .filter((template) => frame.template_ids.includes(template.id))
          .map((template) => {
            return {
              id: template.id,
              name: template.name,
              contentJson: template.content_json,
              creatorId: template.creator_id,
              createdAt: template.created_at,
            };
          }),
      };
    });
    return response;
  }

  async searchFramesByProjectId({
    projectId,
    search,
    sort,
    pageSize,
    page,
  }: {
    projectId: string;
    search: string;
    sort: string;
    pageSize: number;
    page: number;
  }): Promise<SearchFramesByProjectIdModel> {
    let frameIds: string[] = [];
    try {
      const searchFrameIdsRequest: SearchFrameIdsRequest = {
        p_project_id: projectId,
        p_search: search,
        p_sort: sort,
        p_page_size: pageSize,
        p_page: page,
      };
      const searchFrameIdsResult = await this.framesRepository.searchFrameIds(
        searchFrameIdsRequest,
      );
      frameIds = searchFrameIdsResult.map((frame) => frame.frame_id);
    } catch (error) {
      console.error('Error searching frame ids:', error);
      throw new HttpException(
        `Error searching frame ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame 詳細を取得
    let frames: GetFrameDetailsByIdsResponse;
    try {
      const getFrameDetailsByIdsRequest: GetFrameDetailsByIdsRequest = {
        p_frame_ids: frameIds,
      };
      frames = await this.framesRepository.getFrameDetailsByIds(
        getFrameDetailsByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting frame details by ids:', error);
      throw new HttpException(
        `Error getting frame details by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame properties を取得
    let properties: GetFramePropertiesByIdsResponse;
    try {
      const getFramePropertiesByIdsRequest: GetFramePropertiesByIdsRequest = {
        // flatMap で property_ids を取得
        p_property_ids: frames.flatMap((frame) => frame.property_ids),
      };
      properties = await this.framesRepository.getFramePropertiesByIds(
        getFramePropertiesByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting frame properties by ids:', error);
      throw new HttpException(
        `Error getting frame properties by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame templates を取得
    let templates: GetTemplatesByIdsResponse;
    try {
      const getTemplatesByIdsRequest: GetTemplatesByIdsRequest = {
        // flatMap で template_ids を取得
        p_template_ids: frames.flatMap((frame) => frame.template_ids),
      };
      templates = await this.framesRepository.getTemplatesByIds(
        getTemplatesByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting templates by ids:', error);
      throw new HttpException(
        `Error getting templates by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // user id から user info を取得
    let creators: {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    }[];
    try {
      const creatorIds = frames.map((frame) => frame.creator_id);
      const creatorIdsSet = new Set(creatorIds);
      const creatorIdsArray = Array.from(creatorIdsSet);
      const creatorIdsRequest = {
        userIds: creatorIdsArray,
      };
      creators = await this.ownersService.getUserInfosByIds(creatorIdsRequest);
    } catch (error) {
      console.error('Error getting user info by ids:', error);
      throw new HttpException(
        `Error getting user info by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // flatMap で得た情報をframeごとにまとめる
    const response: SearchFramesByProjectIdModel = frames.map((frame) => {
      return {
        id: frame.frame_id,
        name: frame.name,
        description: frame.description,
        createdBy: {
          id: frame.creator_id,
          name:
            creators.find((user) => user.id === frame.creator_id)?.name ?? '',
          email:
            creators.find((user) => user.id === frame.creator_id)?.email ?? '',
          avatarUrl:
            creators.find((user) => user.id === frame.creator_id)?.avatarUrl ??
            '',
        },
        properties: properties
          .filter((property) => frame.property_ids.includes(property.id))
          .map((property) => {
            return {
              id: property.id,
              name: property.name,
              type: property.type,
              description: property.description,
              creatorId: property.creator_id,
              createdAt: property.created_at,
            };
          }),
        templates: templates
          .filter((template) => frame.template_ids.includes(template.id))
          .map((template) => {
            return {
              id: template.id,
              name: template.name,
              contentJson: template.content_json,
              creatorId: template.creator_id,
              createdAt: template.created_at,
            };
          }),
      };
    });
    return response;
  }

  async getFrameDetailsByIds({
    frameIds,
  }: {
    frameIds: string[];
  }): Promise<GetFrameDetailsByIdsModel> {
    let frames: GetFrameDetailsByIdsResponse;
    try {
      const getFrameDetailsByIdsRequest: GetFrameDetailsByIdsRequest = {
        p_frame_ids: frameIds,
      };
      frames = await this.framesRepository.getFrameDetailsByIds(
        getFrameDetailsByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting frame details by ids:', error);
      throw new HttpException(
        `Error getting frame details by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // creator id から user info を取得
    let creators: {
      id: string;
      name: string;
      email: string;
      avatarUrl: string;
    }[];
    try {
      const creatorIds = frames.map((frame) => frame.creator_id);
      const creatorIdsSet = new Set(creatorIds);
      const creatorIdsArray = Array.from(creatorIdsSet);
      const creatorIdsRequest = {
        userIds: creatorIdsArray,
      };
      creators = await this.ownersService.getUserInfosByIds(creatorIdsRequest);
    } catch (error) {
      console.error('Error getting user info by ids:', error);
      throw new HttpException(
        `Error getting user info by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame properties を取得
    let properties: GetFramePropertiesByIdsResponse;
    try {
      const getFramePropertiesByIdsRequest: GetFramePropertiesByIdsRequest = {
        // flatMap で property_ids を取得
        p_property_ids: frames.flatMap((frame) => frame.property_ids),
      };
      properties = await this.framesRepository.getFramePropertiesByIds(
        getFramePropertiesByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting frame properties by ids:', error);
      throw new HttpException(
        `Error getting frame properties by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame templates を取得
    let templates: GetTemplatesByIdsResponse;
    try {
      const getTemplatesByIdsRequest: GetTemplatesByIdsRequest = {
        // flatMap で template_ids を取得
        p_template_ids: frames.flatMap((frame) => frame.template_ids),
      };
      templates = await this.framesRepository.getTemplatesByIds(
        getTemplatesByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting templates by ids:', error);
      throw new HttpException(
        `Error getting templates by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame topics を取得
    let topics: GetFrameTopicsByIdsResponse;
    try {
      const getFrameTopicsByIdsRequest: GetFrameTopicsByIdsRequest = {
        // flatMap で topic_ids を取得
        p_topic_ids: frames.flatMap((frame) => frame.topic_ids),
      };
      topics = await this.framesRepository.getFrameTopicsByIds(
        getFrameTopicsByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting frame topics by ids:', error);
      throw new HttpException(
        `Error getting frame topics by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame activities を取得
    let activities: GetFrameActivitiesByIdsResponse;
    try {
      const getFrameActivitiesByIdsRequest: GetFrameActivitiesByIdsRequest = {
        // flatMap で activity_ids を取得
        p_activity_ids: frames.flatMap((frame) => frame.activity_ids),
      };
      activities = await this.framesRepository.getFrameActivitiesByIds(
        getFrameActivitiesByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting frame activities by ids:', error);
      throw new HttpException(
        `Error getting frame activities by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // frame id から frame replies を取得
    let replies: GetFrameRepliesByIdsResponse;
    try {
      const getFrameRepliesByIdsRequest: GetFrameRepliesByIdsRequest = {
        // flatMap で reply_ids を取得
        p_reply_ids: activities.flatMap((activity) => activity.reply_ids),
      };
      replies = await this.framesRepository.getFrameRepliesByIds(
        getFrameRepliesByIdsRequest,
      );
    } catch (error) {
      console.error('Error getting frame replies by ids:', error);
      throw new HttpException(
        `Error getting frame replies by ids: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // flatMap で得た reply を activity ごとにまとめる
    const activitiesWithReplies = activities.map((activity) => {
      return {
        id: activity.id,
        icon: activity.icon,
        type: activity.type,
        posted_by: activity.posted_by,
        posted_at: activity.posted_at,
        content_json: activity.content_json,
        replies: replies
          .filter((reply) => activity.reply_ids.includes(reply.id))
          .map((reply) => {
            return {
              id: reply.id,
              icon: reply.icon,
              postedBy: reply.posted_by,
              postedAt: reply.posted_at,
              contentJson: reply.content_json,
            };
          }),
      };
    });

    // flatMap で得た情報をframeごとにまとめる
    const response: GetFrameDetailsByIdsModel = frames.map((frame) => {
      return {
        id: frame.frame_id,
        name: frame.name,
        description: frame.description,
        createdBy: creators.find((user) => user.id === frame.creator_id)!,
        createdAt: frame.created_at,
        properties: properties
          .filter((property) => frame.property_ids.includes(property.id))
          .map((property) => {
            return {
              id: property.id,
              name: property.name,
              type: property.type,
              description: property.description,
              creatorId: property.creator_id,
              createdAt: property.created_at,
            };
          }),
        templates: templates
          .filter((template) => frame.template_ids.includes(template.id))
          .map((template) => {
            return {
              id: template.id,
              name: template.name,
              contentJson: template.content_json,
              creatorId: template.creator_id,
              createdAt: template.created_at,
            };
          }),
        topics: topics.filter((topic) => frame.topic_ids.includes(topic.id)),
        activities: activitiesWithReplies
          .filter((activity) => frame.activity_ids.includes(activity.id))
          .map((activity) => {
            return {
              id: activity.id,
              icon: activity.icon,
              type: activity.type,
              postedBy: activity.posted_by,
              postedAt: activity.posted_at,
              contentJson: activity.content_json,
              replies: activity.replies,
            };
          }),
      };
    });

    return response;
  }

  async createNewTemplate({
    frameId,
    name,
    contentJson,
    creatorId,
  }: {
    frameId: string;
    name: string;
    creatorId: string;
    contentJson: Json;
  }): Promise<CreateNewTemplateModel> {
    try {
      const request: CreateNewTemplateRequest = {
        p_frame_id: frameId,
        p_name: name,
        p_content_json: contentJson,
        p_creator_id: creatorId,
      };
      const result = await this.framesRepository.createNewTemplate(request);
      const response: CreateNewTemplateModel = result;
      return response;
    } catch (error) {
      console.error('Error creating new template:', error);
      throw new HttpException(
        `Error creating new template: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFrameTemplate({
    templateId,
    name,
    contentJson,
  }: {
    templateId: string;
    name: string;
    contentJson: Json;
  }): Promise<UpdateFrameTemplateModel> {
    try {
      const request: UpdateFrameTemplateRequest = {
        p_template_id: templateId,
        p_name: name,
        p_content_json: contentJson,
      };
      const result = await this.framesRepository.updateFrameTemplate(request);
      const response: UpdateFrameTemplateModel = result;
      return response;
    } catch (error) {
      console.error('Error updating frame template:', error);
      throw new HttpException(
        `Error updating frame template: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFrameNameById({
    frameId,
    name,
  }: {
    frameId: string;
    name: string;
  }): Promise<UpdateFrameNameByIdModel> {
    try {
      const request: UpdateFrameNameByIdRequest = {
        p_frame_id: frameId,
        p_new_name: name,
      };
      const result = await this.framesRepository.updateFrameNameById(request);
      const response: UpdateFrameNameByIdModel = result[0];
      return response;
    } catch (error) {
      console.error('Error updating frame name:', error);
      throw new HttpException(
        `Error updating frame name: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFrameDescriptionById({
    frameId,
    description,
  }: {
    frameId: string;
    description: string;
  }): Promise<UpdateFrameDescriptionByIdModel> {
    try {
      const request: UpdateFrameDescriptionByIdRequest = {
        p_frame_id: frameId,
        p_new_description: description,
      };
      const result =
        await this.framesRepository.updateFrameDescriptionById(request);
      const response: UpdateFrameDescriptionByIdModel = result[0];
      return response;
    } catch (error) {
      console.error('Error updating frame description:', error);
      throw new HttpException(
        `Error updating frame description: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFramePropertiesByIds({
    frameId,
    properties,
    updaterId,
  }: {
    frameId: string;
    properties: {
      id: string;
      type: string;
      name: string;
      description: string;
    }[];
    updaterId: string;
  }): Promise<UpdateFramePropertiesByIdsModel> {
    let existingProperies: GetFramePropertiesByFrameIdResponse;
    try {
      // 既存のproperty情報をfetchし、差分を取得して処理を変更
      const getFramePropertiesByFrameIdRequest: GetFramePropertiesByFrameIdRequest =
        {
          p_frame_id: frameId,
        };
      existingProperies =
        await this.framesRepository.getFramePropertiesByFrameId(
          getFramePropertiesByFrameIdRequest,
        );
    } catch (error) {
      console.error('Error getting frame properties by frame id:', error);
      throw new HttpException(
        `Error getting frame properties by frame id: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 既存のproperty情報と新しいproperty情報を比較し、差分を取得
    const existingPropertyIds = properties.map(
      (property) =>
        existingProperies.find(
          (existingProperty) => existingProperty.id === property.id,
        )?.id,
    );
    const updateProperties = properties.filter((property) => {
      const existingProperty = existingProperies.find(
        (existingProperty) => existingProperty.id === property.id,
      );
      // existingPropertyが存在し、かつ内容に変更があればupdate対象とする
      return (
        existingProperty &&
        (existingProperty.name !== property.name ||
          existingProperty.type !== property.type ||
          existingProperty.description !== property.description)
      );
    });
    const newProperties = properties.filter(
      (property) => !existingPropertyIds.includes(property.id),
    );
    const hideProperties = existingProperies.filter(
      (existingProperty) => !existingPropertyIds.includes(existingProperty.id),
    );

    // 既存のプロパティのupdate (※関数全体の処理名もupdateとなっているが、この処理だけの名前もupdate)
    let updatedProperties: {
      id: string;
      name: string;
      type: string;
      description: string;
    }[] = [];
    if (updateProperties.length !== 0) {
      try {
        const updateFramePropertiesByIdsRequest: UpdateFramePropertiesByIdsRequest =
          {
            p_properties: updateProperties.map((property) => {
              return {
                id: property.id,
                name: property.name,
                type: property.type,
                description: property.description,
              };
            }),
            p_updater_id: updaterId,
          };
        const result = await this.framesRepository.updateFramePropertiesByIds(
          updateFramePropertiesByIdsRequest,
        );
        updatedProperties = result.map((property) => {
          return {
            id: property.id,
            name: property.name,
            type: property.type,
            description: property.description,
          };
        });
      } catch (error) {
        console.error('Error updating frame properties by ids:', error);
        throw new HttpException(
          `Error updating frame properties by ids: ${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // 新しいプロパティのcreate
    let createdProperties: {
      id: string;
      name: string;
      type: string;
      description: string;
    }[] = [];
    if (newProperties.length !== 0) {
      try {
        const createFramePropertiesRequest: CreateFramePropertiesRequest = {
          p_frame_id: frameId,
          p_properties: newProperties.map((property) => {
            return {
              name: property.name,
              type: property.type,
              description: property.description,
            };
          }),
          p_creator_id: updaterId,
        };
        const result = await this.framesRepository.createFrameProperties(
          createFramePropertiesRequest,
        );
        createdProperties = result.map((property) => {
          return {
            id: property.id,
            name: property.name,
            type: property.type,
            description: property.description,
          };
        });
      } catch (error) {
        console.error('Error creating frame properties:', error);
        throw new HttpException(
          `Error creating frame properties: ${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // 非表示にするプロパティのhide
    let hidedPropertyIds: string[] = [];
    if (hideProperties.length !== 0) {
      try {
        const hideFramePropertiesByIdsRequest: HideFramePropertiesByIdsRequest =
          {
            p_property_ids: hideProperties.map((property) => property.id),
            p_updater_id: updaterId,
          };
        const result = await this.framesRepository.hideFramePropertiesByIds(
          hideFramePropertiesByIdsRequest,
        );
        hidedPropertyIds = result.map((property) => property.id);
      } catch (error) {
        console.error('Error hiding frame properties by ids:', error);
        throw new HttpException(
          `Error hiding frame properties by ids: ${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    const response: UpdateFramePropertiesByIdsModel = {
      updatedFrameProperties: updatedProperties,
      createdFrameProperties: createdProperties,
      hidedFramePropertyIds: hidedPropertyIds,
    };

    return response;
  }
}
