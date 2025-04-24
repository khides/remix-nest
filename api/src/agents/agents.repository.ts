import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

import {
  CreateSuggestionRequest,
  CreateSuggestionResponse,
  GetSuggestionDetailsByIdsRequest,
  GetSuggestionDetailsByIdsResponse,
  UpdateSuggestionByIdRequest,
  UpdateSuggestionByIdResponse,
} from 'src/__generated__/supabase.interface';

@Injectable()
export class AgentsRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  private get client() {
    return this.supabaseService.getClient();
  }
  async updateSuggestionById(
    request: UpdateSuggestionByIdRequest,
  ): Promise<UpdateSuggestionByIdResponse> {
    const { data, error } = await this.client.rpc(
      'update_suggestion_by_id',
      request,
    );
    if (!data || error) {
      console.error(`Error updating suggestion: ${error?.message}`);
      throw new Error(`Error updating suggestion: ${error?.message}`);
    }
    return data as UpdateSuggestionByIdResponse;
  }

  async getSuggestionDetailsByIds(
    request: GetSuggestionDetailsByIdsRequest,
  ): Promise<GetSuggestionDetailsByIdsResponse> {
    const { data, error } = await this.client.rpc(
      'get_suggestion_details_by_ids',
      request,
    );
    if (!data || error) {
      console.error(`Error fetching suggestion details: ${error?.message}`);
      throw new Error(`Error fetching suggestion details: ${error?.message}`);
    }
    return data as GetSuggestionDetailsByIdsResponse;
  }

  async create_new_suggestion(
    request: CreateSuggestionRequest,
  ): Promise<CreateSuggestionResponse> {
    const { data, error } = await this.client.rpc('create_suggestion', request);

    if (!data || error) {
      console.error(`Error creating suggestion: ${error?.message}`);
      throw new Error(`Error creating suggestion: ${error?.message}`);
    }

    return data as CreateSuggestionResponse;
  }
}
