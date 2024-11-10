import {
  Injectable,
  Inject,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IFavoritesRepository } from '../repository/interfaces/favorites.repository.interface';
import { ITrackRepository } from '../repository/interfaces/track.repository.interface';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { Track } from '../entity/track.entity';
import { Album } from '../entity/album.entity';
import { Artist } from '../entity/artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: IFavoritesRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: ITrackRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
  ) {}

  async getFavorites(): Promise<{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }> {
    const favorites = await this.favoritesRepository.getFavorites();

    const tracks = await Promise.all(
      favorites.tracks.map(async (id) => {
        const track = await this.trackRepository.findById(id);
        return track;
      }),
    );

    const albums = await Promise.all(
      favorites.albums.map(async (id) => {
        const album = await this.albumRepository.findById(id);
        return album;
      }),
    );

    const artists = await Promise.all(
      favorites.artists.map(async (id) => {
        const artist = await this.artistRepository.findById(id);
        return artist;
      }),
    );

    return {
      tracks: tracks.filter((track): track is Track => track !== null),
      albums: albums.filter((album): album is Album => album !== null),
      artists: artists.filter((artist): artist is Artist => artist !== null),
    };
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    const track = await this.trackRepository.findById(trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    await this.favoritesRepository.addTrack(trackId);
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    const album = await this.albumRepository.findById(albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    await this.favoritesRepository.addAlbum(albumId);
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    const artist = await this.artistRepository.findById(artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    await this.favoritesRepository.addArtist(artistId);
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    const isFavorite = await this.favoritesRepository.isTrackFavorite(trackId);
    if (!isFavorite) {
      throw new NotFoundException('Track is not in favorites');
    }

    await this.favoritesRepository.removeTrack(trackId);
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    const isFavorite = await this.favoritesRepository.isAlbumFavorite(albumId);
    if (!isFavorite) {
      throw new NotFoundException('Album is not in favorites');
    }

    await this.favoritesRepository.removeAlbum(albumId);
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    const isFavorite = await this.favoritesRepository.isArtistFavorite(
      artistId,
    );
    if (!isFavorite) {
      throw new NotFoundException('Artist is not in favorites');
    }

    await this.favoritesRepository.removeArtist(artistId);
  }
}
