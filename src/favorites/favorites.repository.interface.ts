import { Favorites } from '@prisma/client';

export interface IFavoritesRepository {
  getFavorites(userId: string): Promise<Favorites>;
  addTrack(userId: string, trackId: string): Promise<void>;
  addAlbum(userId: string, albumId: string): Promise<void>;
  addArtist(userId: string, artistId: string): Promise<void>;
  removeTrack(userId: string, trackId: string): Promise<void>;
  removeAlbum(userId: string, albumId: string): Promise<void>;
  removeArtist(userId: string, artistId: string): Promise<void>;
  isTrackFavorite(userId: string, trackId: string): Promise<boolean>;
  isAlbumFavorite(userId: string, albumId: string): Promise<boolean>;
  isArtistFavorite(userId: string, artistId: string): Promise<boolean>;
}
