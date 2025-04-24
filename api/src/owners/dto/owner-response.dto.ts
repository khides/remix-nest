// schemas/owner-response.schema.ts
import { createZodDto } from 'nestjs-zod';
import {
  GetOwnerResponseSchema,
  GetUserAvatarResponseSchema,
} from 'src/owners/schema/owner-response.schema';
import { z } from 'zod';
export class GetOwnerResponseDto extends createZodDto(GetOwnerResponseSchema) {}

export class GetUserAvatarResponseDto extends createZodDto(
  GetUserAvatarResponseSchema,
) {}
