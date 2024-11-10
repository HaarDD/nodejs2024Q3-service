import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { IAlbumRepository } from '../repository/interfaces/album.repository.interface';
import { Album } from '../entity/album.entity';
import { CreateAlbumDto } from '../dto/album-create.dto';
import { UpdateAlbumDto } from '../dto/album-update.dto';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { IFavoritesRepository } from '../repository/interfaces/favorites.repository.interface';
import { ITrackRepository } from '../repository/interfaces/track.repository.interface';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: ITrackRepository,
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: IFavoritesRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    if (createAlbumDto.artistId) {
      const artist = await this.artistRepository.findById(
        createAlbumDto.artistId,
      );
      if (!artist) {
        throw new BadRequestException('Artist does not exist');
      }
    }

    const album = new Album();
    album.name = createAlbumDto.name;
    album.year = createAlbumDto.year;
    album.artistId = createAlbumDto.artistId || null;
    return this.albumRepository.create(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.findAll();
  }

  async findById(id: string): Promise<Album> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const existingAlbum = await this.albumRepository.findById(id);
    if (!existingAlbum) {
      throw new NotFoundException('Album not found');
    }

    if (updateAlbumDto.artistId) {
      const artist = await this.artistRepository.findById(
        updateAlbumDto.artistId,
      );
      if (!artist) {
        throw new BadRequestException('Artist does not exist');
      }
    }

    const updatedAlbum = { ...existingAlbum, ...updateAlbumDto };
    return this.albumRepository.update(updatedAlbum as Album);
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.favoritesRepository.removeAlbum(id);

    await this.trackRepository.nullifyAlbum(id);

    await this.albumRepository.delete(id);
  }
}
