import { FrameRepository } from "~/supabase/Frame/frame.repository";
import { SupabaseServerClient } from "~/supabase/supabase.server";
import { UserService } from "~/supabase/User/user.service";
import type {
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
} from "~/supabase/__generated__/supabase.interface.d.ts";
import type {
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
} from "~/supabase/Frame/frame.model";
import { Json } from "~/supabase/__generated__/schema";

export class FrameService {
  constructor(supabase: SupabaseServerClient) {
    this.repository = new FrameRepository(supabase);
    this.userService = new UserService(supabase);
  }
  private repository: FrameRepository;
  private userService: UserService;

  /** カテゴリIDでテンプレートを非表示にするメソッド
   * @param templateId テンプレートID
   * @returns 非表示にしたテンプレートのID
   */
  async hideFrameTemplateById({ templateId }: { templateId: string }): Promise<{
    response?: HideFrameTemplateByIdModel;
    error?: string;
  }> {
    const request: HideFrameTemplateByIdRequest = {
      p_template_id: templateId,
    };
    const result = await this.repository.hideFrameTemplateById(request);
    // 追加のビジネスロジックをここに記述可能
    if (!result.response) {
      console.error("hideTemplateById failed", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const response: HideFrameTemplateByIdModel = result.response;
    return {
      response: response,
    };
  }

  /** カテゴリIDでカテゴリを非表示にするメソッド
   * @param frameId カテゴリID
   * @returns 非表示にしたカテゴリのID
   */
  async hideFrameById({ frameId }: { frameId: string }): Promise<{
    response?: HideFrameByIdModel;
    error?: string;
  }> {
    const request: HideFrameByIdRequest = {
      p_frame_id: frameId,
    };
    const result = await this.repository.hideFrameById(request);
    // 追加のビジネスロジックをここに記述可能
    if (!result.response) {
      console.error("hideFrameById failed", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const response: HideFrameByIdModel = result.response;
    return {
      response: response,
    };
  }

  /** 新しいカテゴリアクティビティを投稿するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async postNewFrameCommentActivity({
    frameId,
    newComment,
  }: {
    frameId: string;
    newComment: Json;
  }): Promise<{
    response?: PostNewFrameCommentActivityModel;
    error?: string;
  }> {
    const request: PostNewFrameCommentActivityRequest = {
      p_frame_id: frameId,
      p_new_comment: newComment,
    };
    const result = await this.repository.postNewFrameCommentActivity(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error posting new frame activity:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: PostNewFrameCommentActivityModel = result.response!;
    return {
      response: response,
    };
  }

  /** カテゴリアクティビティを更新するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async updateFrameCommentActivityById({
    activityId,
    content,
  }: {
    activityId: string;
    content: Json;
  }): Promise<{
    response?: UpdateFrameCommentActivityByIdModel;
    error?: string;
  }> {
    const request: UpdateFrameCommentActivityByIdRequest = {
      p_activity_id: activityId,
      p_new_content: content,
    };
    const result = await this.repository.updateFrameCommentActivityById(
      request
    );
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error updating frame activity:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: UpdateFrameCommentActivityByIdModel = result.response!;
    return {
      response: response,
    };
  }

  /** カテゴリアクティビティを非表示にするメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async hideFrameActivityWithRepliesById({
    activityId,
  }: {
    activityId: string;
  }): Promise<{
    response?: HideFrameActivityWithRepliesByIdModel;
    error?: string;
  }> {
    const request: HideFrameActivityWithRepliesByIdRequest = {
      p_activity_id: activityId,
    };
    const result = await this.repository.hideFrameActivityWithRepliesById(
      request
    );
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error hiding frame activity:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: HideFrameActivityWithRepliesByIdModel = result.response!;
    return {
      response: response,
    };
  }

  /** 新しいカテゴリリプライを投稿するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async postNewFrameReply({
    frameId,
    newReply,
  }: {
    frameId: string;
    newReply: Json;
  }): Promise<{
    response?: PostNewFrameReplyModel;
    error?: string;
  }> {
    const request: PostNewFrameReplyRequest = {
      p_frame_id: frameId,
      p_new_reply: newReply,
    };
    const result = await this.repository.postNewFrameReply(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error posting new frame reply:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: PostNewFrameReplyModel = result.response!;
    return {
      response: response,
    };
  }

  /** カテゴリリプライを更新するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async updateFrameReplyById({
    replyId,
    content,
  }: {
    replyId: string;
    content: Json;
  }): Promise<{
    response?: UpdateFrameReplyByIdModel;
    error?: string;
  }> {
    const request: UpdateFrameReplyByIdRequest = {
      p_reply_id: replyId,
      p_new_content: content,
    };
    const result = await this.repository.updateFrameReplyById(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error updating frame reply:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: UpdateFrameReplyByIdModel = result.response!;
    return {
      response: response,
    };
  }

  /** カテゴリリプライを非表示にするメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
  async hideFrameReplyById({ replyId }: { replyId: string }): Promise<{
    response?: HideFrameReplyByIdModel;
    error?: string;
  }> {
    const request: HideFrameReplyByIdRequest = {
      p_reply_id: replyId,
    };
    const result = await this.repository.hideFrameReplyById(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error hiding frame reply:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: HideFrameReplyByIdModel = result.response!;
    return {
      response: response,
    };
  }

  /** 新しいカテゴリを作成するメソッド
   * @param context トピックコンテキスト
   * @returns トピックコンテキストID
   */
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
  }): Promise<{
    response?: CreateNewFrameModel;
    error?: string;
  }> {
    // Frame 作成
    const createNewFrameRequest: CreateNewFrameRequest = {
      p_frame_id: id,
      p_name: name,
      p_description: description ?? "",
      p_icon: icon ?? "",
      p_project_id: projectId,
      p_creator_id: creatorId,
    };
    const createNewFrameResult = await this.repository.createNewFrame(
      createNewFrameRequest
    );
    if (!createNewFrameResult.response || createNewFrameResult.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error creating new frame:", createNewFrameResult.error);
      return { error: createNewFrameResult.error ?? "unknown error" };
    }

    // Frame Properties 作成
    if (!properties) {
      const response: CreateNewFrameModel = {
        newFrameId: createNewFrameResult.response!,
      };
      return {
        response: response,
      };
    }
    const createNewFramePropertiesRequest: CreateNewFramePropertiesRequest = {
      p_frame_id: createNewFrameResult.response,
      p_properties: properties,
      p_creator_id: creatorId,
    };
    const createNewFramePropertiesResult =
      await this.repository.createNewFrameProperties(
        createNewFramePropertiesRequest
      );

    if (
      !createNewFramePropertiesResult.response &&
      createNewFramePropertiesResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error creating new frame properties:",
        createNewFramePropertiesResult.error
      );
      return {
        error: createNewFramePropertiesResult.error ?? "unknown error",
      };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: CreateNewFrameModel = {
      newFrameId: createNewFrameResult.response!,
    };
    return {
      response: response,
    };
  }

  /** プロジェクトIDでカテゴリを取得するメソッド
   * @param projectId プロジェクトID
   * @returns カテゴリリスト
   */
  async getFramesByProjectId({ projectId }: { projectId: string }): Promise<{
    response?: GetFramesByProjectIdModel;
    error?: string;
  }> {
    // project id から frame id を取得
    const getFrameIdsByProjectIdRequest: GetFrameIdsByProjectIdRequest = {
      p_project_id: projectId,
    };
    const getFrameIdsByProjectIdResult =
      await this.repository.getFrameIdsByProjectId(
        getFrameIdsByProjectIdRequest
      );
    if (
      !getFrameIdsByProjectIdResult.response &&
      getFrameIdsByProjectIdResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting frames by project id:",
        getFrameIdsByProjectIdResult.error
      );
      return { error: getFrameIdsByProjectIdResult.error ?? "unknown error" };
    }

    // frame id から frame 詳細を取得
    const getFrameDetailsByIdsRequest: GetFrameDetailsByIdsRequest = {
      p_frame_ids: getFrameIdsByProjectIdResult.response!.map(
        (frame) => frame.frame_id
      ),
    };
    const getFrameDetailsByIdsResult =
      await this.repository.getFrameDetailsByIds(getFrameDetailsByIdsRequest);
    if (
      !getFrameDetailsByIdsResult.response &&
      getFrameDetailsByIdsResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting frame details by projectids:",
        getFrameDetailsByIdsResult.error
      );
      return { error: getFrameDetailsByIdsResult.error ?? "unknown error" };
    }

    // creator id から user info を取得
    const creatorIds = getFrameDetailsByIdsResult.response!.map(
      (frame) => frame.creator_id
    );
    const creatorIdsSet = new Set(creatorIds);
    const creatorIdsArray = Array.from(creatorIdsSet);
    const creatorIdsRequest = {
      userIds: creatorIdsArray,
    };
    const creatorIdsResult = await this.userService.getUserInfosByIds(
      creatorIdsRequest
    );
    if (!creatorIdsResult.response && creatorIdsResult.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error getting user info by ids:", creatorIdsResult.error);
      return { error: creatorIdsResult.error ?? "unknown error" };
    }

    // frame id から frame properties を取得
    const getFramePropertiesByIdsRequest: GetFramePropertiesByIdsRequest = {
      // flatMap で property_ids を取得
      p_property_ids: getFrameDetailsByIdsResult.response!.flatMap(
        (frame) => frame.property_ids
      ),
    };
    const getFramePropertiesByIdsResult =
      await this.repository.getFramePropertiesByIds(
        getFramePropertiesByIdsRequest
      );
    if (
      !getFramePropertiesByIdsResult.response &&
      getFramePropertiesByIdsResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting frame properties by ids:",
        getFramePropertiesByIdsResult.error
      );
      return { error: getFramePropertiesByIdsResult.error ?? "unknown error" };
    }

