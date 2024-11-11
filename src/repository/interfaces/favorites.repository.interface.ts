import { Favorites } from 'src/entity/favorites.entity';

export interface IFavoritesRepository {
  getFavorites(): Promise<Favorites>;
  addTrack(trackId: string): Promise<void>;
  addAlbum(albumId: string): Promise<void>;
  addArtist(artistId: string): Promise<void>;
  removeTrack(trackId: string): Promise<void>;
  removeAlbum(albumId: string): Promise<void>;
  removeArtist(artistId: string): Promise<void>;
  isTrackFavorite(trackId: string): Promise<boolean>;
  isAlbumFavorite(albumId: string): Promise<boolean>;
  isArtistFavorite(artistId: string): Promise<boolean>;
}
