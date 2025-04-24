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
  ApiForbiddenResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'src/supabase/supabase.guard';
import {
  AuthenticatedRequest,
  ResponseSchema,
  ResponseDto,
  ApiOperationTag,
} from 'helpers/extension';
import { ProjectsService } from 'src/projects/projects.service';
import {
  CreateTagBodyDto,
  DeleteProjectAccessRequestDto,
  InviteBodyDto,
  UpdateProjectAccessRequestDto,
  UpdateProjectNameRequestDto,
  UpdateTagBodyDto,
  UploadIconBodyDto,
} from 'src/projects/dto/project-body.dto';
import {
  GetAccessResponseDto,
  GetProjectIconResponseDto,
  GetProjectUsersWithRoleResponseDto,
  InviteProjectResponseDto,
} from 'src/projects/dto/project-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod';
import {
  CreateTagBodySchema,
  DeleteProjectAccessRequestSchema,
  InviteBodySchema,
  UpdateProjectAccessRequestSchema,
  UpdateProjectNameRequestSchema,
  UpdateTagBodySchema,
  UploadIconBodySchema,
} from 'src/projects/schema/project-body.schema';
import {
  GetAccessResponseSchema,
  GetProjectIconResponseSchema,
  GetProjectUsersWithRoleResponseSchema,
  InviteProjectResponseSchema,
} from 'src/projects/schema/project-response.schema';

@ApiTags('projects')
@Controller('owners/:ownername/projects')
@UseGuards(SupabaseAuthGuard)
@ApiBearerAuth('supabase-auth')
@UsePipes(ZodValidationPipe)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Delete(':project')
  @ApiOperationTag({
    summary: 'Projectの削除',
    description: 'Projectを削除します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '削除成功',
  })
  async remove(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Get(':project/access')
  @ApiOperationTag({
    summary: 'Projectのアクセス権限の取得',
    description: '認証しているUserのProjectのアクセス権限を取得します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiOkResponse({
    schema: zodToOpenAPI(GetAccessResponseSchema),
    description: '取得成功',
  })
  async getAccess(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetAccessResponseDto> {
    return {
      statusCode: 200,
      data: {
        role: 'admin',
      },
      message: 'OK',
    };
  }

  @Put(':project/access')
  @ApiOperationTag({
    summary: 'Projectのアクセス権限の更新',
    description: 'Projectのアクセス権限を更新します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiBody({
    schema: zodToOpenAPI(UpdateProjectAccessRequestSchema),
    description: '更新するアクセス権限の情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '更新成功',
  })
  async updateAccess(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: UpdateProjectAccessRequestDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Delete(':project/access')
  @ApiOperationTag({
    summary: 'Projectのアクセス権限の削除',
    description: 'Projectのアクセス権限を削除します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiBody({
    schema: zodToOpenAPI(DeleteProjectAccessRequestSchema),
    description: 'アクセス削除するUserの情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '削除成功',
  })
  async removeAccess(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: DeleteProjectAccessRequestDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Get(':project/icon')
  @ApiOperationTag({
    summary: 'Projectのアイコンの取得',
    description: 'Projectのアイコンを取得します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiOkResponse({
    schema: zodToOpenAPI(GetProjectIconResponseSchema),
    description: '取得成功',
  })
  async getIcon(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetProjectIconResponseDto> {
    return {
      statusCode: 200,
      data: {
        iconUrl: 'https://example.com/icon.png',
      },
      message: 'OK',
    };
  }

  @Put(':project/icon')
  @ApiOperationTag({
    summary: 'Projectのアイコンの更新',
    description: 'Projectのアイコンを更新します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiBody({ schema: zodToOpenAPI(UploadIconBodySchema) })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '更新成功',
  })
  @UseInterceptors(FileInterceptor('file'))
  async updateIcon(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: UploadIconBodyDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    if (!file) {
      return { statusCode: 400, message: 'ファイルがありません' };
    }

    return {
      statusCode: 200,
      message: 'ファイルが正常にアップロードされました。',
    };
  }

  @Put(':project/name')
  @ApiOperationTag({
    summary: 'Project名の更新',
    description: 'Project名を更新します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiBody({
    schema: zodToOpenAPI(UpdateProjectNameRequestSchema),
    description: '更新するProject名',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '更新成功',
  })
  async updateName(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: UpdateProjectNameRequestDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Post(':project/tags')
  @ApiOperationTag({
    summary: 'Projectのタグの追加',
    description: 'Projectにタグを追加します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiBody({
    schema: zodToOpenAPI(CreateTagBodySchema),
    description: '追加するタグの情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '追加成功',
  })
  async addTag(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: CreateTagBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Put(':project/tags/:tagId')
  @ApiOperationTag({
    summary: 'Projectのタグの更新',
    description: 'Projectのタグを更新します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiParam({ name: 'tagId', required: true, description: 'タグID' })
  @ApiBody({
    schema: zodToOpenAPI(UpdateTagBodySchema),
    description: '更新するタグの情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '更新成功',
  })
  async updateTag(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('tagId') tagId: string,
    @Body() body: UpdateTagBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Delete(':project/tags/:tagId')
  @ApiOperationTag({
    summary: 'Projectのタグの削除',
    description: 'Projectのタグを削除します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiParam({ name: 'tagId', required: true, description: 'タグID' })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '削除成功',
  })
  async removeTag(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Param('tagId') tagId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Post(':project/settings/access')
  @ApiOperationTag({
    summary: 'Projectへの招待',
    description: 'ProjectにUserを招待します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiBody({
    schema: zodToOpenAPI(InviteBodySchema),
    description: '招待するUserの情報',
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(InviteProjectResponseSchema),
    description: '招待成功',
  })
  async inviteUser(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Body() body: InviteBodyDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<InviteProjectResponseDto> {
    return {
      statusCode: 200,
      data: {
        result: 'succeeded',
      },
      message: 'OK',
    };
  }

  @Get(':project/settings/access')
  @ApiOperationTag({
    summary: 'Projectのロール付きメンバーの取得',
    description: 'Projectのロール付きメンバーを取得します',
  })
  @ApiParam({ name: 'ownername', required: true, description: 'Owner名' })
  @ApiParam({ name: 'project', required: true, description: 'Project名' })
  @ApiQuery({ name: 'username', required: true, description: 'User名' })
  @ApiQuery({ name: 'user_num', required: false, description: 'User番号' })
  @ApiOkResponse({
    schema: zodToOpenAPI(GetProjectUsersWithRoleResponseSchema),
    description: '取得成功',
  })
  async getUserWithRole(
    @Param('ownername') ownername: string,
    @Param('project') project: string,
    @Query('username') username: string,
    @Query('user_num') userNum: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetProjectUsersWithRoleResponseDto> {
    return {
      statusCode: 200,
      data: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          role: 'admin',
          avatarUrl: 'https://example.com/avatar.png',
        },
      ],
      message: 'OK',
    };
  }
}
