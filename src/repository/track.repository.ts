import { ITrackRepository } from './interfaces/track.repository.interface';
import { Track } from '../entity/track.entity';
import { v4 as uuidv4 } from 'uuid';

export class TrackRepository implements ITrackRepository {
  private tracks: Track[] = [];

  async create(track: Track): Promise<Track> {
    track.id = uuidv4();
    this.tracks.push(track);
    return track;
  }

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findById(id: string): Promise<Track | null> {
    return this.tracks.find((track) => track.id === id) || null;
  }

  async update(updatedTrack: Track): Promise<Track> {
    const index = this.tracks.findIndex(
      (track) => track.id === updatedTrack.id,
    );
    if (index !== -1) {
      this.tracks[index] = { ...this.tracks[index], ...updatedTrack };
      return this.tracks[index];
    }
    throw new Error('Track not found');
  }

  async delete(id: string): Promise<void> {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  async nullifyArtist(artistId: string): Promise<void> {
    this.tracks = this.tracks.map((track) =>
      track.artistId === artistId ? { ...track, artistId: null } : track,
    );
  }

  async nullifyAlbum(albumId: string): Promise<void> {
    this.tracks = this.tracks.map((track) =>
      track.albumId === albumId ? { ...track, albumId: null } : track,
    );
  }
}
