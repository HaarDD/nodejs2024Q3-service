import { Artist } from '@prisma/client';

export interface IArtistRepository {
  create(artist: Omit<Artist, 'id'>): Promise<Artist>;
  findAll(): Promise<Artist[]>;
  findById(id: string): Promise<Artist | null>;
  update(artist: Artist): Promise<Artist>;
  delete(id: string): Promise<void>;
}
