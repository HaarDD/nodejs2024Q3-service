import { Track } from '../../entity/track.entity';

export interface ITrackRepository {
  create(track: Track): Promise<Track>;
  findAll(): Promise<Track[]>;
  findById(id: string): Promise<Track | null>;
  update(track: Track): Promise<Track>;
  delete(id: string): Promise<void>;
  nullifyArtist(artistId: string): Promise<void>;
  nullifyAlbum(albumId: string): Promise<void>;
}
