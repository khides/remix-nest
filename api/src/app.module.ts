import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OwnersModule } from './owners/owners.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TopicsModule } from 'src/topics/topics.module';
import { FramesModule } from 'src/frames/frames.module';
import { AgentsModule } from 'src/agents/agents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OwnersModule,
    ProjectsModule,
    TopicsModule,
    FramesModule,
    AgentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
