import {
  Injectable,
  Scope,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private client?: SupabaseClient;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getClient(): SupabaseClient {
    if (!this.client) {
      const token = this.request['supabaseAccessToken']; // ← ここで遅延取得
      if (!token) {
        throw new UnauthorizedException('No token found in request');
      }

      this.client = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        },
      );
    }

    return this.client;
  }
}
