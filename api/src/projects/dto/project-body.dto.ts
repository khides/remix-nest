import { createZodDto } from 'nestjs-zod';
import {
  CreateTagBodySchema,
  DeleteProjectAccessRequestSchema,
  InviteBodySchema,
  UpdateProjectAccessRequestSchema,
  UpdateProjectNameRequestSchema,
  UpdateTagBodySchema,
} from 'src/projects/schema/project-body.schema';

export class UpdateProjectAccessRequestDto extends createZodDto(
  UpdateProjectAccessRequestSchema,
) {}

export class DeleteProjectAccessRequestDto extends createZodDto(
  DeleteProjectAccessRequestSchema,
) {}

export class UpdateProjectNameRequestDto extends createZodDto(
  UpdateProjectNameRequestSchema,
) {}

export class CreateTagBodyDto extends createZodDto(CreateTagBodySchema) {}

export class UpdateTagBodyDto extends createZodDto(UpdateTagBodySchema) {}

export class InviteBodyDto extends createZodDto(InviteBodySchema) {}

export class UploadIconBodyDto {
  file: Express.Multer.File;
}
