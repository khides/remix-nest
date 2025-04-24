import { SupabaseServerClient } from "~/supabase/supabase.server";

import {
  GetOrgIdByNameRequest,
  GetOrgIdByNameResponse,
  GetOrganizationsByUserIdRequest,
  GetOrganizationsByUserIdResponse,
} from "~/supabase/__generated__/supabase.interface";
import { log } from "node:console";

export class OrganizationRepository {
  constructor(private supabase: SupabaseServerClient) {}

  async getOrgIdByName(request: GetOrgIdByNameRequest): Promise<{
    response?: GetOrgIdByNameResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_org_id_by_name",
      request
    );
    if (error) {
      throw new Error(`Error fetching org id: ${error.message}`);
    }
    return {
      response: data as GetOrgIdByNameResponse,
    };
  }

  async getOrganizationsByUserId(
    request: GetOrganizationsByUserIdRequest
  ): Promise<{
    response?: GetOrganizationsByUserIdResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_organizations_by_user_id",
      request
    );

    if (!data || error) {
      throw new Error(`Error fetching organization: ${error?.message}`);
    }

    return {
      response: data as GetOrganizationsByUserIdResponse,
    };
  }

  async getOrganizationById(orgId: string) {
    const { data, error } = await this.supabase.client
      .from("organizations")
      .select("*")
      .eq("id", orgId)
      .single();
    return { data, error };
  }
}
