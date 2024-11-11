import { Album } from '../../entity/album.entity';

export interface IAlbumRepository {
  create(album: Album): Promise<Album>;
  findAll(): Promise<Album[]>;
  findById(id: string): Promise<Album | null>;
  update(album: Album): Promise<Album>;
  delete(id: string): Promise<void>;
  nullifyArtist(artistId: string): Promise<void>;
}
