import { createZodDto } from 'nestjs-zod';
import {
  LeaveOrgRequestSchema,
  LeaveProjectRequestSchema,
  UpdateOrgDisplayRequestSchema,
  UpdateOwnerRequestSchema,
  UpdatePinRequestSchema,
  UploadIconRequestSchema,
} from 'src/owners/schema/owner-body.schema';

export class UpdateOwnerRequestDto extends createZodDto(
  UpdateOwnerRequestSchema,
) {}
export class UploadIconRequestDto extends createZodDto(
  UploadIconRequestSchema,
) {}
export class UpdatePinRequestDto extends createZodDto(UpdatePinRequestSchema) {}
export class LeaveProjectRequestDto extends createZodDto(
  LeaveProjectRequestSchema,
) {}
export class UpdateOrgDisplayRequestDto extends createZodDto(
  UpdateOrgDisplayRequestSchema,
) {}
export class LeaveOrgRequestDto extends createZodDto(LeaveOrgRequestSchema) {}
