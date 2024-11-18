import { Module } from '@nestjs/common';
import { ArtistService } from '../service/artist.service';
import { ArtistController } from '../controller/artist.controller';
import { RepositoryModule } from './repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
