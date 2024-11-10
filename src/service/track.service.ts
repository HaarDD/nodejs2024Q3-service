import { Injectable, Inject } from '@nestjs/common';
import { ITrackRepository } from '../repository/interfaces/track.repository.interface';
import { Track } from '../entity/track.entity';
import { CreateTrackDto } from '../dto/track-create.dto';
import { UpdateTrackDto } from '../dto/track-update.dto';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { IFavoritesRepository } from '../repository/interfaces/favorites.repository.interface';
import { BaseService } from './common/base.service';

@Injectable()
export class TrackService extends BaseService {
  constructor(
    @Inject('TrackRepository')
    private readonly trackRepository: ITrackRepository,
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: IFavoritesRepository,
  ) {
    super();
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    if (createTrackDto.artistId) {
      const artist = await this.artistRepository.findById(
        createTrackDto.artistId,
      );
      if (!artist) {
        this.notFoundException('Artist');
      }
    }

    if (createTrackDto.albumId) {
      const album = await this.albumRepository.findById(createTrackDto.albumId);
      if (!album) {
        this.notFoundException('Album');
      }
    }

    const track = new Track();
    track.name = createTrackDto.name;
    track.duration = createTrackDto.duration;
    track.artistId = createTrackDto.artistId || null;
    track.albumId = createTrackDto.albumId || null;
    return this.trackRepository.create(track);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }

  async findById(id: string): Promise<Track> {
    const track = await this.trackRepository.findById(id);
    if (!track) {
      this.notFoundException('Track');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const existingTrack = await this.trackRepository.findById(id);
    if (!existingTrack) {
      this.notFoundException('Track');
    }

    if (updateTrackDto.artistId) {
      const artist = await this.artistRepository.findById(
        updateTrackDto.artistId,
      );
      if (!artist) {
        this.notFoundException('Artist');
      }
    }

    if (updateTrackDto.albumId) {
      const album = await this.albumRepository.findById(updateTrackDto.albumId);
      if (!album) {
        this.notFoundException('Album');
      }
    }

    const updatedTrack = { ...existingTrack, ...updateTrackDto };
    return this.trackRepository.update(updatedTrack as Track);
  }

  async delete(id: string): Promise<void> {
    const track = await this.trackRepository.findById(id);
    if (!track) {
      this.notFoundException('Track');
    }

    await this.favoritesRepository.removeTrack(id);

    await this.trackRepository.delete(id);
  }
}
