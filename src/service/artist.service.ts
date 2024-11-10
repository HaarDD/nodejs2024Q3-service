import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IArtistRepository } from '../repository/interfaces/artist.repository.interface';
import { Artist } from '../entity/artist.entity';
import { CreateArtistDto } from '../dto/artist-create.dto';
import { UpdateArtistDto } from '../dto/artist-update.dto';
import { IFavoritesRepository } from 'src/repository/interfaces/favorites.repository.interface';
import { ITrackRepository } from 'src/repository/interfaces/track.repository.interface';
import { IAlbumRepository } from 'src/repository/interfaces/album.repository.interface';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepository: IArtistRepository,
    @Inject('AlbumRepository')
    private readonly albumRepository: IAlbumRepository,
    @Inject('TrackRepository')
    private readonly trackRepository: ITrackRepository,
    @Inject('FavoritesRepository')
    private readonly favoritesRepository: IFavoritesRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = new Artist();
    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;
    return this.artistRepository.create(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }

  async findById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const existingArtist = await this.artistRepository.findById(id);
    if (!existingArtist) {
      throw new NotFoundException('Artist not found');
    }
    const updatedArtist = { ...existingArtist, ...updateArtistDto };
    return this.artistRepository.update(updatedArtist as Artist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.favoritesRepository.removeArtist(id);

    await this.trackRepository.nullifyArtist(id);
    await this.albumRepository.nullifyArtist(id);

    await this.artistRepository.delete(id);
  }
}
