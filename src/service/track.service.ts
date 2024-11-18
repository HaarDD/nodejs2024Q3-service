import { Injectable, Inject } from '@nestjs/common';
import { Track } from '@prisma/client';
import { ITrackRepository } from '../repository/interfaces/track.repository.interface';
import { TrackReqCreateDto } from '../dto/request/track-create.dto';
import { TrackReqUpdateDto } from '../dto/request/track-update.dto';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { IFavoritesRepository } from '../repository/interfaces/favorites.repository.interface';
import { BaseService } from './common/base.service';
import { TrackResponseDto } from '../dto/response/track.response.dto';
import { IMapper } from '../mappers/common/mapper-to-dto.interface';

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
