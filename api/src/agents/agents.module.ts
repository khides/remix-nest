import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { AgentsService } from 'src/agents/agents.service';
import { AgentsRepository } from 'src/agents/agents.repository';
import { FramesModule } from 'src/frames/frames.module';
import { TopicsModule } from 'src/topics/topics.module';

@Module({
  imports: [SupabaseModule, FramesModule, TopicsModule],
  controllers: [AgentsController],
  providers: [AgentsService, AgentsRepository],
})
export class AgentsModule {}
