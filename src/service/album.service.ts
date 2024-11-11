import { Injectable, Inject } from '@nestjs/common';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { Album } from '../entity/album.entity';
import { AlbumReqCreateDto } from '../dto/request/album-create.dto';
import { AlbumReqUpdateDto as AlbumReqUpdateDto } from '../dto/request/album-update.dto';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { IFavoritesRepository } from '../repository/interfaces/favorites.repository.interface';
import { ITrackRepository } from '../repository/interfaces/track.repository.interface';
import { BaseService } from './common/base.service';
import { AlbumResponseDto } from 'src/dto/response/album.response.dto';
import { IMapper } from 'src/mappers/common/mapper-to-dto.interface';

@Injectable()
export class AlbumService extends BaseService {
  constructor(
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: ITrackRepository,
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: IFavoritesRepository,
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

  async create(albumCreateDto: AlbumReqCreateDto): Promise<AlbumResponseDto> {
    if (albumCreateDto.artistId) {
      const artist = await this.artistRepository.findById(
        albumCreateDto.artistId,
      );
      if (!artist) {
        this.notFoundException('Artist');
      }
    }
    const createdAlbum = this.albumMapper.mapFromCreateDto(albumCreateDto);
    const savedAlbum = await this.albumRepository.create(createdAlbum);
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

    const updatedAlbum = this.albumMapper.mapFromUpdateDto(
      updateAlbumDto,
      existingAlbum,
    );
    const savedAlbum = await this.albumRepository.update(updatedAlbum);

    return this.albumMapper.mapToDto(savedAlbum);
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      this.notFoundException('Album');
    }

    await this.albumRepository.delete(id);

    await this.trackRepository.nullifyAlbum(id);

    await this.favoritesRepository.removeAlbum(id);
  }
}
