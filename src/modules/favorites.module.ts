import { Module } from '@nestjs/common';
import { FavoritesService } from '../service/favorites.service';
import { FavoritesRepository } from '../repository/favorites.repository';
import { FavoritesController } from '../controller/favorites.controller';
import { RepositoryModule } from './repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    { provide: 'FavoritesRepository', useClass: FavoritesRepository },
  ],
})
export class FavoritesModule {}
