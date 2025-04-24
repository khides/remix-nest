import { createZodDto } from 'nestjs-zod';
import { ResponseSchema } from 'helpers/extension';
import { CreateFrameResponseSchema } from 'src/frames/schema/frame-response.schema';

export class CreateFrameResponseDto extends createZodDto(
  CreateFrameResponseSchema,
) {}
