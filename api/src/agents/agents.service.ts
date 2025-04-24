import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AgentsRepository } from 'src/agents/agents.repository';
import {
  CreateSuggestionRequest,
  GetSuggestionDetailsByIdsRequest,
  UpdateSuggestionByIdRequest,
} from 'src/__generated__/supabase.interface';
import { FramesService } from 'src/frames/frames.service';
import { v4 as uuidv4 } from 'uuid';
import { TopicsService } from 'src/topics/topics.service';
import { Json } from 'src/__generated__/schema';
import { GetFrameDetailsByIdsModel } from 'src/frames/entities/frame.entity';
import {
  NewTopicContextId,
  TopicDetail,
} from 'src/topics/entities/topic.entity';
import { promiseAll } from 'helpers/utills';

@Injectable()
export class AgentsService {
  constructor(
    private readonly agentsRepository: AgentsRepository,
    private readonly framesService: FramesService,
    private readonly topicsService: TopicsService,
  ) {}

  async updateSuggestionById({
    suggestionId,
    state,
    judgedBy,
    judgedAt,
    reaction,
    comment,
  }: {
    suggestionId: string;
    state: string;
    judgedBy: string;
    judgedAt: string;
    reaction: string;
    comment: string;
  }): Promise<{
    suggestionId: string;
  }> {
    try {
      const request: UpdateSuggestionByIdRequest = {
        p_id: suggestionId,
        p_state: state,
        p_judged_by: judgedBy,
        p_judged_at: judgedAt,
        p_reaction: reaction,
        p_comment: comment,
      };
      const result = await this.agentsRepository.updateSuggestionById(request);
      return { suggestionId: result };
    } catch (error) {
      console.error('Error updating suggestion:', error);
      throw new HttpException(
        { error: 'failed to update suggestion' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSuggestionDetailsByIds({
    suggestionIds,
  }: {
    suggestionIds: string[];
  }): Promise<
    {
      id: string;
      type: string;
      title: string;
      accuracy: number;
      createdBy: string;
      createdAt: string;
      state: 'approved' | 'disapproved' | null;
      judgedBy: string;
      judgedAt: string;
      reaction: string;
      comment: string;
    }[]
  > {
    try {
      const request: GetSuggestionDetailsByIdsRequest = {
        p_suggestion_ids: suggestionIds,
      };
      const result =
        await this.agentsRepository.getSuggestionDetailsByIds(request);
      const response = result.map((suggestion) => ({
        id: suggestion.id,
        type: suggestion.type,
        title: suggestion.title,
        accuracy: suggestion.accuracy,
        createdBy: suggestion.created_by,
        createdAt: suggestion.created_at,
        state: suggestion.state as 'approved' | 'disapproved' | null,
        judgedBy: suggestion.judged_by,
        judgedAt: suggestion.judged_at,
        reaction: suggestion.reaction,
        comment: suggestion.comment,
      }));
      return response;
    } catch (error) {
      console.error('Error fetching suggestion details:', error);
      throw new HttpException(
        { error: 'failed to fetch suggestion details' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCommentSuggestion({
    id,
    type,
    requestType,
    title,
    accuracy,
    state,
    judgedBy,
    judgedAt,
    reaction,
    comment,
    agentId,
    projectId,
    activityId,
    topicId,
    data,
  }: {
    id?: string;
    type: string;
    requestType: string;
    title: string;
    accuracy: number;
    state?: string;
    judgedBy?: string;
    judgedAt?: string;
    reaction?: string;
    comment?: string;
    projectId: string;
    activityId?: string;
    topicId: string;
    agentId: string;
    data: JSON;
  }): Promise<{
    activityId: string;
    suggestionId: string;
  }> {
    // create new suggestion
    let suggestionId: string;
    try {
      const request: CreateSuggestionRequest = {
        p_id: id ?? uuidv4(), // idがundefinedの場合は新しいUUIDを生成
        p_type: type,
        p_title: title,
        p_accuracy: accuracy,
        p_created_by: agentId,
        p_state: state,
        p_judged_by: judgedBy,
        p_judged_at: judgedAt,
        p_reaction: reaction,
        p_comment: comment,
      };
      const result = await this.agentsRepository.updateSuggestionById(
        request as UpdateSuggestionByIdRequest,
      );
      suggestionId = result;
    } catch (error) {
      console.error('Error creating suggestion:', error);
      throw new HttpException(
        { error: `failed to create suggestion: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    let newTopicActivityId;

    if (requestType === 'comment') {
      // create new topic activity
      try {
        const createNewTopicActivityResult =
          await this.topicsService.postNewTopicCommentActivity({
            topicId: topicId,
            suggestionId: suggestionId,
            newComment: {
              postedBy: agentId,
              comment: data as unknown as Json,
            },
          });
        newTopicActivityId = createNewTopicActivityResult.activityId;
      } catch (error) {
        console.error('Error creating topic activity:', error);
        throw new HttpException(
          { error: `failed to create topic activity: ${error}` },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else if (requestType === 'reply') {
      // Create new topic reply activity
      try {
        const createNewTopicActivityResult =
          await this.topicsService.postNewTopicReply({
            topicId: topicId,
            newReply: {
              postedBy: agentId,
              comment: data as unknown as Json,
              parentId: activityId,
            },
          });
        newTopicActivityId = '';
      } catch (error) {
        console.error('Error creating topic reply activity:', error);
        throw new HttpException(
          { error: `failed to create topic reply activity: ${error}` },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      console.error('Invalid request type:', requestType);
      throw new HttpException(
        { error: 'Invalid request type' },
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log('created activity by suggestion:', newTopicActivityId);

    return {
      activityId: newTopicActivityId,
      suggestionId: suggestionId,
    };
  }

  async createTopicSuggestion({
    id,
    type,
    title,
    accuracy,
    state,
    judgedBy,
    judgedAt,
    reaction,
    comment,
    agentId,
    projectId,
    data,
  }: {
    id: string;
    type: string;
    title: string;
    accuracy: number;
    state?: string;
    judgedBy?: string;
    judgedAt?: string;
    reaction?: string;
    comment?: string;
    projectId: string;
    agentId: string;
    data: {
      id?: string;
      frame_id: string;
      title: string;
      state: string;
      assignee: string;
      reviewer: string;
      participants: string[];
      tags: {
        name: string;
        color: string;
      }[];
      properties: {
        name: string;
        content: JSON;
      }[];
      document: JSON;
      contexts: {
        id?: string;
        name: string;
        description: string;
        type: string;
        opponent_topic_id: string;
      }[];
    };
  }): Promise<{
    topicId: string;
    suggestionId: string;
  }> {
    // create new suggestion
    let suggestionId: string;
    try {
      const request: CreateSuggestionRequest = {
        p_id: id,
        p_type: type,
        p_title: title,
        p_accuracy: accuracy,
        p_created_by: agentId,
        p_state: state,
        p_judged_by: judgedBy,
        p_judged_at: judgedAt,
        p_reaction: reaction,
        p_comment: comment,
      };
      const result = await this.agentsRepository.create_new_suggestion(request);
      suggestionId = result;
    } catch (error) {
      console.error('Error creating suggestion:', error);
      throw new HttpException(
        { error: `failed to create suggestion: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // create new topic
    let newTopicId: string;
    try {
      const createNewTopicResult = await this.topicsService.createNewTopic({
        // id: data.id,
        suggestionId: suggestionId,
        projectId,
        frameId: data.frame_id,
        title: data.title,
        state: data.state,
        createdBy: { id: agentId, email: '' },
        createdAt: Math.floor(Date.now() / 1000),
        assignee: {
          id: data.assignee,
          email: '',
        },
        reviewer: {
          id: data.reviewer,
          email: '',
        },
        participants: data.participants.map((p) => ({ id: p, email: '' })),
        tags: data.tags,
        document: data.document ?? JSON.parse('{}'),
      });
      newTopicId = createNewTopicResult.topicId;
    } catch (error) {
      console.error('Error creating topic:', error);
      throw new HttpException(
        { error: `failed to create topic: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // framedetailを取得
    let frameDetails: GetFrameDetailsByIdsModel;
    try {
      frameDetails = await this.framesService.getFrameDetailsByIds({
        frameIds: [data.frame_id],
      });
    } catch (error) {
      console.error('Error fetching frame details:', error);
      throw new HttpException(
        { error: `failed to fetch frame details: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const frameDetail = frameDetails[0];

    // topicDetailを取得
    let topicDetail: TopicDetail;
    try {
      const topicDetailResult = await this.topicsService.getTopicDetailsByIds({
        topicIds: [newTopicId],
      });
      topicDetail = topicDetailResult[0];
    } catch (error) {
      console.error('Error fetching topic details:', error);
      throw new HttpException(
        { error: `failed to fetch topic details: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // create new properties
    try {
      const updateTopicPropertiesResult =
        await this.topicsService.updateTopicProperties({
          topicId: newTopicId,
          properties: data.properties.map((p) => ({
            id:
              topicDetail.properties.find((prop) => prop.name === p.name)?.id ??
              uuidv4(),
            name: p.name,
            type:
              frameDetail.properties.find((prop) => prop.name === p.name)
                ?.type ?? 'text',
            content: p.content,
            framePropertyId:
              frameDetail.properties.find((prop) => prop.name === p.name)?.id ??
              uuidv4(),
          })),
          creatorId: agentId,
        });
    } catch (error) {
      console.error('Error creating properties:', error);
      throw new HttpException(
        { error: `failed to create properties: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // create new contexts
    try {
      const contextPromises: Promise<NewTopicContextId>[] = [];
      data.contexts.forEach((context) => {
        contextPromises.push(
          this.topicsService.createNewTopicContext({
            topicContextId: context.id ?? uuidv4(),
            topicId: newTopicId,
            name: context.name,
            description: context.description,
            type: context.type,
            opponentTopicId: context.opponent_topic_id,
            updaterId: agentId,
            suggestionId: suggestionId,
          }),
        );
      });
      const createNewContextResults = await promiseAll(contextPromises);
    } catch (error) {
      console.error('Error creating contexts:', error);
      throw new HttpException(
        { error: `failed to create contexts: ${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    console.log('created topic by suggestion:', newTopicId);

    return {
      topicId: newTopicId,
      suggestionId: suggestionId,
    };
  }
}
