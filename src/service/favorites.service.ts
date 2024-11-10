import { Injectable, Inject } from '@nestjs/common';
import { IFavoritesRepository } from '../repository/interfaces/favorites.repository.interface';
import { ITrackRepository } from '../repository/interfaces/track.repository.interface';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { Track } from '../entity/track.entity';
import { Album } from '../entity/album.entity';
import { Artist } from '../entity/artist.entity';
import { BaseService } from './common/base.service';

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
  ) {
    super();
  }

  async getFavorites(): Promise<{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }> {
    const favorites = await this.favoritesRepository.getFavorites();

    const trackPromises = favorites.tracks.map((id) =>
      this.trackRepository.findById(id),
    );
    const albumPromises = favorites.albums.map((id) =>
      this.albumRepository.findById(id),
    );
    const artistPromises = favorites.artists.map((id) =>
      this.artistRepository.findById(id),
    );

    const tracks = (await Promise.all(trackPromises)).filter(
      (track): track is Track => track !== null,
    );
    const albums = (await Promise.all(albumPromises)).filter(
      (album): album is Album => album !== null,
    );
    const artists = (await Promise.all(artistPromises)).filter(
      (artist): artist is Artist => artist !== null,
    );

    return { tracks, albums, artists };
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
