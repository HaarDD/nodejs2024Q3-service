import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { RepositoryModule } from '../common/module/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
