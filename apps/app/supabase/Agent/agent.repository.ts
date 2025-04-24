import {
  CreateSuggestionRequest,
  CreateSuggestionResponse,
  GetSuggestionDetailsByIdsRequest,
  GetSuggestionDetailsByIdsResponse,
  UpdateSuggestionByIdRequest,
  UpdateSuggestionByIdResponse,
} from "~/supabase/__generated__/supabase.interface";
import { SupabaseServerClient } from "~/supabase/supabase.server";

export class AgentRepository {
  constructor(private supabase: SupabaseServerClient) {}

  async updateSuggestionById(request: UpdateSuggestionByIdRequest): Promise<{
    response?: UpdateSuggestionByIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "update_suggestion_by_id",
      request
    );
    if (!data || error) {
      throw new Error(`Error updating suggestion: ${error?.message}`);
    }
    return {
      response: data as UpdateSuggestionByIdResponse,
    };
  }

  async getSuggestionDetailsByIds(
    request: GetSuggestionDetailsByIdsRequest
  ): Promise<{
    response?: GetSuggestionDetailsByIdsResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_suggestion_details_by_ids",
      request
    );
    if (!data || error) {
      throw new Error(`Error fetching suggestion details: ${error?.message}`);
    }
    return {
      response: data as GetSuggestionDetailsByIdsResponse,
    };
  }

  async create_new_suggestion(request: CreateSuggestionRequest): Promise<{
    response?: CreateSuggestionResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "create_suggestion",
      request
    );

    if (!data || error) {
      throw new Error(`Error creating suggestion: ${error?.message}`);
    }

    return {
      response: data as CreateSuggestionResponse,
    };
  }
}
