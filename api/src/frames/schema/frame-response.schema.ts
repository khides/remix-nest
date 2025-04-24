import { ResponseSchema } from 'helpers/extension';
import {
  CreateFrameSchema,
  UpdateFrameAttributeSchema,
} from 'src/frames/schema/frame.schema';
import { z } from 'zod';

export const CreateFrameResponseSchema = ResponseSchema.extend({
  data: CreateFrameSchema,
});
