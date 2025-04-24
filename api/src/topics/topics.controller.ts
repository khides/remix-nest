import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Headers,
  Header,
  Req,
  UseGuards,
  Query,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiConsumes,
  ApiBody,
  ApiHeaders,
  ApiHeader,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'src/supabase/supabase.guard';
import { TopicsService } from 'src/topics/topics.service';
import {
  ApiOperationTag,
  AuthenticatedRequest,
  ResponseDto,
  ResponseSchema,
} from 'helpers/extension';
import {
  CreateFilteringShortcutsBodyDto,
  CreateQuestionBodyDto,
  CreateTopicBodyDto,
  CreateTopicContextBodyDto,
  PostTimelineCommentBodyDto,
  PostTimelineReplyBodyDto,
  UpdateTimelineCommentBodyDto,
  UpdateTimelineReplyBodyDto,
  UpdateTopicAttributesBodyDto,
  UpdateTopicContextBodyDto,
  UpdateTopicContextListBodyDto,
  UpdateTopicFrameBodyDto,
  UpdateTopicParticipantsBodyDto,
  UpdateTopicStateBodyDto,
  UpdateTopicTagsBodyDto,
  UpdateTopicTitileBodyDto,
} from 'src/topics/dto/topic-body.dto';
import {
  CreateTopicContextResponseDto,
  CreateTopicResponseDto,
  GetProjectTopicContextListResponseDto,
  GetTopicContextDetailResponseDto,
  GetTopicContextListResponseDto,
  GetTopicDetailResponseDto,
  GetTopicListResponseDto,
  PostTimelineCommentResponseDto,
  PostTimelineReplyResponseDto,
} from 'src/topics/dto/topic-response.dto';
import { zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod';
import {
  CreateFilteringShortcutsBodySchema,
  CreateQuestionBodySchema,
  CreateTopicBodySchema,
  CreateTopicContextBodySchema,
  PostTimelineCommentBodySchema,
  PostTimelineReplyBodySchema,
  UpdateTimelineCommentBodySchema,
  UpdateTimelineReplyBodySchema,
  UpdateTopicAttributesBodySchema,
  UpdateTopicContextBodySchema,
  UpdateTopicContextListBodySchema,
  UpdateTopicFrameBodySchema,
  UpdateTopicParticipantsBodySchema,
  UpdateTopicStateBodySchema,
  UpdateTopicTagsBodySchema,
  UpdateTopicTitleBodySchema,
} from 'src/topics/schema/topic-body.schema';
import {
  CreateTopicContextResponseSchema,
  CreateTopicResponseSchema,
  GetProjectTopicContextListResponseSchema,
  GetTopicContextDetailResponseSchema,
  GetTopicContextListResponseSchema,
  GetTopicDetailResponseSchema,
  GetTopicListResponseSchema,
  PostTimelineCommentResponseSchema,
  PostTimelineReplyResponseSchema,
} from 'src/topics/schema/topic-response.schema';
import {
  CreateTopicBodyExample,
  PostTimelineCommentBodyExample,
  PostTimelineReplyBodyExample,
  UpdateTimelineCommentBodyExample,
  UpdateTimelineReplyBodyExample,
  UpdateTopicAttributesBodyExample,
} from 'src/topics/mocks/topics.mock';

@ApiTags('topics')
@Controller('owners/:ownername/projects/:project/topics')
@UseGuards(SupabaseAuthGuard)
@ApiBearerAuth('supabase-auth')
@UsePipes(ZodValidationPipe)
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiOperationTag({
    summary: 'Topic新規作成',
    description: 'Topicを新規作成します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiBody({
    schema: zodToOpenAPI(CreateTopicBodySchema),
    description: 'Topicの情報',
    examples: {
      default: {
        value: CreateTopicBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CreateTopicResponseSchema),
    description: 'Topicの作成に成功しました',
  })
  async createTopic(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: CreateTopicBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<CreateTopicResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: {
        topicId: '123e4567-e89b-12d3-a456-426614174000',
      },
      message: 'Topicの作成に成功しました',
    };
  }

  @Get()
  @ApiOperationTag({
    summary: 'Topic一覧取得',
    description: 'Topicの一覧を取得します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiQuery({
    name: 'page',
    description: 'ページ番号',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    description: '1ページあたりの件数',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'state',
    description: 'Topicの状態',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'frameName',
    description: 'Frame名',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'conflict',
    description: 'コンフリクトの有無',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'tagName',
    description: 'タグ名',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'search',
    description: '検索キーワード',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'sort',
    description: 'ソート順',
    required: false,
    type: String,
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GetTopicListResponseSchema),
    description: 'Topicの一覧取得に成功しました',
  })
  async getTopicList(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('state') state: string,
    @Query('frameName') frameId: string,
    @Query('conflict') isConflict: boolean,
    @Query('tagName') tagName: string,
    @Query('search') search: string,
    @Query('sort') sort: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetTopicListResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: [],
      message: 'Topicの一覧取得に成功しました',
    };
  }

  @Get(':topicId')
  @ApiOperationTag({
    summary: 'Topic詳細取得',
    description: 'Topicの詳細を取得します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GetTopicDetailResponseSchema),
    description: 'Topicの詳細取得に成功しました',
  })
  async getTopicDetail(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetTopicDetailResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Sample Topic',
        state: 'open',
        frame: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          name: 'Sample Frame',
          description: 'Sample Frame Description',
          createdBy: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            email: 'user@example.com',
          },
          createdAt: '2025/04/05',
          attributes: [
            {
              id: '123e4567-e89b-12d3-a456-426614174000',
              name: 'Sample Attribute',
              type: 'text',
              creatorId: '123e4567-e89b-12d3-a456-426614174000',
              description: '',
              createdAt: '2025/04/05',
            },
          ],
          templates: [],
        },
        tags: [
          {
            id: '123e4567-e89b-12d3-a456-426614174001',
            name: 'Sample Tag',
            color: '#FF5733',
            description: 'Sample Tag Description',
          },
        ],
        createdAt: '2025/04/05',
        createdBy: '123e4567-e89b-12d3-a456-426614174000',
        topicNum: 1,
        attributes: [],
        activities: [],
        contexts: [],
        participants: [],
        documnets: [],
      },
      message: 'Topicの詳細取得に成功しました',
    };
  }

  @Delete(':topicId')
  @ApiOperationTag({ summary: 'Topic削除', description: 'Topicを削除します' })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicの削除に成功しました',
  })
  async deleteTopic(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicの削除に成功しました',
    };
  }

  @Put(':topicId/frame')
  @ApiOperationTag({
    summary: 'TopicのFrame変更',
    description: 'TopicのFrameを変更します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTopicFrameBodySchema),
    description: '新たなFrameID',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'TopicのFrame変更に成功しました',
  })
  async updateTopicFrame(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: UpdateTopicFrameBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'TopicのFrame変更に成功しました',
    };
  }

  @Put(':topicId/participants')
  @ApiOperationTag({
    summary: 'Topicの参加者変更',
    description: 'Topicの参加者を変更します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTopicParticipantsBodySchema),
    description: '新たなTopicの参加者ID一覧',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicの参加者変更に成功しました',
  })
  async updateTopicParticipants(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: UpdateTopicParticipantsBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicの参加者変更に成功しました',
    };
  }

  @Put(':topicId/state')
  @ApiOperationTag({
    summary: 'Topicの状態変更',
    description: 'Topicの状態を変更します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTopicStateBodySchema),
    description: '新たなTopicの状態',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicの状態変更に成功しました',
  })
  async updateTopicState(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: UpdateTopicStateBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicの状態変更に成功しました',
    };
  }

  @Put(':topicId/tags')
  @ApiOperationTag({
    summary: 'Topicのタグ変更',
    description: 'Topicのタグを変更します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTopicTagsBodySchema),
    description: '新たなTopicのタグID一覧',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicのタグ変更に成功しました',
  })
  async updateTopicTags(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: UpdateTopicTagsBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicのタグ変更に成功しました',
    };
  }

  @Put(':topicId/title')
  @ApiOperationTag({
    summary: 'Topicのタイトル変更',
    description: 'Topicのタイトルを変更します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTopicTitleBodySchema),
    description: '新たなタイトル',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicのタイトル変更に成功しました',
  })
  async updateTopicTitle(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: UpdateTopicTitileBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicのタイトル変更に成功しました',
    };
  }

  @Post(':topicId/agent/question')
  @ApiOperationTag({
    summary: 'Topicの質問生成',
    description: 'Topicの質問を生成します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(CreateQuestionBodySchema),
    description: '質問ポスト',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicの質問生成に成功しました',
  })
  async generateTopicQuestion(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: CreateQuestionBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicの質問生成に成功しました',
    };
  }

  @Get(':topicId/contexts')
  @ApiOperationTag({
    summary: 'TopicのContext取得',
    description: 'TopicのContextを取得します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GetTopicContextListResponseSchema),
    description: 'TopicのContext取得に成功しました',
  })
  async getTopicContexts(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetTopicContextListResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: [],
      message: 'TopicのContext取得に成功しました',
    };
  }

  @Put(':topicId/contexts')
  @ApiOperationTag({
    summary: 'TopicのContext変更',
    description: 'TopicのContextを変更します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTopicContextListBodySchema),
    description: 'TopicContextの更新情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'TopicのContext変更に成功しました',
  })
  async updateTopicContexts(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: UpdateTopicContextListBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'TopicのContext変更に成功しました',
    };
  }

  @Get(':topicId/contexts/:contextId')
  @ApiOperationTag({
    summary: 'TopicのContext詳細取得',
    description: 'TopicのContextの詳細を取得します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'contextId',
    description: 'TopicContextID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GetTopicContextDetailResponseSchema),
    description: 'TopicのContext詳細取得に成功しました',
  })
  async getTopicContextDetail(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Param('contextId') contextId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetTopicContextDetailResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: {
        topicContextId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Sample Topic Context',
        description: 'Sample Description',
        type: 'Sample Type',
        opponentTopicId: '123e4567-e89b-12d3-a456-426614174000',
        opponentTopicName: 'Sample Topic',
        opponentTopicNum: 1,
      },
      message: 'TopicのContext詳細取得に成功しました',
    };
  }

  @Post(':topicId/contexts/:contextId')
  @ApiOperationTag({
    summary: 'TopicのContext作成',
    description: 'TopicのContextを作成します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'contextId',
    required: false,
    description: '新しいTopicContextID（なければ作成）',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(CreateTopicContextBodySchema),
    description: 'TopicContextの情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CreateTopicContextResponseSchema),
    description: 'TopicのContext作成に成功しました',
  })
  async createTopicContext(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: CreateTopicContextBodyDto,
    @Req() req: AuthenticatedRequest,
    @Param('contextId') contextId?: string,
  ): Promise<CreateTopicContextResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: {
        topicContextId: '123e4567-e89b-12d3-a456-426614174000',
      },
      message: 'TopicのContext作成に成功しました',
    };
  }

  @Put(':topicId/contexts/:contextId')
  @ApiOperationTag({
    summary: 'TopicのContext更新',
    description: 'TopicのContextを更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'contextId',
    description: 'TopicContextID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTopicContextBodySchema),
    description: 'TopicContextの情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'TopicのContext更新に成功しました',
  })
  async updateTopicContext(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Param('contextId') contextId: string,
    @Body() body: UpdateTopicContextBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'TopicのContext更新に成功しました',
    };
  }

  @Delete(':topicId/contexts/:contextId')
  @ApiOperationTag({
    summary: 'TopicのContext削除',
    description: 'TopicのContextを削除します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'contextId',
    description: 'TopicContextID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'TopicのContext削除に成功しました',
  })
  async deleteTopicContext(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Param('contextId') contextId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'TopicのContext削除に成功しました',
    };
  }

  @Put(':topicId/attributes')
  @ApiOperationTag({
    summary: 'TopicのAttributes変更',
    description: 'TopicのAttributesを変更します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTopicAttributesBodySchema),
    description: 'TopicAttributesの更新情報',
    examples: {
      default: {
        value: UpdateTopicAttributesBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'TopicのAttributes変更に成功しました',
  })
  async updateTopicAttributes(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: UpdateTopicAttributesBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'TopicのAttributes変更に成功しました',
    };
  }

  @Post(':topicId/timeline/comment')
  @ApiOperationTag({
    summary: 'Topicのコメント投稿',
    description: 'Topicにコメントを投稿します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(PostTimelineCommentBodySchema),
    description: 'コメントポスト',
    examples: {
      default: {
        value: PostTimelineCommentBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(PostTimelineCommentResponseSchema),
    description: 'Topicのコメント投稿に成功しました',
  })
  async postTopicComment(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: PostTimelineCommentBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<PostTimelineCommentResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: {
        activityId: '123e4567-e89b-12d3-a456-426614174000',
      },
      message: 'Topicのコメント投稿に成功しました',
    };
  }

  @Put(':topicId/timeline/comment/:activityId')
  @ApiOperationTag({
    summary: 'Topicのコメント更新',
    description: 'Topicのコメントを更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'activityId',
    description: 'TimelineCommentID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTimelineCommentBodySchema),
    description: 'コメントポスト',
    examples: {
      default: {
        value: UpdateTimelineCommentBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicのコメント更新に成功しました',
  })
  async updateTopicComment(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Param('activityId') activityId: string,
    @Body() body: UpdateTimelineCommentBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicのコメント更新に成功しました',
    };
  }

  @Delete(':topicId/timeline/comment/:activityId')
  @ApiOperationTag({
    summary: 'Topicのコメント削除',
    description: 'Topicのコメントを削除します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'activityId',
    description: 'TimelineCommentID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicのコメント削除に成功しました',
  })
  async deleteTopicComment(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Param('activityId') activityId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicのコメント削除に成功しました',
    };
  }

  @Post(':topicId/timeline/reply')
  @ApiOperationTag({
    summary: 'Topicのコメントに返信',
    description: 'Topicのコメントに返信します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(PostTimelineReplyBodySchema),
    description: 'コメントポスト',
    examples: {
      default: {
        value: PostTimelineReplyBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(PostTimelineReplyResponseSchema),
    description: 'Topicのコメントに返信に成功しました',
  })
  async postTopicCommentReply(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: PostTimelineReplyBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<PostTimelineReplyResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: {
        activityId: '123e4567-e89b-12d3-a456-426614174000',
      },
      message: 'Topicのコメントに返信に成功しました',
    };
  }

  @Put(':topicId/timeline/reply/:replyId')
  @ApiOperationTag({
    summary: 'Topicのコメント返信更新',
    description: 'Topicのコメント返信を更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'replyId',
    description: 'TimelineReplyID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTimelineReplyBodySchema),
    description: 'コメントポスト',
    examples: {
      default: {
        value: UpdateTimelineReplyBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicのコメント返信更新に成功しました',
  })
  async updateTopicCommentReply(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Param('replyId') replyId: string,
    @Body() body: UpdateTimelineReplyBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicのコメント返信更新に成功しました',
    };
  }

  @Delete(':topicId/timeline/reply/:replyId')
  @ApiOperationTag({
    summary: 'Topicのコメント返信削除',
    description: 'Topicのコメント返信を削除します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'TopicID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'replyId',
    description: 'TimelineReplyID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicのコメント返信削除に成功しました',
  })
  async deleteTopicCommentReply(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Param('replyId') replyId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicのコメント返信削除に成功しました',
    };
  }

  @Get('contexts')
  @ApiOperationTag({
    summary: 'ProjectのContext一覧取得',
    description: 'ProjectのContext一覧を取得します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiOkResponse({
    schema: zodToOpenAPI(GetProjectTopicContextListResponseSchema),
    description: 'ProjectのContext一覧取得に成功しました',
  })
  async getTopicContextList(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetProjectTopicContextListResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: [],
      message: 'ProjectのContext一覧取得に成功しました',
    };
  }

  @Post('filtering-shortcuts')
  @ApiOperationTag({
    summary: 'Topicのフィルタリングショートカット作成',
    description: 'Topicのフィルタリングショートカットを作成します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiBody({
    schema: zodToOpenAPI(CreateFilteringShortcutsBodySchema),
    description: 'フィルタリングショートカットの情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Topicのフィルタリングショートカット作成に成功しました',
  })
  async createFilteringShortcuts(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: CreateFilteringShortcutsBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Topicのフィルタリングショートカット作成に成功しました',
    };
  }
}
