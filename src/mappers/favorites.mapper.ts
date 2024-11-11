import { Injectable, Inject } from '@nestjs/common';
import { Favorites } from '../entity/favorites.entity';
import { FavoritesResponseDto } from '../dto/response/favorites.response.dto';
import { IMapper } from './common/mapper-to-dto.interface';
import { ArtistMapper } from './artist.mapper';
import { AlbumMapper } from './album.mapper';
import { TrackMapper } from './track.mapper';
import { ITrackRepository } from '../repository/interfaces/track.repository.interface';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { Album } from 'src/entity/album.entity';
import { Track } from 'src/entity/track.entity';
import { Artist } from 'src/entity/artist.entity';

@Injectable()
export class FavoritesMapper
  implements IMapper<Favorites, never, never, FavoritesResponseDto>
{
  constructor(
    private readonly artistMapper: ArtistMapper,
    private readonly albumMapper: AlbumMapper,
    private readonly trackMapper: TrackMapper,
    @Inject('TrackRepository')
    private readonly trackRepository: ITrackRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
  ) {}

  async mapToDto(favorites: Favorites): Promise<FavoritesResponseDto> {
    const [tracks, albums, artists] = await Promise.all([
      this.getTracksFromIds(favorites.tracks),
      this.getAlbumsFromIds(favorites.albums),
      this.getArtistsFromIds(favorites.artists),
    ]);

    return {
      tracks: this.trackMapper.mapToDtos(tracks),
      albums: this.albumMapper.mapToDtos(albums),
      artists: this.artistMapper.mapToDtos(artists),
    };
  }

  async mapToDtos(entities: Favorites[]): Promise<FavoritesResponseDto[]> {
    return Promise.all(entities.map((entity) => this.mapToDto(entity)));
  }

  mapFromCreateDto(): Favorites {
    throw new Error('Create operation not supported for Favorites');
  }

  mapFromUpdateDto(): Favorites {
    throw new Error('Update operation not supported for Favorites');
  }

  private async getTracksFromIds(ids: string[]) {
    const tracks = await Promise.all(
      ids.map((id) => this.trackRepository.findById(id)),
    );
    return tracks.filter((track): track is Track => track !== null);
  }

  private async getAlbumsFromIds(ids: string[]) {
    const albums = await Promise.all(
      ids.map((id) => this.albumRepository.findById(id)),
    );
    return albums.filter((album): album is Album => album !== null);
  }

  private async getArtistsFromIds(ids: string[]) {
    const artists = await Promise.all(
      ids.map((id) => this.artistRepository.findById(id)),
    );
    return artists.filter((artist): artist is Artist => artist !== null);
  }
}
