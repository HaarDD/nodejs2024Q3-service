import { Module } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { TrackController } from '../track/track.controller';
import { RepositoryModule } from '../common/module/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
