import { Track } from '@prisma/client';

export interface ITrackRepository {
  create(track: Omit<Track, 'id'>): Promise<Track>;
  findAll(): Promise<Track[]>;
  findById(id: string): Promise<Track | null>;
  update(track: Track): Promise<Track>;
  delete(id: string): Promise<void>;
}
