import { Artist } from '../../entity/artist.entity';

export interface IArtistRepository {
  create(artist: Artist): Promise<Artist>;
  findAll(): Promise<Artist[]>;
  findById(id: string): Promise<Artist | null>;
  update(artist: Artist): Promise<Artist>;
  delete(id: string): Promise<void>;
}
