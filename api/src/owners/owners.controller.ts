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
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { OwnersService } from './owners.service';
import {
  LeaveOrgRequestDto,
  LeaveProjectRequestDto,
  UpdateOrgDisplayRequestDto,
  UpdateOwnerRequestDto,
  UpdatePinRequestDto,
  UploadIconRequestDto,
} from './dto/owner-body.dto';
import {
  GetOwnerResponseDto,
  GetUserAvatarResponseDto,
} from './dto/owner-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseAuthGuard } from 'src/supabase/supabase.guard';
import {
  AuthenticatedRequest,
  ResponseSchema,
  ResponseDto,
  ApiOperationTag,
} from 'helpers/extension';
import { Owner, User } from 'src/owners/entities/owner.entity';
import { zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod';
import {
  GetOwnerResponseSchema,
  GetUserAvatarResponseSchema,
} from 'src/owners/schema/owner-response.schema';
import {
  LeaveOrgRequestSchema,
  LeaveProjectRequestSchema,
  UpdateOrgDisplayRequestSchema,
  UpdateOwnerRequestSchema,
  UpdatePinRequestSchema,
  UploadIconRequestSchema,
} from 'src/owners/schema/owner-body.schema';

@ApiTags('owners')
@Controller('owners')
@UseGuards(SupabaseAuthGuard)
@ApiBearerAuth('supabase-auth')
@UsePipes(ZodValidationPipe)
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  // Owner情報の取得
  @Get(':ownername')
  @ApiOperationTag({
    summary: 'User情報の取得',
    description: 'User情報を取得します。',
  })
  @ApiOkResponse({
    description: '取得成功',
    schema: zodToOpenAPI(GetOwnerResponseSchema),
  })
  async findOne(
    @Param('ownername') ownerName: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetOwnerResponseDto> {
    let user: User;
    try {
      user = await this.ownersService.getUserProfileByName({
        userName: ownerName,
      });
    } catch (error) {
      throw error;
    }
    return {
      statusCode: HttpStatus.OK,
      data: user,
      message: 'OK',
    };
  }

  // User情報の更新
  @Put(':ownername')
  @ApiOperationTag({ summary: 'Owner情報の更新' })
  @ApiParam({
    name: 'ownername',
    description: 'Owner名',
    required: true,
    type: String,
    example: 'user1',
  })
  @ApiBody({ schema: zodToOpenAPI(UpdateOwnerRequestSchema) })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '更新成功',
  })
  async update(
    @Param('ownername') ownerName: string,
    @Body() dto: UpdateOwnerRequestDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    try {
      await this.ownersService.updateUserProfileByName({ ownerName, dto });
    } catch (error) {
      throw error;
    }
    return { statusCode: HttpStatus.OK, message: 'Updated successfully' };
  }

  // UserのアバターURLを取得
  @Get(':ownername/icon')
  @ApiOperationTag({ summary: 'UserのアバターURLを取得' })
  @ApiOkResponse({
    schema: zodToOpenAPI(GetUserAvatarResponseSchema),
    description: '取得成功',
  })
  async getUserAvatar(
    @Param('ownername') ownerName: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<GetUserAvatarResponseDto> {
    let avatarUrl: string;
    try {
      avatarUrl = await this.ownersService.getUserAvatarUrlByOwnerName({
        ownerName,
      });
    } catch (error) {
      throw error;
    }
    return {
      statusCode: HttpStatus.OK,
      data: { avatarUrl },
      message: 'OK',
    };
  }

  // アイコン画像をアップロード
  @Put(':ownername/icon')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperationTag({ summary: 'アイコン画像をアップロード' })
  @ApiBody({ schema: zodToOpenAPI(UploadIconRequestSchema) })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'アップロード成功',
  })
  async uploadUserIcon(
    @Param('ownername') ownerName: string,
    @UploadedFile() file: File,
    @Body() dto: UploadIconRequestDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    if (!file) {
      throw new HttpException('not found file', HttpStatus.NOT_FOUND);
    }
    try {
      await this.ownersService.uploadUserImgByName({ file, ownerName });
    } catch (error) {
      throw error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'ファイルが正常にアップロードされました。',
    };
  }

  // Projectのピン状態を更新
  @Put(':ownername/managepin')
  @ApiOperationTag({ summary: 'Projectのピン状態を更新' })
  @ApiBody({ schema: zodToOpenAPI(UpdatePinRequestSchema) })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: 'ピン状態の更新成功',
  })
  async updatePin(
    @Param('ownername') ownerName: string,
    @Body() dto: UpdatePinRequestDto,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      await this.ownersService.updateProjectPinedByProjectAndUserName({
        userName: ownerName,
        projectId: dto.projectId,
        pined: dto.pined,
      });
    } catch (error) {
      throw error;
    }
    return { statusCode: HttpStatus.OK, message: 'OK' };
  }

  // Projectから脱退
  @Delete(':ownername/managepin')
  @ApiOperationTag({ summary: 'Projectから脱退' })
  @ApiBody({ schema: zodToOpenAPI(LeaveProjectRequestSchema) })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '脱退成功',
  })
  async leaveProject(
    @Param('ownername') ownerName: string,
    @Body() dto: LeaveProjectRequestDto,
    @Req() req: AuthenticatedRequest,
  ) {
    try {
      await this.ownersService.leaveProjectByProjectAndUserName({
        userName: ownerName,
        projectId: dto.projectId,
      });
    } catch (error) {
      throw error;
    }
    return { statusCode: HttpStatus.OK, message: 'OK' };
  }

  // 組織の表示設定の更新
  @Put(':ownername/orgdisplay')
  @ApiOperationTag({ summary: '組織の表示・非表示の更新' })
  @ApiBody({ schema: zodToOpenAPI(UpdateOrgDisplayRequestSchema) })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '更新成功',
  })
  async updateOrgDisplay(
    @Param('ownername') ownerName: string,
    @Body() dto: UpdateOrgDisplayRequestDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    try {
      await this.ownersService.updateOrgDisplayByOrgAndUserName({
        userName: ownerName,
        orgId: dto.orgId,
        display: dto.display,
      });
    } catch (error) {
      throw error;
    }
    return { statusCode: HttpStatus.OK, message: 'OK' };
  }

  // 組織から脱退
  @Delete(':ownername/orgdisplay')
  @ApiOperationTag({ summary: '組織から脱退' })
  @ApiBody({ schema: zodToOpenAPI(LeaveOrgRequestSchema) })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponseSchema),
    description: '脱退成功',
  })
  async leaveOrg(
    @Param('ownername') ownerName: string,
    @Body() dto: LeaveOrgRequestDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<ResponseDto> {
    try {
      await this.ownersService.leaveOrgDisplayByOrgAndUserName({
        userName: ownerName,
        orgId: dto.orgId,
      });
    } catch (error) {
      throw error;
    }
    return { statusCode: HttpStatus.OK, message: 'OK' };
  }
}
