import { Injectable, Inject } from '@nestjs/common';
import { IFavoritesRepository } from '../repository/interfaces/favorites.repository.interface';
import { ITrackRepository } from '../repository/interfaces/track.repository.interface';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { BaseService } from './common/base.service';
import { FavoritesResponseDto } from 'src/dto/response/favorites.response.dto';
import { IMapper } from 'src/mappers/common/mapper-to-dto.interface';
import { Favorites } from 'src/entity/favorites.entity';

@Injectable()
export class FavoritesService extends BaseService {
  constructor(
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: IFavoritesRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: ITrackRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('FavoritesMapper')
    private readonly favoritesMapper: IMapper<
      Favorites,
      never,
      never,
      FavoritesResponseDto
    >,
  ) {
    super();
  }

  async getFavorites(): Promise<FavoritesResponseDto> {
    const favorites = await this.favoritesRepository.getFavorites();
    return this.favoritesMapper.mapToDto(favorites);
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    const track = await this.trackRepository.findById(trackId);
    if (!track) {
      this.unprocessableEntityException('Track');
    }

    await this.favoritesRepository.addTrack(trackId);
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    const album = await this.albumRepository.findById(albumId);
    if (!album) {
      this.unprocessableEntityException('Album');
    }

    await this.favoritesRepository.addAlbum(albumId);
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    const artist = await this.artistRepository.findById(artistId);
    if (!artist) {
      this.unprocessableEntityException('Artist');
    }

    await this.favoritesRepository.addArtist(artistId);
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    const isFavorite = await this.favoritesRepository.isTrackFavorite(trackId);
    if (!isFavorite) {
      this.notFoundException('Track');
    }

    await this.favoritesRepository.removeTrack(trackId);
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    const isFavorite = await this.favoritesRepository.isAlbumFavorite(albumId);
    if (!isFavorite) {
      this.notFoundException('Album');
    }

    await this.favoritesRepository.removeAlbum(albumId);
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    const isFavorite = await this.favoritesRepository.isArtistFavorite(
      artistId,
    );
    if (!isFavorite) {
      this.notFoundException('Artist');
    }

    await this.favoritesRepository.removeArtist(artistId);
  }
}