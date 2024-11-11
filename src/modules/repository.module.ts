import { Module, Global } from '@nestjs/common';
import { TrackRepository } from '../repository/track.repository';
import { ArtistRepository } from '../repository/artist.repository';
import { AlbumRepository } from '../repository/album.repository';
import { FavoritesRepository } from 'src/repository/favorites.repository';
import { UserRepository } from '../repository/user.repository';
import { UserMapper } from 'src/mappers/user.mapper';
import { TrackMapper } from 'src/mappers/track.mapper';
import { AlbumMapper } from 'src/mappers/album.mapper';
import { ArtistMapper } from 'src/mappers/artist.mapper';
import { FavoritesMapper } from 'src/mappers/favorites.mapper';

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
    ArtistMapper,
    AlbumMapper,
    TrackMapper,
    UserMapper,
    FavoritesMapper,
    {
      provide: 'ArtistMapper',
      useExisting: ArtistMapper,
    },
    {
      provide: 'AlbumMapper',
      useExisting: AlbumMapper,
    },
    {
      provide: 'TrackMapper',
      useExisting: TrackMapper,
    },
    {
      provide: 'UserMapper',
      useExisting: UserMapper,
    },
    {
      provide: 'FavoritesMapper',
      useExisting: FavoritesMapper,
    },
  ],
  exports: [
    'TrackRepository',
    'AlbumRepository',
    'ArtistRepository',
    'FavoritesRepository',
    'UserRepository',
    'TrackMapper',
    'AlbumMapper',
    'ArtistMapper',
    'FavoritesMapper',
    'UserMapper',
  ],
})
export class RepositoryModule {}
