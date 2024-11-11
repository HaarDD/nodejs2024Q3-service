import { Injectable } from '@nestjs/common';
import { Artist } from '../entity/artist.entity';
import { ArtistResponseDto } from '../dto/response/artist.response.dto';
import { IMapper } from './common/mapper-to-dto.interface';
import { ArtistReqCreateDto } from 'src/dto/request/artist-create.dto';
import { ArtistReqUpdateDto } from 'src/dto/request/artist-update.dto';

@Injectable()
export class ArtistMapper
  implements
    IMapper<Artist, ArtistReqCreateDto, ArtistReqUpdateDto, ArtistResponseDto>
{
  mapFromCreateDto(createDto: ArtistReqCreateDto): Artist {
    const artist = new Artist();
    artist.name = createDto.name;
    artist.grammy = createDto.grammy;
    return artist;
  }

  mapFromUpdateDto(
    updateDto: ArtistReqUpdateDto,
    existingArtist: Artist,
  ): Artist {
    return {
      ...existingArtist,
      name: updateDto.name ?? existingArtist.name,
      grammy: updateDto.grammy ?? existingArtist.grammy,
    };
  }

  mapToDto(artist: Artist): ArtistResponseDto {
    return {
      id: artist.id,
      name: artist.name,
      grammy: artist.grammy,
    };
  }

  mapToDtos(artists: Artist[]): ArtistResponseDto[] {
    return artists.map((artist) => this.mapToDto(artist));
  }
}
