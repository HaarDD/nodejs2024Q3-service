import { Module } from '@nestjs/common';
import { TrackRepository } from '../repository/track.repository';
import { ArtistRepository } from '../repository/artist.repository';
import { AlbumRepository } from '../repository/album.repository';
import { FavoritesRepository } from '../repository/favorites.repository';
import { UserRepository } from '../repository/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { TrackMapper } from '../mappers/track.mapper';
import { AlbumMapper } from '../mappers/album.mapper';
import { ArtistMapper } from '../mappers/artist.mapper';
import { FavoritesMapper } from '../mappers/favorites.mapper';

@Module({
  providers: [
    UserMapper,
    TrackMapper,
    AlbumMapper,
    ArtistMapper,
    FavoritesMapper,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
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
      provide: 'UserMapper',
      useExisting: UserMapper,
    },
    {
      provide: 'TrackMapper',
      useExisting: TrackMapper,
    },
    {
      provide: 'AlbumMapper',
      useExisting: AlbumMapper,
    },
    {
      provide: 'ArtistMapper',
      useExisting: ArtistMapper,
    },
    {
      provide: 'FavoritesMapper',
      useExisting: FavoritesMapper,
    },
  ],
  exports: [
    'UserRepository',
    'TrackRepository',
    'AlbumRepository',
    'ArtistRepository',
    'FavoritesRepository',
    'UserMapper',
    'TrackMapper',
    'AlbumMapper',
    'ArtistMapper',
    'FavoritesMapper',
  ],
})
export class RepositoryModule {}
