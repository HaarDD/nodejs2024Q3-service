import { Injectable, Inject } from '@nestjs/common';
import { Favorites, User } from '@prisma/client';
import { IFavoritesRepository } from './favorites.repository.interface';
import { ITrackRepository } from '../track/track.repository.interface';
import { IAlbumRepository } from '../album/album.repository.interface';
import { IArtistRepository } from '../artist/artist.repository.interface';
import { BaseService } from '../common/service/base.service';
import { FavoritesResponseDto } from './dto/favorites.response.dto';
import { IMapper } from '../common/mapper/mapper-to-dto.interface';
import { IUserRepository } from 'src/user/user.repository.interface';

@Injectable()
export class FavoritesService extends BaseService {
  private mockedUser: User = null;

  constructor(
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: IFavoritesRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: ITrackRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
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

  async getFavorites(userId: string): Promise<FavoritesResponseDto> {
    const favorites = await this.favoritesRepository.getFavorites(userId);
    return this.favoritesMapper.mapToDto(favorites);
  }

  async addTrackToFavorites(userId: string, trackId: string): Promise<void> {
    const track = await this.trackRepository.findById(trackId);
    if (!track) {
      this.unprocessableEntityException('Track');
    }

    await this.favoritesRepository.addTrack(userId, trackId);
  }

  async addAlbumToFavorites(userId: string, albumId: string): Promise<void> {
    const album = await this.albumRepository.findById(albumId);
    if (!album) {
      this.unprocessableEntityException('Album');
    }

    await this.favoritesRepository.addAlbum(userId, albumId);
  }

  async addArtistToFavorites(userId: string, artistId: string): Promise<void> {
    const artist = await this.artistRepository.findById(artistId);
    if (!artist) {
      this.unprocessableEntityException('Artist');
    }

    await this.favoritesRepository.addArtist(userId, artistId);
  }

  async removeTrackFromFavorites(
    userId: string,
    trackId: string,
  ): Promise<void> {
    const isFavorite = await this.favoritesRepository.isTrackFavorite(
      userId,
      trackId,
    );
    if (!isFavorite) {
      this.notFoundException('Track');
    }

    await this.favoritesRepository.removeTrack(userId, trackId);
  }

  async removeAlbumFromFavorites(
    userId: string,
    albumId: string,
  ): Promise<void> {
    const isFavorite = await this.favoritesRepository.isAlbumFavorite(
      userId,
      albumId,
    );
    if (!isFavorite) {
      this.notFoundException('Album');
    }

    await this.favoritesRepository.removeAlbum(userId, albumId);
  }

  async removeArtistFromFavorites(
    userId: string,
    artistId: string,
  ): Promise<void> {
    const isFavorite = await this.favoritesRepository.isArtistFavorite(
      userId,
      artistId,
    );
    if (!isFavorite) {
      this.notFoundException('Artist');
    }

    await this.favoritesRepository.removeArtist(userId, artistId);
  }
}