    // frame id から frame templates を取得
    const getTemplatesByIdsRequest: GetTemplatesByIdsRequest = {
      // flatMap で template_ids を取得
      p_template_ids: getFrameDetailsByIdsResult.response!.flatMap(
        (frame) => frame.template_ids
      ),
    };
    const getTemplatesByIdsResult = await this.repository.getTemplatesByIds(
      getTemplatesByIdsRequest
    );
    if (!getTemplatesByIdsResult.response && getTemplatesByIdsResult.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting templates by ids:",
        getTemplatesByIdsResult.error
      );
      return { error: getTemplatesByIdsResult.error ?? "unknown error" };
    }

    // flatMap で得た情報をframeごとにまとめる
    const response: GetFramesByProjectIdModel =
      getFrameDetailsByIdsResult.response!.map((frame) => {
        return {
          id: frame.frame_id,
          name: frame.name,
          description: frame.description,
          createdAt: frame.created_at,
          createdBy: creatorIdsResult.response!.find(
            (user) => user.id === frame.creator_id
          )!,
          properties: getFramePropertiesByIdsResult
            .response!.filter((property) =>
              frame.property_ids.includes(property.id)
            )
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
          templates: getTemplatesByIdsResult
            .response!.filter((template) =>
              frame.template_ids.includes(template.id)
            )
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
    return {
      response: response,
    };
  }

  /** プロジェクトIDでカテゴリを検索するメソッド
   * @param projectId プロジェクトID
   * @returns カテゴリリスト
   */
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
  }): Promise<{
    response?: SearchFramesByProjectIdModel;
    error?: string;
  }> {
    const searchFrameIdsRequest: SearchFrameIdsRequest = {
      p_project_id: projectId,
      p_search: search,
      p_sort: sort,
      p_page_size: pageSize,
      p_page: page,
    };
    const searchFrameIdsResult = await this.repository.searchFrameIds(
      searchFrameIdsRequest
    );
    if (!searchFrameIdsResult.response && searchFrameIdsResult.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error searching frames by project id:",
        searchFrameIdsResult.error
      );
      return { error: searchFrameIdsResult.error ?? "unknown error" };
    }

    // frame id から frame 詳細を取得
    const getFrameDetailsByIdsRequest: GetFrameDetailsByIdsRequest = {
      p_frame_ids: searchFrameIdsResult.response!.map(
        (frame) => frame.frame_id
      ),
    };
    const getFrameDetailsByIdsResult =
      await this.repository.getFrameDetailsByIds(getFrameDetailsByIdsRequest);
    if (
      !getFrameDetailsByIdsResult.response &&
      getFrameDetailsByIdsResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error search frame details by ids:",
        getFrameDetailsByIdsResult.error
      );
      return { error: getFrameDetailsByIdsResult.error ?? "unknown error" };
    }

    // frame id から frame properties を取得
    const getFramePropertiesByIdsRequest: GetFramePropertiesByIdsRequest = {
      // flatMap で property_ids を取得
      p_property_ids: getFrameDetailsByIdsResult.response!.flatMap(
        (frame) => frame.property_ids
      ),
    };
    const getFramePropertiesByIdsResult =
      await this.repository.getFramePropertiesByIds(
        getFramePropertiesByIdsRequest
      );
    if (
      !getFramePropertiesByIdsResult.response &&
      getFramePropertiesByIdsResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting frame properties by ids:",
        getFramePropertiesByIdsResult.error
      );
      return { error: getFramePropertiesByIdsResult.error ?? "unknown error" };
    }

    // frame id から frame templates を取得
    const getTemplatesByIdsRequest: GetTemplatesByIdsRequest = {
      // flatMap で template_ids を取得
      p_template_ids: getFrameDetailsByIdsResult.response!.flatMap(
        (frame) => frame.template_ids
      ),
    };
    const getTemplatesByIdsResult = await this.repository.getTemplatesByIds(
      getTemplatesByIdsRequest
    );
    if (!getTemplatesByIdsResult.response && getTemplatesByIdsResult.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting templates by ids:",
        getTemplatesByIdsResult.error
      );
      return { error: getTemplatesByIdsResult.error ?? "unknown error" };
    }

    // user id から user info を取得
    const creatorIds = getFrameDetailsByIdsResult.response!.map(
      (frame) => frame.creator_id
    );
    const creatorIdsSet = new Set(creatorIds);
    const creatorIdsArray = Array.from(creatorIdsSet);
    const creatorIdsRequest = {
      userIds: creatorIdsArray,
    };
    const creatorIdsResult = await this.userService.getUserInfosByIds(
      creatorIdsRequest
    );
    if (!creatorIdsResult.response && creatorIdsResult.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error getting user info by ids:", creatorIdsResult.error);
      return { error: creatorIdsResult.error ?? "unknown error" };
    }

    // flatMap で得た情報をframeごとにまとめる
    const response: SearchFramesByProjectIdModel =
      getFrameDetailsByIdsResult.response!.map((frame) => {
        return {
          id: frame.frame_id,
          name: frame.name,
          description: frame.description,
          createdBy: {
            id: frame.creator_id,
            name:
              creatorIdsResult.response!.find(
                (user) => user.id === frame.creator_id
              )?.name ?? "",
            email:
              creatorIdsResult.response!.find(
                (user) => user.id === frame.creator_id
              )?.email ?? "",
            avatarUrl:
              creatorIdsResult.response!.find(
                (user) => user.id === frame.creator_id
              )?.avatarUrl ?? "",
          },
          properties: getFramePropertiesByIdsResult
            .response!.filter((property) =>
              frame.property_ids.includes(property.id)
            )
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
          templates: getTemplatesByIdsResult
            .response!.filter((template) =>
              frame.template_ids.includes(template.id)
            )
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
    return {
      response: response,
    };
  }

  /** カテゴリIDでカテゴリを取得するメソッド
   * @param frameId カテゴリID
   * @returns カテゴリ
   */
  async getFrameDetailsByIds({ frameIds }: { frameIds: string[] }): Promise<{
    response?: GetFrameDetailsByIdsModel;
    error?: string;
  }> {
    const getFrameDetailsByIdsRequest: GetFrameDetailsByIdsRequest = {
      p_frame_ids: frameIds,
    };
    const getFrameDetailsByIdsResult =
      await this.repository.getFrameDetailsByIds(getFrameDetailsByIdsRequest);
    if (
      !getFrameDetailsByIdsResult.response &&
      getFrameDetailsByIdsResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting frame details by ids:",
        getFrameDetailsByIdsResult.error
      );
      return { error: getFrameDetailsByIdsResult.error ?? "unknown error" };
    }

    // creator id から user info を取得
    const creatorIds = getFrameDetailsByIdsResult.response!.map(
      (frame) => frame.creator_id
    );
    const creatorIdsSet = new Set(creatorIds);
    const creatorIdsArray = Array.from(creatorIdsSet);
    const creatorIdsRequest = {
      userIds: creatorIdsArray,
    };
    const creatorIdsResult = await this.userService.getUserInfosByIds(
      creatorIdsRequest
    );
    if (!creatorIdsResult.response && creatorIdsResult.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error getting user info by ids:", creatorIdsResult.error);
      return { error: creatorIdsResult.error ?? "unknown error" };
    }

    // frame id から frame properties を取得
    const getFramePropertiesByIdsRequest: GetFramePropertiesByIdsRequest = {
      // flatMap で property_ids を取得
      p_property_ids: getFrameDetailsByIdsResult.response!.flatMap(
        (frame) => frame.property_ids
      ),
    };
    const getFramePropertiesByIdsResult =
      await this.repository.getFramePropertiesByIds(
        getFramePropertiesByIdsRequest
      );
    if (
      !getFramePropertiesByIdsResult.response &&
      getFramePropertiesByIdsResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting frame properties by ids:",
        getFramePropertiesByIdsResult.error
      );
      return { error: getFramePropertiesByIdsResult.error ?? "unknown error" };
    }

    // frame id から frame templates を取得
    const getTemplatesByIdsRequest: GetTemplatesByIdsRequest = {
      // flatMap で template_ids を取得
      p_template_ids: getFrameDetailsByIdsResult.response!.flatMap(
        (frame) => frame.template_ids
      ),
    };
    const getTemplatesByIdsResult = await this.repository.getTemplatesByIds(
      getTemplatesByIdsRequest
    );
    if (!getTemplatesByIdsResult.response && getTemplatesByIdsResult.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting templates by ids:",
        getTemplatesByIdsResult.error
      );
      return { error: getTemplatesByIdsResult.error ?? "unknown error" };
    }

    // frame id から frame topics を取得
    const getFrameTopicsByIdsRequest: GetFrameTopicsByIdsRequest = {
      // flatMap で topic_ids を取得
      p_topic_ids: getFrameDetailsByIdsResult.response!.flatMap(
        (frame) => frame.topic_ids
      ),
    };
    const getFrameTopicsByIdsResult = await this.repository.getFrameTopicsByIds(
      getFrameTopicsByIdsRequest
    );
    if (
      !getFrameTopicsByIdsResult.response &&
      getFrameTopicsByIdsResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting topics by ids:",
        getFrameTopicsByIdsResult.error
      );
      return { error: getFrameTopicsByIdsResult.error ?? "unknown error" };
    }

    // frame id から frame activities を取得
    const getFrameActivitiesByIdsRequest: GetFrameActivitiesByIdsRequest = {
      // flatMap で activity_ids を取得
      p_activity_ids: getFrameDetailsByIdsResult.response!.flatMap(
        (frame) => frame.activity_ids
      ),
    };
    const getFrameActivitiesByIdsResult =
      await this.repository.getFrameActivitiesByIds(
        getFrameActivitiesByIdsRequest
      );
    if (
      !getFrameActivitiesByIdsResult.response &&
      getFrameActivitiesByIdsResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting activities by ids:",
        getFrameActivitiesByIdsResult.error
      );
      return { error: getFrameActivitiesByIdsResult.error ?? "unknown error" };
    }

    // frame id から frame replies を取得
    const getFrameRepliesByIdsRequest: GetFrameRepliesByIdsRequest = {
      // flatMap で reply_ids を取得
      p_reply_ids: getFrameActivitiesByIdsResult.response!.flatMap(
        (activity) => activity.reply_ids
      ),
    };
    const getFrameRepliesByIdsResult =
      await this.repository.getFrameRepliesByIds(getFrameRepliesByIdsRequest);
    if (
      !getFrameRepliesByIdsResult.response &&
      getFrameRepliesByIdsResult.error
    ) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error(
        "Error getting replies by ids:",
        getFrameRepliesByIdsResult.error
      );
      return { error: getFrameRepliesByIdsResult.error ?? "unknown error" };
    }

    // flatMap で得た reply を activity ごとにまとめる
    const activitiesWithReplies = getFrameActivitiesByIdsResult.response!.map(
      (activity) => {
        return {
          id: activity.id,
          icon: activity.icon,
          type: activity.type,
          posted_by: activity.posted_by,
          posted_at: activity.posted_at,
          content_json: activity.content_json,
          replies: getFrameRepliesByIdsResult
            .response!.filter((reply) => activity.reply_ids.includes(reply.id))
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
      }
    );

    // flatMap で得た情報をframeごとにまとめる
    const response: GetFrameDetailsByIdsModel =
      getFrameDetailsByIdsResult.response!.map((frame) => {
        return {
          id: frame.frame_id,
          name: frame.name,
          description: frame.description,
          createdBy: creatorIdsResult.response!.find(
            (user) => user.id === frame.creator_id
          )!,
          createdAt: frame.created_at,
          properties: getFramePropertiesByIdsResult
            .response!.filter((property) =>
              frame.property_ids.includes(property.id)
            )
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
          templates: getTemplatesByIdsResult
            .response!.filter((template) =>
              frame.template_ids.includes(template.id)
            )
            .map((template) => {
              return {
                id: template.id,
                name: template.name,
                contentJson: template.content_json,
                creatorId: template.creator_id,
                createdAt: template.created_at,
              };
            }),
          topics: getFrameTopicsByIdsResult.response!.filter((topic) =>
            frame.topic_ids.includes(topic.id)
          ),
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

    return {
      response: response,
    };
  }

  /** 新しいテンプレートを作成するメソッド
   * @param frameId カテゴリID
   * @param name テンプレート名
   * @param description テンプレート説明
   * @param icon テンプレートアイコン
   * @returns テンプレートID
   */
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
  }): Promise<{
    response?: CreateNewTemplateModel;
    error?: string;
  }> {
    const request: CreateNewTemplateRequest = {
      p_frame_id: frameId,
      p_name: name,
      p_content_json: contentJson,
      p_creator_id: creatorId,
    };
    const result = await this.repository.createNewTemplate(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error creating new template:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: CreateNewTemplateModel = result.response!;
    return {
      response: response,
    };
  }

  /** テンプレートを更新するメソッド
   * @param templateId テンプレートID
   * @param name テンプレート名
   * @param description テンプレート説明
   * @param icon テンプレートアイコン
   * @returns テンプレートID
   */
  async updateFrameTemplate({
    templateId,
    name,
    contentJson,
  }: {
    templateId: string;
    name: string;
    contentJson: Json;
  }): Promise<{
    response?: UpdateFrameTemplateModel;
    error?: string;
  }> {
    const request: UpdateFrameTemplateRequest = {
      p_template_id: templateId,
      p_name: name,
      p_content_json: contentJson,
    };
    const result = await this.repository.updateFrameTemplate(request);
    if (!result.response && result.error) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error updating frame template:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const response: UpdateFrameTemplateModel = result.response!;
    return {
      response: response,
    };
  }

  /** frame id で frame name を更新するメソッド
   * @param frameId frame id
   * @param name frame name
   * @returns frame id
   * */
  async updateFrameNameById({
    frameId,
    name,
  }: {
    frameId: string;
    name: string;
  }): Promise<{
    response?: UpdateFrameNameByIdModel;
    error?: string;
  }> {
    const request: UpdateFrameNameByIdRequest = {
      p_frame_id: frameId,
      p_new_name: name,
    };
    const result = await this.repository.updateFrameNameById(request);
    if (!result.response && result.error) {
      console.error("Error updating frame name:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const response: UpdateFrameNameByIdModel = result.response![0];
    return {
      response: response,
    };
  }

  /** frame id で frame description を更新するメソッド
   * @param frameId frame id
   * @param description frame description
   * @returns frame id
   * */
  async updateFrameDescriptionById({
    frameId,
    description,
  }: {
    frameId: string;
    description: string;
  }): Promise<{
    response?: UpdateFrameDescriptionByIdModel;
    error?: string;
  }> {
    const request: UpdateFrameDescriptionByIdRequest = {
      p_frame_id: frameId,
      p_new_description: description,
    };
    const result = await this.repository.updateFrameDescriptionById(request);
    if (!result.response && result.error) {
      console.error("Error updating frame description:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    const response: UpdateFrameDescriptionByIdModel = result.response![0];
    return {
      response: response,
    };
  }

  /** frame properties を更新するメソッド
   * @param frameId frame id
   * @param properties frame properties
   * @returns frame id
   * */
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
  }): Promise<{
    response?: UpdateFramePropertiesByIdsModel;
    error?: string;
  }> {
    // 既存のproperty情報をfetchし、差分を取得して処理を変更
    const getFramePropertiesByFrameIdRequest: GetFramePropertiesByFrameIdRequest =
      {
        p_frame_id: frameId,
      };
    const getFramePropertiesByFrameIdResult =
      await this.repository.getFramePropertiesByFrameId(
        getFramePropertiesByFrameIdRequest
      );
    if (
      !getFramePropertiesByFrameIdResult.response &&
      getFramePropertiesByFrameIdResult.error
    ) {
      console.error(
        "Error getting frame properties by frame id:",
        getFramePropertiesByFrameIdResult.error
      );
      return {
        error: getFramePropertiesByFrameIdResult.error ?? "unknown error",
      };
    }

    // 既存のproperty情報と新しいproperty情報を比較し、差分を取得
    const existingPropertyIds = properties.map(
      (property) =>
        getFramePropertiesByFrameIdResult.response!.find(
          (existingProperty) => existingProperty.id === property.id
        )?.id
    );
    const updateProperties = properties.filter((property) => {
      const existingProperty = getFramePropertiesByFrameIdResult.response!.find(
        (existingProperty) => existingProperty.id === property.id
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
      (property) => !existingPropertyIds.includes(property.id)
    );
    const hideProperties = getFramePropertiesByFrameIdResult.response!.filter(
      (existingProperty) => !existingPropertyIds.includes(existingProperty.id)
    );

    // 既存のプロパティのupdate (※関数全体の処理名もupdateとなっているが、この処理だけの名前もupdate)
    let updatedProperties: {
      id: string;
      name: string;
      type: string;
      description: string;
    }[] = [];
    if (updateProperties.length !== 0) {
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
      const updateFramePropertiesByIdsResult =
        await this.repository.updateFramePropertiesByIds(
          updateFramePropertiesByIdsRequest
        );
      if (
        !updateFramePropertiesByIdsResult.response &&
        updateFramePropertiesByIdsResult.error
      ) {
        console.error(
          "Error updating frame properties by ids:",
          updateFramePropertiesByIdsResult.error
        );
        return {
          error: updateFramePropertiesByIdsResult.error ?? "unknown error",
        };
      }

      updatedProperties = updateFramePropertiesByIdsResult.response!.map(
        (property) => {
          return {
            id: property.id,
            name: property.name,
            type: property.type,
            description: property.description,
          };
        }
      );
    }

    // 新しいプロパティのcreate
    let createdProperties: {
      id: string;
      name: string;
      type: string;
      description: string;
    }[] = [];
    if (newProperties.length !== 0) {
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
      const createFramePropertiesResult =
        await this.repository.createFrameProperties(
          createFramePropertiesRequest
        );
      if (
        !createFramePropertiesResult.response &&
        createFramePropertiesResult.error
      ) {
        console.error(
          "Error creating frame properties:",
          createFramePropertiesResult.error
        );
        return { error: createFramePropertiesResult.error ?? "unknown error" };
      }

      createdProperties = createFramePropertiesResult.response!.map(
        (property) => {
          return {
            id: property.id,
            name: property.name,
            type: property.type,
            description: property.description,
          };
        }
      );
    }

    // 非表示にするプロパティのhide
    let hidedPropertyIds: string[] = [];
    if (hideProperties.length !== 0) {
      const hideFramePropertiesByIdsRequest: HideFramePropertiesByIdsRequest = {
        p_property_ids: hideProperties.map((property) => property.id),
        p_updater_id: updaterId,
      };
      const hideFramePropertiesByIdsResult =
        await this.repository.hideFramePropertiesByIds(
          hideFramePropertiesByIdsRequest
        );
      if (
        !hideFramePropertiesByIdsResult.response &&
        hideFramePropertiesByIdsResult.error
      ) {
        console.error(
          "Error hiding frame properties by ids:",
          hideFramePropertiesByIdsResult.error
        );
        return {
          error: hideFramePropertiesByIdsResult.error ?? "unknown error",
        };
      }

      hidedPropertyIds = hideFramePropertiesByIdsResult.response!.map(
        (property) => property.id
      );
    }

    const response: UpdateFramePropertiesByIdsModel = {
      updatedFrameProperties: updatedProperties,
      createdFrameProperties: createdProperties,
      hidedFramePropertyIds: hidedPropertyIds,
    };

    return {
      response: response,
    };
  }
}
