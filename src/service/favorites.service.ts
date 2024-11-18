import { Injectable, Inject } from '@nestjs/common';
import { Favorites, User } from '@prisma/client';
import { IFavoritesRepository } from '../repository/interfaces/favorites.repository.interface';
import { ITrackRepository } from '../repository/interfaces/track.repository.interface';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { BaseService } from './common/base.service';
import { FavoritesResponseDto } from '../dto/response/favorites.response.dto';
import { IMapper } from '../mappers/common/mapper-to-dto.interface';
import { IUserRepository } from 'src/repository/interfaces/user.repository.interface';

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

  // TODO: mocked until next task
  private async ensureMockedUser(): Promise<User> {
    if (!this.mockedUser) {
      const existingUser = await this.userRepository.findFirst();
      if (existingUser) {
        this.mockedUser = existingUser;
      } else {
        this.mockedUser = await this.userRepository.create({
          login: 'MOCK_USER',
          password: 'MOCK_PASSWORD',
          version: 1,
        });
      }
    }
    return this.mockedUser;
  }

  async getFavorites(): Promise<FavoritesResponseDto> {
    const user = await this.ensureMockedUser();

    const favorites = await this.favoritesRepository.getFavorites(user.id);
    return this.favoritesMapper.mapToDto(favorites);
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    const track = await this.trackRepository.findById(trackId);
    if (!track) {
      this.unprocessableEntityException('Track');
    }

    const user = await this.ensureMockedUser();

    await this.favoritesRepository.addTrack(user.id, trackId);
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    const album = await this.albumRepository.findById(albumId);
    if (!album) {
      this.unprocessableEntityException('Album');
    }

    const user = await this.ensureMockedUser();

    await this.favoritesRepository.addAlbum(user.id, albumId);
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    const artist = await this.artistRepository.findById(artistId);
    if (!artist) {
      this.unprocessableEntityException('Artist');
    }

    const user = await this.ensureMockedUser();

    await this.favoritesRepository.addArtist(user.id, artistId);
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    const user = await this.ensureMockedUser();

    const isFavorite = await this.favoritesRepository.isTrackFavorite(
      user.id,
      trackId,
    );
    if (!isFavorite) {
      this.notFoundException('Track');
    }

    await this.favoritesRepository.removeTrack(user.id, trackId);
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    const user = await this.ensureMockedUser();

    const isFavorite = await this.favoritesRepository.isAlbumFavorite(
      user.id,
      albumId,
    );
    if (!isFavorite) {
      this.notFoundException('Album');
    }

    await this.favoritesRepository.removeAlbum(user.id, albumId);
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    const user = await this.ensureMockedUser();

    const isFavorite = await this.favoritesRepository.isArtistFavorite(
      user.id,
      artistId,
    );
    if (!isFavorite) {
      this.notFoundException('Artist');
    }

    await this.favoritesRepository.removeArtist(user.id, artistId);
  }
}
