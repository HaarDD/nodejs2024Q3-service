import { Injectable } from '@nestjs/common';
import { Favorites, Artist, Album, Track } from '@prisma/client';
import { FavoritesResponseDto } from './dto/favorites.response.dto';
import { IMapper } from '../common/mapper/mapper-to-dto.interface';
import { ArtistMapper } from '../artist/artist.mapper';
import { AlbumMapper } from '../album/album.mapper';
import { TrackMapper } from '../track/track.mapper';

type FavoritesWithRelations = Favorites & {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};

@Injectable()
export class FavoritesMapper
  implements
    IMapper<FavoritesWithRelations, never, never, FavoritesResponseDto>
{
  constructor(
    private readonly artistMapper: ArtistMapper,
    private readonly albumMapper: AlbumMapper,
    private readonly trackMapper: TrackMapper,
  ) {}

  async mapToDto(
    favorites: FavoritesWithRelations,
  ): Promise<FavoritesResponseDto> {
    if (!favorites) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }

    return {
      artists: this.artistMapper.mapToDtos(favorites.artists),
      albums: this.albumMapper.mapToDtos(favorites.albums),
      tracks: this.trackMapper.mapToDtos(favorites.tracks),
    };
  }

  async mapToDtos(
    entities: FavoritesWithRelations[],
  ): Promise<FavoritesResponseDto[]> {
    return Promise.all(entities.map((entity) => this.mapToDto(entity)));
  }

  mapFromCreateDto(): never {
    throw new Error('Create operation not supported for Favorites');
  }

  mapFromUpdateDto(): never {
    throw new Error('Update operation not supported for Favorites');
  }
}
