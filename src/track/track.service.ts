import { Injectable, Inject } from '@nestjs/common';
import { Track } from '@prisma/client';
import { ITrackRepository } from './track.repository.interface';
import { TrackReqCreateDto } from './dto/track-create.dto';
import { TrackReqUpdateDto } from './dto/track-update.dto';
import { IArtistRepository } from '../artist/artist.repository.interface';
import { IAlbumRepository } from '../album/album.repository.interface';
import { IFavoritesRepository } from '../favorites/favorites.repository.interface';
import { BaseService } from '../common/service/base.service';
import { TrackResponseDto } from './dto/track.response.dto';
import { IMapper } from '../common/mapper/mapper-to-dto.interface';

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
    @Inject('TrackMapper')
    private readonly trackMapper: IMapper<
      Track,
      TrackReqCreateDto,
      TrackReqUpdateDto,
      TrackResponseDto
    >,
  ) {
    super();
  }

  async create(createTrackDto: TrackReqCreateDto): Promise<TrackResponseDto> {
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

    const savedTrack = await this.trackRepository.create(
      this.trackMapper.mapFromCreateDto(createTrackDto),
    );
    return this.trackMapper.mapToDto(savedTrack);
  }

  async findAll(): Promise<TrackResponseDto[]> {
    const tracksAll = await this.trackRepository.findAll();
    return this.trackMapper.mapToDtos(tracksAll);
  }

  async findById(id: string): Promise<TrackResponseDto> {
    const track = await this.trackRepository.findById(id);
    if (!track) {
      this.notFoundException('Track');
    }
    return this.trackMapper.mapToDto(track);
  }

  async update(
    id: string,
    updateTrackDto: TrackReqUpdateDto,
  ): Promise<TrackResponseDto> {
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

    const updatedTrack = this.trackMapper.mapFromUpdateDto(
      updateTrackDto,
      existingTrack,
    );

    const savedTrack = await this.trackRepository.update(updatedTrack);

    return this.trackMapper.mapToDto(savedTrack);
  }

  async delete(id: string): Promise<void> {
    const track = await this.trackRepository.findById(id);
    if (!track) {
      this.notFoundException('Track');
    }

    await this.trackRepository.delete(id);
  }
}
