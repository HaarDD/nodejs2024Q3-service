import { Injectable } from '@nestjs/common';
import { IFavoritesRepository } from './interfaces/favorites.repository.interface';
import { Favorites } from '../entity/favorites.entity';

@Injectable()
export class FavoritesRepository implements IFavoritesRepository {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getFavorites(): Promise<Favorites> {
    return this.favorites;
  }

  async addTrack(trackId: string): Promise<void> {
    this.favorites.tracks.push(trackId);
  }

  async addAlbum(albumId: string): Promise<void> {
    this.favorites.albums.push(albumId);
  }

  async addArtist(artistId: string): Promise<void> {
    this.favorites.artists.push(artistId);
  }

  async removeTrack(trackId: string): Promise<void> {
    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== trackId,
    );
  }

  async removeAlbum(albumId: string): Promise<void> {
    this.favorites.albums = this.favorites.albums.filter(
      (id) => id !== albumId,
    );
  }

  async removeArtist(artistId: string): Promise<void> {
    this.favorites.artists = this.favorites.artists.filter(
      (id) => id !== artistId,
    );
  }

  async isTrackFavorite(trackId: string): Promise<boolean> {
    return this.favorites.tracks.includes(trackId);
  }

  async isAlbumFavorite(albumId: string): Promise<boolean> {
    return this.favorites.albums.includes(albumId);
  }

  async isArtistFavorite(artistId: string): Promise<boolean> {
    return this.favorites.artists.includes(artistId);
  }
}
