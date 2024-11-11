import { Module } from '@nestjs/common';
import { AlbumService } from '../service/album.service';
import { AlbumController } from '../controller/album.controller';
import { RepositoryModule } from './repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
