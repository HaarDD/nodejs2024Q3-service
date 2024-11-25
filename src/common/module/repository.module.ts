import { Module } from '@nestjs/common';
import { TrackRepository } from '../../track/track.repository';
import { ArtistRepository } from '../../artist/artist.repository';
import { AlbumRepository } from '../../album/album.repository';
import { FavoritesRepository } from '../../favorites/favorites.repository';
import { UserRepository } from '../../user/user.repository';
import { UserMapper } from '../../user/user.mapper';
import { TrackMapper } from '../../track/track.mapper';
import { AlbumMapper } from '../../album/album.mapper';
import { ArtistMapper } from '../../artist/artist.mapper';
import { FavoritesMapper } from '../../favorites/favorites.mapper';

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
