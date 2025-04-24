import { Module } from '@nestjs/common';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { OwnersRepository } from './owners.repository';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [OwnersController],
  providers: [OwnersService, OwnersRepository],
  exports: [OwnersService],
})
export class OwnersModule {}
