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
import { FramesService } from 'src/frames/frames.service';
import { SupabaseAuthGuard } from 'src/supabase/supabase.guard';
import { ZodValidationPipe, zodToOpenAPI } from 'nestjs-zod';
import { z } from 'zod';
import {
  CreateFrameBodySchema,
  CreateFrameTemplateBodySchema,
  CreateFrameTimelineCommentBodySchema,
  CreateFrameTimelineReplyBodySchema,
  UpdateFrameAttributeBodySchema,
  UpdateFrameDescriptionBodySchema,
  UpdateFrameNameBodySchema,
  UpdateFrameTemplateBodySchema,
  UpdateFrameTimelineCommentBodySchema,
  UpdateFrameTimelineReplyBodySchema,
} from 'src/frames/schema/frame-body.schema';
import {
  CreateFrameBodyDto,
  CreateFrameTemplateBodyDto,
  CreateFrameTimelineCommentBodyDto,
  CreateFrameTimelineReplyBodyDto,
  UpdateFrameAttributeBodyDto,
  UpdateFrameDescriptionBodyDto,
  UpdateFrameNameBodyDto,
  UpdateFrameTemplateBodyDto,
  UpdateFrameTimelineCommentBodyDto,
  UpdateFrameTimelineReplyBodyDto,
} from 'src/frames/dto/frame-body.dto';
import {
  ApiOperationTag,
  AuthenticatedRequest,
  ResponseDto,
  ResponseSchema,
} from 'helpers/extension';
import { CreateFrameResponseDto } from 'src/frames/dto/frame-response.dto';
import { CreateFrameResponseSchema } from 'src/frames/schema/frame-response.schema';
import {
  CreateFrameTimelineReplyBodyExample,
  UpdateFrameTemplateBodyExample,
  UpdateFrameTimelineCommentBodyExample,
  UpdateFrameTimelineReplyBodyExample,
} from 'src/frames/mocks/frames.mocks';

@ApiTags('frames')
@Controller('owners/:ownername/projects/:project/frames')
@UseGuards(SupabaseAuthGuard)
@ApiBearerAuth('supabase-auth')
@UsePipes(ZodValidationPipe)
export class FramesController {
  constructor(private readonly framesService: FramesService) {}

