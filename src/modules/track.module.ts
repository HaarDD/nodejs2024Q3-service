import { Module } from '@nestjs/common';
import { TrackService } from '../service/track.service';
import { TrackController } from '../controller/track.controller';
import { RepositoryModule } from './repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
