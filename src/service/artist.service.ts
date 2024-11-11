import { Injectable, Inject } from '@nestjs/common';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { Artist } from '../entity/artist.entity';
import { ArtistReqCreateDto } from '../dto/request/artist-create.dto';
import { ArtistReqUpdateDto } from '../dto/request/artist-update.dto';
import { IFavoritesRepository } from 'src/repository/interfaces/favorites.repository.interface';
import { ITrackRepository } from 'src/repository/interfaces/track.repository.interface';
import { IAlbumRepository } from 'src/repository/interfaces/album.repository.interface';
import { BaseService } from './common/base.service';
import { ArtistResponseDto } from 'src/dto/response/artist.response.dto';
import { IMapper } from 'src/mappers/common/mapper-to-dto.interface';

@Injectable()
export class ArtistService extends BaseService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: ITrackRepository,
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: IFavoritesRepository,
    @Inject('ArtistMapper')
    private readonly artistMapper: IMapper<
      Artist,
      ArtistReqCreateDto,
      ArtistReqUpdateDto,
      ArtistResponseDto
    >,
  ) {
    super();
  }

  async create(
    createArtistDto: ArtistReqCreateDto,
  ): Promise<ArtistResponseDto> {
    const createdArtist = this.artistMapper.mapFromCreateDto(createArtistDto);
    const savedArtist = await this.artistRepository.create(createdArtist);

    return this.artistMapper.mapToDto(savedArtist);
  }

  async findAll(): Promise<ArtistResponseDto[]> {
    const allArtists = await this.artistRepository.findAll();

    return this.artistMapper.mapToDtos(allArtists);
  }

  async findById(id: string): Promise<ArtistResponseDto> {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      this.notFoundException('Artist');
    }
    return this.artistMapper.mapToDto(artist);
  }

  async update(
    id: string,
    updateArtistDto: ArtistReqUpdateDto,
  ): Promise<ArtistResponseDto> {
    const existingArtist = await this.artistRepository.findById(id);
    if (!existingArtist) {
      this.notFoundException('Artist');
    }

    const updatedArtist = this.artistMapper.mapFromUpdateDto(
      updateArtistDto,
      existingArtist,
    );

    const savedArtist = await this.artistRepository.update(updatedArtist);

    return this.artistMapper.mapToDto(savedArtist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      this.notFoundException('Artist');
    }

    await this.artistRepository.delete(id);

    await this.trackRepository.nullifyArtist(id);

    await this.albumRepository.nullifyArtist(id);

    await this.favoritesRepository.removeArtist(id);
  }
}
