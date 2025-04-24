import { AuthService } from "~/supabase/Auth/auth.service";
import { OwnerService } from "~/supabase/Owner/owner.service";
import { ProjectService } from "~/supabase/Project/project.service";
import { createSupabaseServerClient } from "~/supabase/supabase.server";
import { TopicsService } from "~/supabase/Topics/topics.service";

export class SupabaseService {
  private supabase: ReturnType<typeof createSupabaseServerClient>;
  public authService: AuthService;
  public projectService: ProjectService;
  public topicsService: TopicsService;
  public ownerService: OwnerService;

  constructor(request: Request) {
    this.supabase = createSupabaseServerClient(request);
    this.authService = new AuthService(this.supabase);
    this.projectService = new ProjectService(this.supabase);
    this.topicsService = new TopicsService(this.supabase);
    this.ownerService = new OwnerService(this.supabase);
  }

  async getUserFromRequest(
    request: Request
  ): Promise<{ user?: any; email?: string }> {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return {};

    const userResult = await this.authService.getUserLoggedIn(token);
    if (!userResult.response) return {};

    const emailResult = await this.authService.getEmailByUserName({
      userName: userResult.response.username,
    });
    if (!emailResult.response) return {};

    return { user: userResult.response, email: emailResult.response.email };
  }

  async getOwnerIdByName(ownerName: string): Promise<string | null> {
    const ownerResult = await this.ownerService.getOwnerIdByName({ ownerName });
    return ownerResult.response?.ownerId ?? null;
  }
}
