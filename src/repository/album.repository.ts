import { IAlbumRepository } from './interfaces/album.repository.interface';
import { Album } from '../entity/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { ITrackRepository } from './interfaces/track.repository.interface';
import { Inject } from '@nestjs/common';

export class AlbumRepository implements IAlbumRepository {
  constructor(
    @Inject('TrackRepository') private trackRepository: ITrackRepository,
  ) {}
  private albums: Album[] = [];

  async create(album: Album): Promise<Album> {
    album.id = uuidv4();
    this.albums.push(album);
    return album;
  }

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findById(id: string): Promise<Album | null> {
    return this.albums.find((album) => album.id === id) || null;
  }

  async update(updatedAlbum: Album): Promise<Album> {
    const index = this.albums.findIndex(
      (album) => album.id === updatedAlbum.id,
    );
    if (index !== -1) {
      this.albums[index] = { ...this.albums[index], ...updatedAlbum };
      return this.albums[index];
    }
    throw new Error('Album not found');
  }

  async delete(id: string): Promise<void> {
    // Update related tracks
    await this.trackRepository.nullifyAlbum(id);

    // Delete album
    this.albums = this.albums.filter((album) => album.id !== id);
  }

  async nullifyArtist(artistId: string): Promise<void> {
    this.albums = this.albums.map((track) =>
      track.artistId === artistId ? { ...track, artistId: null } : track,
    );
  }
}
