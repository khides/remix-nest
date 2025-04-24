import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export interface SupabaseUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
  [key: string]: any;
}

export interface AuthenticatedRequest extends Request {
  user: SupabaseUser;
  supabaseAccessToken: string;
}

export const ResponseSchema = z.object({
  statusCode: z.number().describe('ステータスコード'),
  message: z.string().describe('メッセージ'),
});
export class ResponseDto extends createZodDto(ResponseSchema) {}

type Literal = boolean | null | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
export const JsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(JsonSchema), z.record(JsonSchema)]),
);

export function ApiOperationTag({
  summary,
  description,
}: {
  summary?: string;
  description?: string;
}): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const controllerName = target.constructor.name;
    const methodName = propertyKey.toString();
    const _summary = `${controllerName}_${methodName} / ${summary}`;
    ApiOperation({ summary: _summary, description: description })(
      target,
      propertyKey,
      descriptor,
    );
  };
}
