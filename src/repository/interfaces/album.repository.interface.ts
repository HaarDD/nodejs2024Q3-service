import { Album } from '@prisma/client';

export interface IAlbumRepository {
  create(album: Omit<Album, 'id'>): Promise<Album>;
  findAll(): Promise<Album[]>;
  findById(id: string): Promise<Album | null>;
  update(album: Album): Promise<Album>;
  delete(id: string): Promise<void>;
}
