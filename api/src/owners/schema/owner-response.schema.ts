import { ResponseSchema } from 'helpers/extension';
import {
  GetUserAvatarSchema,
  OwnerSchema,
  UserSchema,
} from 'src/owners/schema/owner.schema';

export const GetOwnerResponseSchema = ResponseSchema.extend({
  data: UserSchema,
});

export const GetUserAvatarResponseSchema = ResponseSchema.extend({
  data: GetUserAvatarSchema,
});
