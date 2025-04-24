import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsRepository } from './projects.repository';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  imports: [SupabaseModule, OwnersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
  exports: [ProjectsService],
})
export class ProjectsModule {}
