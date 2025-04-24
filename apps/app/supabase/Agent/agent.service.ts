import { Json } from "~/supabase/__generated__/schema";
import {
  CreateSuggestionRequest,
  GetSuggestionDetailsByIdsRequest,
  UpdateSuggestionByIdRequest,
} from "~/supabase/__generated__/supabase.interface";
import { AgentRepository } from "~/supabase/Agent/agent.repository";
import { SupabaseServerClient } from "~/supabase/supabase.server";
import { TopicsService } from "~/supabase/Topics/topics.service";
import { v4 as uuidv4 } from "uuid";
import { FrameService } from "~/supabase/Frame/frame.service";
import { NewTopicContextId } from "~/supabase/Topics/topics.model";

export class AgentService {
  constructor(supabase: SupabaseServerClient) {
    this.repository = new AgentRepository(supabase);
    this.topicsService = new TopicsService(supabase);
    this.frameService = new FrameService(supabase);
  }
  private repository: AgentRepository;
  private topicsService: TopicsService;
  private frameService: FrameService;

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
    response?: {
      suggestionId: string;
    };
    error?: string;
  }> {
    const request: UpdateSuggestionByIdRequest = {
      p_id: suggestionId,
      p_state: state,
      p_judged_by: judgedBy,
      p_judged_at: judgedAt,
      p_reaction: reaction,
      p_comment: comment,
    };
    const result = await this.repository.updateSuggestionById(request);
    if (!result.response || result.error) {
      console.error("Error updating suggestion:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    return { response: { suggestionId: result.response } };
  }

  async getSuggestionDetailsByIds({
    suggestionIds,
  }: {
    suggestionIds: string[];
  }): Promise<{
    response?: {
      id: string;
      type: string;
      title: string;
      accuracy: number;
      createdBy: string;
      createdAt: string;
      state: "approved" | "disapproved" | null;
      judgedBy: string;
      judgedAt: string;
      reaction: string;
      comment: string;
    }[];
    error?: string;
  }> {
    const request: GetSuggestionDetailsByIdsRequest = {
      p_suggestion_ids: suggestionIds,
    };
    const result = await this.repository.getSuggestionDetailsByIds(request);
    if (!result.response || result.error) {
      console.error("Error fetching suggestion details:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const response = result.response.map((suggestion) => ({
      id: suggestion.id,
      type: suggestion.type,
      title: suggestion.title,
      accuracy: suggestion.accuracy,
      createdBy: suggestion.created_by,
      createdAt: suggestion.created_at,
      state: suggestion.state as "approved" | "disapproved" | null,
      judgedBy: suggestion.judged_by,
      judgedAt: suggestion.judged_at,
      reaction: suggestion.reaction,
      comment: suggestion.comment,
    }));
    return { response: response };
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
    response?: {
      activityId: string;
      suggestionId: string;
    };
    error?: string;
  }> {
    // create new suggestion
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
    const result = await this.repository.updateSuggestionById(
      request as UpdateSuggestionByIdRequest
    ); // 型を強制的に変換
    if (!result.response || result.error) {
      console.error("Error creating suggestion:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const suggestionId = result.response;
    let createNewTopicActivityResult;
    let newTopicActivityId;

    if (requestType === "comment") {
      // create new topic activity
      createNewTopicActivityResult =
        await this.topicsService.postNewTopicCommentActivity({
          topicId: topicId,
          suggestionId: suggestionId,
          newComment: {
            postedBy: agentId,
            comment: data as unknown as Json,
          },
        });
      if (
        createNewTopicActivityResult.error ||
        !createNewTopicActivityResult.data
      ) {
        console.error(
          "Error creating topic activity:",
          createNewTopicActivityResult.error
        );
        return { error: createNewTopicActivityResult.error ?? "unknown error" };
      }
      newTopicActivityId = createNewTopicActivityResult.data.activityId;
    } else if (requestType === "reply") {
      // Create new topic reply activity
      createNewTopicActivityResult = await this.topicsService.postNewTopicReply(
        {
          topicId: topicId,
          newReply: {
            postedBy: agentId,
            comment: data as unknown as Json,
            parentId: activityId,
          },
        }
      );
      newTopicActivityId = "";
    } else {
      console.error("Invalid request type:", requestType);
      return { error: "invalid request type" };
    }

    console.log("created activity by suggestion:", newTopicActivityId);

    return {
      response: {
        activityId: newTopicActivityId,
        suggestionId: suggestionId,
      },
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
    response?: {
      topicId: string;
      suggestionId: string;
    };
    error?: string;
  }> {
    // create new suggestion
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
    const result = await this.repository.create_new_suggestion(request);
    if (!result.response || result.error) {
      console.error("Error creating suggestion:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const suggestionId = result.response;

    // create new topic
    const createNewTopicResult = await this.topicsService.createNewTopic({
      // id: data.id,
      suggestionId: suggestionId,
      projectId,
      frameId: data.frame_id,
      title: data.title,
      state: data.state,
      createdBy: { id: agentId, email: "" },
      createdAt: Math.floor(Date.now() / 1000),
      assignee: {
        id: data.assignee,
        email: "",
      },
      reviewer: {
        id: data.reviewer,
        email: "",
      },
      participants: data.participants.map((p) => ({ id: p, email: "" })),
      tags: data.tags,
      document: data.document ?? JSON.parse("{}"),
    });
    if (createNewTopicResult.error || !createNewTopicResult.response?.topicId) {
      console.error("Error creating topic:", createNewTopicResult.error);
      return { error: createNewTopicResult.error ?? "unknown error" };
    }

    const newTopicId = createNewTopicResult.response?.topicId;

    // framedetailを取得
    const frameDetailResult = await this.frameService.getFrameDetailsByIds({
      frameIds: [data.frame_id],
    });
    if (!frameDetailResult.response || frameDetailResult.error) {
      console.error("Error fetching frame details:", frameDetailResult.error);
      return { error: frameDetailResult.error ?? "unknown error" };
    }
    const frameDetail = frameDetailResult.response[0];

    // topicDetailを取得
    const topicDetailResult = await this.topicsService.getTopicDetailsByIds({
      topicIds: [newTopicId],
    });
    if (!topicDetailResult.response || topicDetailResult.error) {
      console.error("Error fetching topic details:", topicDetailResult.error);
      return { error: topicDetailResult.error ?? "unknown error" };
    }
    const topicDetail = topicDetailResult.response[0];

    // create new properties
    const updateTopicPropertiesResult =
      await this.topicsService.updateTopicProperties({
        topicId: newTopicId,
        properties: data.properties.map((p) => ({
          id:
            topicDetail.properties.find((prop) => prop.name === p.name)?.id ??
            uuidv4(),
          name: p.name,
          type:
            frameDetail.properties.find((prop) => prop.name === p.name)?.type ??
            "text",
          content: p.content,
          framePropertyId:
            frameDetail.properties.find((prop) => prop.name === p.name)?.id ??
            uuidv4(),
        })),
        creatorId: agentId,
      });
    if (updateTopicPropertiesResult.error) {
      console.error(
        "Error updating properties:",
        updateTopicPropertiesResult.error
      );
      return { error: updateTopicPropertiesResult.error ?? "unknown error" };
    }

    // create new contexts
    const contextPromises: Promise<{
      data?: NewTopicContextId;
      error?: string;
    }>[] = [];
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
        })
      );
    });
    const createNewContextResults = await Promise.all(contextPromises);
    if (createNewContextResults.some((result) => result.error)) {
      console.error(
        "Error creating contexts:",
        createNewContextResults.map((result) => result.error).join(", ")
      );
      return {
        error: createNewContextResults.map((result) => result.error).join(", "),
      };
    }

    console.log("created topic by suggestion:", newTopicId);

    return {
      response: {
        topicId: newTopicId,
        suggestionId: suggestionId,
      },
    };
  }
}
