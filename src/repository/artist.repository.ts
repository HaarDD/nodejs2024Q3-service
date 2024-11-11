import { IArtistRepository } from './interfaces/artist.repository.interface';
import { Artist } from '../entity/artist.entity';
import { v4 as uuidv4 } from 'uuid';

export class ArtistRepository implements IArtistRepository {
  private artists: Artist[] = [];

  async create(artist: Artist): Promise<Artist> {
    artist.id = uuidv4();
    this.artists.push(artist);
    return artist;
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findById(id: string): Promise<Artist | null> {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist || null;
  }

  async update(updatedArtist: Artist): Promise<Artist> {
    const index = this.artists.findIndex(
      (artist) => artist.id === updatedArtist.id,
    );
    if (index !== -1) {
      this.artists[index] = { ...this.artists[index], ...updatedArtist };
      return this.artists[index];
    }
    throw new Error('Artist not found');
  }

  async delete(id: string): Promise<void> {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
