import { Module } from '@nestjs/common';
import { FavoritesService } from '../service/favorites.service';
import { FavoritesController } from '../controller/favorites.controller';
import { RepositoryModule } from './repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
