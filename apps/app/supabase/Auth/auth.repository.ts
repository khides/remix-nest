import { SupabaseServerClient } from "~/supabase/supabase.server";
import {
  GetUserInfoByEmailRequest,
  GetUserInfoByEmailResponse,
  GetUserNameByEmailRequest,
  GetUserNameByEmailResponse,
  GetEmailByUserNameRequest,
  GetEmailByUserNameResponse,
} from "~/supabase/__generated__/supabase.interface";

export class AuthRepository {
  constructor(private supabase: SupabaseServerClient) {}

  async getUserLoggedIn(token?: string): Promise<{
    userId: string;
    email: string;
    username: string;
  } | null> {
    try {
      const { data, error } = await this.supabase.client.auth.getUser(token);

      if (error || !data?.user) {
        console.error("Error fetching user:", error?.message);
        return null;
      }

      const user = data.user;

      return {
        userId: user.id,
        email: user.email as string,
        username: user.user_metadata?.user_name || null,
      };
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  }

  async getUsernameByEmail(request: GetUserNameByEmailRequest): Promise<{
    response?: GetUserNameByEmailResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_user_name_by_email",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetUserNameByEmailResponse,
    };
  }

  async getUserInfoByEmail(request: GetUserInfoByEmailRequest): Promise<{
    response?: GetUserInfoByEmailResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_user_info_by_email",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetUserInfoByEmailResponse,
    };
  }

  async getEmailByUserName(request: GetEmailByUserNameRequest): Promise<{
    response?: GetEmailByUserNameResponse;
    error?: string;
  }> {
    const { data, error } = await this.supabase.client.rpc(
      "get_email_by_user_name",
      request
    );
    if (error) {
      return { error: error.message };
    }
    return {
      response: data as GetEmailByUserNameResponse,
    };
  }
}
