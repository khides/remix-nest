import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { TopicsRepository } from './topics.repository';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { OwnersModule } from 'src/owners/owners.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { FramesModule } from 'src/frames/frames.module';

@Module({
  imports: [SupabaseModule, OwnersModule, ProjectsModule, FramesModule],
  controllers: [TopicsController],
  providers: [TopicsService, TopicsRepository],
  exports: [TopicsService],
})
export class TopicsModule {}
