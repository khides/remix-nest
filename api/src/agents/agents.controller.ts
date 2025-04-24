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
  UsePipes,
  HttpStatus,
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
  ApiParam,
} from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'src/supabase/supabase.guard';
import {
  ApiOperationTag,
  AuthenticatedRequest,
  ResponseDto,
  ResponseSchema,
} from 'helpers/extension';
import { AgentsService } from 'src/agents/agents.service';
import { zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod';
import {
  CreateCommentSuggestionBodySchema,
  CreateTopicSuggestionBodySchema,
  UpdateSuggestionFeedbackBodySchema,
  UpdateVectorDBBodySchema,
} from 'src/agents/schema/agent-body.schema';
import {
  CreateCommentSuggestionBodyDto,
  CreateTopicSuggestionBodyDto,
  UpdateSuggestionFeedbackBodyDto,
  UpdateVectorDBBodyDto,
} from 'src/agents/dto/agemt-body.dto';
import {
  CreateCommentSuggestionResponseSchema,
  CreateTopicSuggestionResponseSchema,
  UpdateSuggestionFeedbackResponseSchema,
} from 'src/agents/schema/agent-response.schema';
import {
  CreateCommentSuggestionResponseDto,
  CreateTopicSuggestionResponseDto,
  UpdateSuggestionFeedbackResponseDto,
} from 'src/agents/dto/agent-response.dto';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  CreateCommentSuggestionBodyExample,
  CreateTopicSuggestionBodyExample,
} from 'src/agents/mocks/agent.mocks';

@ApiTags('agent')
@Controller('owners/:ownername/projects/:project/agent')
@UseGuards(SupabaseAuthGuard)
@ApiBearerAuth('supabase-auth')
@UsePipes(ZodValidationPipe)
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Put('suggestions/:suggestionId/feedback')
  @ApiOperationTag({ summary: '提案の更新', description: '提案を更新します' })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'suggestionId',
    description: '提案のID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateSuggestionFeedbackBodySchema),
    description: 'フィードバック情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UpdateSuggestionFeedbackResponseSchema),
    description: 'フィードバックの更新に成功しました',
  })
  async updateFeedback(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('suggestionId') suggestionId: string,
    @Body() body: UpdateSuggestionFeedbackBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateSuggestionFeedbackResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: {
        suggestionId: suggestionId,
      },
      message: 'フィードバックの更新に成功しました',
    };
  }

  @Post('vector')
  @ApiOperationTag({
    summary: 'vectorDBの更新',
    description: 'vectorDBを更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiBody({
    schema: zodToOpenAPI(UpdateVectorDBBodySchema),
    description: 'トピックの更新情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'vectorDBの更新に成功しました',
  })
  async updateVector(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: UpdateVectorDBBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    const accessToken = req.supabaseAccessToken;
    return {
      statusCode: HttpStatus.OK,
      message: 'vectorDBの更新に成功しました',
    };
  }

  @Get('topics')
  @ApiOperationTag({
    summary: 'トピック構築提案発火',
    description: 'トピック構築提案を発火させます',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'トピック構築提案の発火に成功しました',
  })
  async triggerTopicSuggestion(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    const accessToken = req.supabaseAccessToken;
    return {
      statusCode: HttpStatus.OK,
      message: 'トピック構築提案の発火に成功しました',
    };
  }

  @Post('topics')
  @ApiOperationTag({
    summary: 'トピック構築提案保存',
    description: 'トピック構築提案の保存行います',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiBody({
    schema: zodToOpenAPI(CreateTopicSuggestionBodySchema),
    description: 'トピック構築提案の情報',
    examples: {
      default: {
        value: CreateTopicSuggestionBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CreateTopicSuggestionResponseSchema),
    description: 'トピック構築提案の作成に成功しました',
  })
  async createTopicSuggestion(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: CreateTopicSuggestionBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<CreateTopicSuggestionResponseDto> {
    const accessToken = req.supabaseAccessToken;
    return {
      statusCode: HttpStatus.OK,
      data: {
        topicId: '123e4567-e89b-12d3-a456-426614174000',
        suggestionId: '123e4567-e89b-12d3-a456-426614174000',
      },
      message: 'トピック構築提案の発火に成功しました',
    };
  }

  @Get('topics/:topicId/timeline')
  @ApiOperationTag({
    summary: '検討もれ提案の発火',
    description: '検討もれ提案を発火させます',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'トピックのID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '検討もれ提案の発火に成功しました',
  })
  async triggerChatSuggestion(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    const accessToken = req.supabaseAccessToken;
    return {
      statusCode: HttpStatus.OK,
      message: '検討もれ提案の発火に成功しました',
    };
  }

  @Post('topics/:topicId/timeline')
  @ApiOperationTag({
    summary: '検討もれ提案保存',
    description: '検討もれ提案の保存行います',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'topicId',
    description: 'トピックのID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(CreateCommentSuggestionBodySchema),
    description: 'タイムライン内提案情報',
    examples: {
      default: {
        value: CreateCommentSuggestionBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CreateCommentSuggestionResponseSchema),
    description: '検討もれ提案の作成に成功しました',
  })
  async createChatSuggestion(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('topicId') topicId: string,
    @Body() body: CreateCommentSuggestionBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<CreateCommentSuggestionResponseDto> {
    const accessToken = req.supabaseAccessToken;
    return {
      statusCode: HttpStatus.OK,
      data: {
        activityId: '123e4567-e89b-12d3-a456-426614174000',
        suggestionId: '123e4567-e89b-12d3-a456-426614174000',
      },
      message: '検討もれ提案の作成に成功しました',
    };
  }
}
