import { AuthRepository } from "~/supabase/Auth/auth.repository";
import { SupabaseServerClient } from "~/supabase/supabase.server";
import {
  GetUserLoggedIn,
  GetUserInfoByEmail,
} from "~/supabase/Auth/auth.model";
import {
  GetUserInfoByEmailRequest,
  GetEmailByUserNameRequest,
  GetUserNameByEmailRequest,
} from "~/supabase/__generated__/supabase.interface";
import { redirect } from "react-router";
import { EmailOtpType } from "@supabase/supabase-js";

export class AuthService {
  constructor(supabase: SupabaseServerClient) {
    this.repository = new AuthRepository(supabase);
    this.supabase = supabase;
  }
  private repository: AuthRepository;
  private supabase: SupabaseServerClient;

  /** ユーザーがログインしていたらそのユーザー情報を取得 */
  async getUserLoggedIn(token?: string): Promise<{
    response?: GetUserLoggedIn;
    error?: string;
  }> {
    const result = await this.repository.getUserLoggedIn(token);
    if (!result) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching user logged in:", result);
      return { error: "Error fetching user logged in" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: GetUserLoggedIn = {
      userId: result.userId,
      email: result.email,
      username: result.username,
    };
    return {
      response: data,
    };
  }

  /** メールアドレスからユーザー上法を取得 */
  async getUserInfoByEmail(email: string): Promise<{
    data?: GetUserInfoByEmail;
    error?: string;
  }> {
    const request: GetUserInfoByEmailRequest = {
      p_email: email,
    };
    const result = await this.repository.getUserInfoByEmail(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching userinfo by emial:", result.error);
      return { error: result.error ?? "unknown error" };
    }
    // 追加のビジネスロジックをここに記述可能
    const data: { userName: string; userId: string } = {
      userName: result.response[0].user_name as string,
      userId: result.response[0].user_id as string,
    };
    return {
      data: data,
    };
  }

  /** ユーザー名からメールアドレスを取得 */
  async getEmailByUserName({ userName }: { userName: string }): Promise<{
    response?: {
      email?: string;
    };
    error?: string;
  }> {
    const request: GetEmailByUserNameRequest = {
      p_user_name: userName,
    };
    const result = await this.repository.getEmailByUserName(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching email by username:", result.error);
      return { error: result.error ?? "unknown error" };
    } else if (result.response.length === 0) {
      // ユーザー名が見つからない場合の処理
      console.log("No user found with the provided username");
      return { response: { email: undefined } };
    }

    // 追加のビジネスロジックをここに記述可能
    const data: { email: string } = {
      email: result.response[0].email as string,
    };
    return {
      response: data,
    };
  }
  async getUsernameByEmail({ email }: { email: string }): Promise<{
    response?: {
      userName?: string;
    };
    error?: string;
  }> {
    const request: GetUserNameByEmailRequest = {
      p_email: email,
    };
    const result = await this.repository.getUsernameByEmail(request);
    if (!result.response) {
      // エラーハンドリングなどの追加ロジックをここに記述可能
      console.error("Error fetching username by email:", result.error);
      return { error: result.error ?? "unknown error" };
    } else if (result.response.length === 0) {
      // メールアドレスが見つからない場合の処理
      console.log("No user found with the provided email");
      return { response: { userName: undefined } };
    }

    // 追加のビジネスロジックをここに記述可能
    const data: { userName: string } = {
      userName: result.response[0].user_name as string,
    };
    return {
      response: data,
    };
  }
  async signUpWithCredentials(request: Request, successRedirectPath: string) {
    const formData = await request.formData();
    const userName = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const usernameExists = await this.getEmailByUserName({ userName });
    if (usernameExists.response?.email) {
      return { error: `Username "${userName}" is already in use` };
    }

    const emailExists = await this.getUsernameByEmail({ email });
    if (emailExists.response?.userName) {
      return { error: `Email "${email}" is already in use` };
    }

    const { error } = await this.supabase.client.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: userName,
          email,
          avatar_url: "",
        },
      },
    });

    console.log("error", error);

    if (!error) {
      throw redirect(successRedirectPath, { headers: this.supabase.headers });
    }
    return { error: error.message };
  }
  async signInWithPassword(request: Request, successRedirectPath: string) {
    const formData = await request.formData();
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    let email: string | null = null;
    const isEmail = /\S+@\S+\.\S+/.test(identifier);

    if (isEmail) {
      email = identifier;
    } else {
      const getEmailByUserName = await this.getEmailByUserName({
        userName: identifier,
      });
      email = getEmailByUserName.response?.email ?? null;

      if (!email) {
        return { error: `Username "${identifier}" not found` };
      }
    }

    const { error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      throw redirect(successRedirectPath, { headers: this.supabase.headers });
    }
    return { error: error.message };
  }

  async signOut(successRedirectPath: string = "/") {
    const { error } = await this.supabase.client.auth.signOut();

    if (!error) {
      throw redirect(successRedirectPath, { headers: this.supabase.headers });
    }
    return { error: error.message };
  }

  // ユーザーデータを取得するサーバーサイド関数
  async getUserData() {
    // サーバーサイドでユーザー情報を取得
    const { data: userData, error: userError } =
      await this.supabase.client.auth.getUser();

    if (userError || !userData?.user) {
      throw new Error("User not found or not authenticated");
    }
    return userData.user;
  }

  async resetPassword(request: Request) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const { error } = await this.supabase.client.auth.resetPasswordForEmail(
      email
    );
    if (!error) {
      return { success: true };
    }
    return { error: error.message };
  }

  async updateUserPassword(request: Request) {
    const formData = await request.formData();
    const newPassword = formData.get("password") as string;

    const { error } = await this.supabase.client.auth.updateUser({
      password: newPassword,
    });

    if (!error) {
      return { success: true };
    }

    return { success: false, error: error.message };
  }

  async authConfirm(request: Request) {
    const requestUrl = new URL(request.url);
    const token_hash = requestUrl.searchParams.get("token_hash");
    const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
    const next = requestUrl.searchParams.get("next") || "/";
    if (token_hash && type) {
      const { error } = await this.supabase.client.auth.verifyOtp({
        type,
        token_hash,
      });

      if (!error) {
        return redirect(next, { headers: this.supabase.headers });
      }
    }

    // return redirect("/auth/auth-code-error", { headers });
    return redirect("/", { headers: this.supabase.headers });
  }
}