  @Post()
  @ApiOperationTag({
    summary: 'Frame新規作成',
    description: 'Frameを新規作成します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiBody({
    schema: zodToOpenAPI(CreateFrameBodySchema),
    description: 'Frameの情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CreateFrameResponseSchema),
    description: 'Frameの作成に成功しました',
  })
  async createFrame(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: CreateFrameBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<CreateFrameResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      data: {
        frameId: '123e4567-e89b-12d3-a456-426614174000',
      },
      message: 'Frameの作成に成功しました',
    };
  }

  @Delete(':frameId')
  @ApiOperationTag({ summary: 'Frame削除', description: 'Frameを削除します' })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameの削除に成功しました',
  })
  async deleteFrame(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameの削除に成功しました',
    };
  }

  @Put(':frameId/description')
  @ApiOperationTag({
    summary: 'Frame説明更新',
    description: 'Frameの説明を更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateFrameDescriptionBodySchema),
    description: 'Frameの説明',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameの説明の更新に成功しました',
  })
  async updateFrameDescription(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Body() body: UpdateFrameDescriptionBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameの説明の更新に成功しました',
    };
  }

  @Put(':frameId/name')
  @ApiOperationTag({
    summary: 'Frame名前更新',
    description: 'Frameの名前を更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateFrameNameBodySchema),
    description: 'Frameの名前',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameの名前の更新に成功しました',
  })
  async updateFrameName(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Body() body: UpdateFrameNameBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameの名前の更新に成功しました',
    };
  }

  @Put(':frameId/attributes')
  @ApiOperationTag({
    summary: 'Frame属性更新',
    description: 'Frameの属性を更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateFrameAttributeBodySchema),
    description: 'Frameの属性',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameの属性の更新に成功しました',
  })
  async updateFrameAttributes(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Body() body: UpdateFrameAttributeBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameの属性の更新に成功しました',
    };
  }

  @Post(':frameId/templates')
  @ApiOperationTag({
    summary: 'Frameテンプレート作成',
    description: 'Frameのテンプレートを作成します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(CreateFrameTemplateBodySchema),
    description: 'Frameのテンプレート',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameのテンプレートの作成に成功しました',
  })
  async createFrameTemplate(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Body() body: CreateFrameTemplateBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameのテンプレートの作成に成功しました',
    };
  }

  @Put(':frameId/templates/:templateId')
  @ApiOperationTag({
    summary: 'Frameテンプレート更新',
    description: 'Frameのテンプレートを更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'templateId',
    description: 'Template ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateFrameTemplateBodySchema),
    description: 'Frameのテンプレート',
    examples: {
      default: {
        value: UpdateFrameTemplateBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameのテンプレートの更新に成功しました',
  })
  async updateFrameTemplate(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Param('templateId') templateId: string,
    @Body() body: UpdateFrameTemplateBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameのテンプレートの更新に成功しました',
    };
  }

  @Delete(':frameId/templates/:templateId')
  @ApiOperationTag({
    summary: 'Frameテンプレート削除',
    description: 'Frameのテンプレートを削除します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'templateId',
    description: 'Template ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameのテンプレートの削除に成功しました',
  })
  async deleteFrameTemplate(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Param('templateId') templateId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameのテンプレートの削除に成功しました',
    };
  }

  @Post(':frameId/timeline/comment')
  @ApiOperationTag({
    summary: 'Frameタイムラインコメント作成',
    description: 'Frameのタイムラインコメントを作成します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(CreateFrameTimelineCommentBodySchema),
    description: 'Frameのタイムラインコメント',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameのタイムラインコメントの作成に成功しました',
  })
  async createFrameTimelineComment(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Body() body: CreateFrameTimelineCommentBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameのタイムラインコメントの作成に成功しました',
    };
  }

  @Put(':frameId/timeline/comment/:activityId')
  @ApiOperationTag({
    summary: 'Frameタイムラインコメント更新',
    description: 'Frameのタイムラインコメントを更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'activityId',
    description: 'Activity ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateFrameTimelineCommentBodySchema),
    description: 'Frameのタイムラインコメント',
    examples: {
      default: {
        value: UpdateFrameTimelineCommentBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameのタイムラインコメントの更新に成功しました',
  })
  async updateFrameTimelineComment(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Param('activityId') activityId: string,
    @Body() body: UpdateFrameTimelineCommentBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameのタイムラインコメントの更新に成功しました',
    };
  }

  @Delete(':frameId/timeline/comment/:activityId')
  @ApiOperationTag({
    summary: 'Frameタイムラインコメント削除',
    description: 'Frameのタイムラインコメントを削除します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'activityId',
    description: 'Activity ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameのタイムラインコメントの削除に成功しました',
  })
  async deleteFrameTimelineComment(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Param('activityId') activityId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameのタイムラインコメントの削除に成功しました',
    };
  }

  @Post(':frameId/timeline/reply')
  @ApiOperationTag({
    summary: 'Frameタイムライン返信作成',
    description: 'Frameのタイムライン返信を作成します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(CreateFrameTimelineReplyBodySchema),
    description: 'Frameのタイムライン返信',
    examples: {
      default: {
        value: CreateFrameTimelineReplyBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameのタイムライン返信の作成に成功しました',
  })
  async createFrameTimelineReply(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Body() body: CreateFrameTimelineReplyBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameのタイムライン返信の作成に成功しました',
    };
  }

  @Put(':frameId/timeline/reply/:replyId')
  @ApiOperationTag({
    summary: 'Frameタイムライン返信更新',
    description: 'Frameのタイムライン返信を更新します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'replyId',
    description: 'Reply ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    schema: zodToOpenAPI(UpdateFrameTimelineReplyBodySchema),
    description: 'Frameのタイムライン返信',
    examples: {
      default: {
        value: UpdateFrameTimelineReplyBodyExample,
      },
    },
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameのタイムライン返信の更新に成功しました',
  })
  async updateFrameTimelineReply(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Param('replyId') replyId: string,
    @Body() body: UpdateFrameTimelineReplyBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameのタイムライン返信の更新に成功しました',
    };
  }

  @Delete(':frameId/timeline/reply/:replyId')
  @ApiOperationTag({
    summary: 'Frameタイムライン返信削除',
    description: 'Frameのタイムライン返信を削除します',
  })
  @ApiParam({ name: 'ownername', description: 'Owner名', example: 'user1' })
  @ApiParam({ name: 'project', description: 'Project名', example: 'project1' })
  @ApiParam({
    name: 'frameId',
    description: 'Frame ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'replyId',
    description: 'Reply ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'Frameのタイムライン返信の削除に成功しました',
  })
  async deleteFrameTimelineReply(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('frameId') frameId: string,
    @Param('replyId') replyId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Frameのタイムライン返信の削除に成功しました',
    };
  }
}
