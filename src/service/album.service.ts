import { Injectable, Inject } from '@nestjs/common';
import { Album } from '@prisma/client';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { AlbumReqCreateDto } from '../dto/request/album-create.dto';
import { AlbumReqUpdateDto } from '../dto/request/album-update.dto';
import { AlbumResponseDto } from '../dto/response/album.response.dto';
import { IMapper } from '../mappers/common/mapper-to-dto.interface';
import { BaseService } from './common/base.service';

@Injectable()
export class AlbumService extends BaseService {
  constructor(
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('AlbumMapper')
    private readonly albumMapper: IMapper<
      Album,
      AlbumReqCreateDto,
      AlbumReqUpdateDto,
      AlbumResponseDto
    >,
  ) {
    super();
  }

  async create(createAlbumDto: AlbumReqCreateDto): Promise<AlbumResponseDto> {
    if (createAlbumDto.artistId) {
      const artist = await this.artistRepository.findById(
        createAlbumDto.artistId,
      );
      if (!artist) {
        this.notFoundException('Artist');
      }
    }

    const savedAlbum = await this.albumRepository.create(
      this.albumMapper.mapFromCreateDto(createAlbumDto),
    );
    return this.albumMapper.mapToDto(savedAlbum);
  }

  async findAll(): Promise<AlbumResponseDto[]> {
    const albums = await this.albumRepository.findAll();
    return this.albumMapper.mapToDtos(albums);
  }

  async findById(id: string): Promise<AlbumResponseDto> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      this.notFoundException('Album');
    }
    return this.albumMapper.mapToDto(album);
  }

  async update(
    id: string,
    updateAlbumDto: AlbumReqUpdateDto,
  ): Promise<AlbumResponseDto> {
    const existingAlbum = await this.albumRepository.findById(id);
    if (!existingAlbum) {
      this.notFoundException('Album');
    }

    if (updateAlbumDto.artistId) {
      const artist = await this.artistRepository.findById(
        updateAlbumDto.artistId,
      );
      if (!artist) {
        this.notFoundException('Artist');
      }
    }

    const updatedAlbum = await this.albumRepository.update(
      this.albumMapper.mapFromUpdateDto(updateAlbumDto, existingAlbum),
    );
    return this.albumMapper.mapToDto(updatedAlbum);
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      this.notFoundException('Album');
    }
    await this.albumRepository.delete(id);
  }
}
