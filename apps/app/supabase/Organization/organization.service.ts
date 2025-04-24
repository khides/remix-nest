import { OrganizationRepository } from "~/supabase/Organization/organization.repository";
import { SupabaseServerClient } from "~/supabase/supabase.server";
import {
  GetOrgIdByNameRequest,
  GetOrganizationsByUserIdRequest,
} from "~/supabase/__generated__/supabase.interface";
import {
  GetOrgIdByNameModel,
  GetOrganizationsByUserIdModel,
  Org,
  Project,
  Frame,
  Topic,
  People,
  ActiveProject,
  PinnedProject,
} from "~/supabase/Organization/organization.model";
import { PostgrestError } from "@supabase/supabase-js";

export class OrganizationService {
  constructor(private supabase: SupabaseServerClient) {
    this.repository = new OrganizationRepository(supabase);
  }
  private repository: OrganizationRepository;

  /** org nameからorg idを取得
   * @param orgName
   * @returns org id
   */
  async getOrgIdByName({ orgName }: { orgName: string }): Promise<{
    response?: GetOrgIdByNameModel;
    error?: string;
  }> {
    const request: GetOrgIdByNameRequest = {
      org_name: orgName,
    };
    const result = await this.repository.getOrgIdByName(request);
    console.log("result", result);

    if (result.response || result.error) {
      console.error("Error fetching org id:", result.error);
      return { error: result.error ?? "unknown error" };
    }

    return { response: result.response };
  }

  /** user idからorg idを取得
   * @param userId
   * @returns org id
   */
  async getOrganizationsByUserId({ userId }: { userId: string }): Promise<{
    response?: GetOrganizationsByUserIdModel;
    error?: string;
  }> {
    const request: GetOrganizationsByUserIdRequest = {
      p_user_id: userId,
    };
    const result = await this.repository.getOrganizationsByUserId(request);
    if (!result.response || result.error) {
      console.error("Error fetching organization:", result.error);
      return { error: result.error ?? "unknown error" };
    }

    return { response: result.response };
  }

  /** org idからorg情報を取得
   * @param orgId
   * @returns org情報
   */
  async getOrganizationById({ orgId }: { orgId: string }): Promise<{
    response?: Org;
    error?: string;
  }> {
    const { data, error } = await this.repository.getOrganizationById(orgId);
    if (error || !data) {
      console.error(
        "Error fetching organization by id:",
        (error as PostgrestError).message
      );
      return { error: (error as PostgrestError).message ?? "unknown error" };
    }

    // dataがundefinedでないことを確認
    if (!data || !data.description) {
      console.error("Organization data is incomplete:", data);
      return { error: "Organization data is incomplete" };
    }

    console.log("Fetched Organization:", data); // 取得したOrgをターミナルに出力

    return { response: data };
  }

  async getOrganizations(): Promise<Org[]> {
    const { data, error } = await this.supabase.client
      .from("organizations")
      .select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data as Org[];
  }

  async getActiveProjects(orgId: string): Promise<ActiveProject[]> {
    const { data, error } = await this.supabase.client
      .from("org_projects")
      .select("*") // すべてのカラムを選択
      .eq("org_id", orgId)
      .eq("status_flag", true);
    if (error) {
      throw new Error(error.message);
    }

    const projectIds = data.map(
      (item: { project_id: string }) => item.project_id
    );

    const { data: projects, error: projectError } = await this.supabase.client
      .from("projects")
      .select("*")
      .in("id", projectIds);
    if (projectError) {
      throw new Error(projectError.message);
    }

    return projects.map((project: Project) => ({
      ...project,
      status: "active", // 適切なステータスを設定
    })) as ActiveProject[];
  }

  async getPinnedProjects(orgId: string): Promise<PinnedProject[]> {
    const { data, error } = await this.supabase.client
      .from("org_projects")
      .select("*") // すべてのカラムを選択
      .eq("org_id", orgId)
      .eq("pin_flag", true);
    if (error) {
      throw new Error(error.message);
    }

    const projectIds = data.map(
      (item: { project_id: string }) => item.project_id
    );

    const { data: projects, error: projectError } = await this.supabase.client
      .from("projects")
      .select("*")
      .in("id", projectIds);
    if (projectError) {
      throw new Error(projectError.message);
    }

    return projects.map((project: Project) => ({
      ...project,
      status: "pinned", // 適切なステータスを設定
    })) as PinnedProject[];
  }

  async getFrames(orgId: string): Promise<Frame[]> {
    const { data, error } = await this.supabase.client
      .from("frames")
      .select("*")
      .eq("org_id", orgId);
    if (error) {
      throw new Error(error.message);
    }
    return data as Frame[];
  }

  async getTopics(orgId: string): Promise<Topic[]> {
    const { data, error } = await this.supabase.client
      .from("topics")
      .select("*")
      .eq("org_id", orgId);
    if (error) {
      throw new Error(error.message);
    }
    return data as Topic[];
  }

  async getUsersByOrgId(orgId: string): Promise<People[]> {
    const { data, error } = await this.supabase.client
      .from("organization_users")
      .select("user_id")
      .eq("organization_id", orgId);
    if (error) {
      throw new Error(error.message);
    }

    const userIds = data.map((item: { user_id: string }) => item.user_id);

    const { data: people, error: userError } = await this.supabase.client
      .from("owners")
      .select("*")
      .in("owner_ref", userIds); // カラム名を owner_ref に変更
    if (userError) {
      throw new Error(userError.message);
    }

    return people as People[];
  }

  async getPeopleByOrgId(orgId: string): Promise<People[]> {
    const { data, error } = await this.supabase.client
      .from("organization_users")
      .select("user_id")
      .eq("organization_id", orgId);
    if (error) {
      throw new Error(error.message);
    }

    const userIds = data.map((item: { user_id: string }) => item.user_id);

    const { data: people, error: userError } = await this.supabase.client
      .from("profiles")
      .select("*")
      .in("id", userIds);
    if (userError) {
      throw new Error(userError.message);
    }

    return people as People[];
  }
}
