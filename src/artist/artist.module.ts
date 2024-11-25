import { Module } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { ArtistController } from '../artist/artist.controller';
import { RepositoryModule } from '../common/module/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
