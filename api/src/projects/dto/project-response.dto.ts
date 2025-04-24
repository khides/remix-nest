import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Owner } from 'src/owners/entities/owner.entity';
import {
  InviteResult,
  ProjectIcon,
  UserWithRole,
} from 'src/projects/entities/project.entity';
import { createZodDto } from 'nestjs-zod';
import {
  GetAccessResponseSchema,
  GetProjectIconResponseSchema,
  GetProjectUsersWithRoleResponseSchema,
  InviteProjectResponseSchema,
} from 'src/projects/schema/project-response.schema';

export class GetProjectIconResponseDto extends createZodDto(
  GetProjectIconResponseSchema,
) {}

export class InviteProjectResponseDto extends createZodDto(
  InviteProjectResponseSchema,
) {}

export class GetProjectUsersWithRoleResponseDto extends createZodDto(
  GetProjectUsersWithRoleResponseSchema,
) {}

export class GetAccessResponseDto extends createZodDto(
  GetAccessResponseSchema,
) {}
