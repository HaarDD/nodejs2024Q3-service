import { Injectable, Inject } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { ArtistReqCreateDto } from '../dto/request/artist-create.dto';
import { ArtistReqUpdateDto } from '../dto/request/artist-update.dto';
import { ArtistResponseDto } from '../dto/response/artist.response.dto';
import { IMapper } from '../mappers/common/mapper-to-dto.interface';
import { BaseService } from './common/base.service';

@Injectable()
export class ArtistService extends BaseService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
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
    const savedArtist = await this.artistRepository.create(
      this.artistMapper.mapFromCreateDto(createArtistDto),
    );
    return this.artistMapper.mapToDto(savedArtist);
  }

  async findAll(): Promise<ArtistResponseDto[]> {
    const artists = await this.artistRepository.findAll();
    return this.artistMapper.mapToDtos(artists);
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

    const updatedArtist = await this.artistRepository.update(
      this.artistMapper.mapFromUpdateDto(updateArtistDto, existingArtist),
    );
    return this.artistMapper.mapToDto(updatedArtist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      this.notFoundException('Artist');
    }
    await this.artistRepository.delete(id);
  }
}
