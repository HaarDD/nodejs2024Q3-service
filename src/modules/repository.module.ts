// repository.module.ts
import { Module, Global } from '@nestjs/common';
import { TrackRepository } from '../repository/track.repository';
import { ArtistRepository } from '../repository/artist.repository';
import { AlbumRepository } from '../repository/album.repository';
import { FavoritesRepository } from 'src/repository/favorites.repository';
import { UserRepository } from '../repository/user.repository';

@Global()
@Module({
  providers: [
    {
      provide: 'TrackRepository',
      useClass: TrackRepository,
    },
    {
      provide: 'AlbumRepository',
      useClass: AlbumRepository,
    },
    {
      provide: 'ArtistRepository',
      useClass: ArtistRepository,
    },
    {
      provide: 'FavoritesRepository',
      useClass: FavoritesRepository,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [
    'TrackRepository',
    'AlbumRepository',
    'ArtistRepository',
    'FavoritesRepository',
    'UserRepository',
  ],
})
export class RepositoryModule {}
