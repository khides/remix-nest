import { Module } from '@nestjs/common';
import { FramesController } from './frames.controller';
import { FramesService } from './frames.service';
import { FramesRepository } from './frames.repository';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { OwnersModule } from 'src/owners/owners.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [SupabaseModule, OwnersModule, ProjectsModule],
  controllers: [FramesController],
  providers: [FramesService, FramesRepository],
  exports: [FramesService],
})
export class FramesModule {}
