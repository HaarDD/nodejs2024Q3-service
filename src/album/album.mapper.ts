import { Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { AlbumResponseDto } from './dto/album.response.dto';
import { IMapper } from '../common/mapper/mapper-to-dto.interface';
import { AlbumReqCreateDto } from './dto/album-create.dto';
import { AlbumReqUpdateDto } from './dto/album-update.dto';

@Injectable()
export class AlbumMapper
  implements
    IMapper<Album, AlbumReqCreateDto, AlbumReqUpdateDto, AlbumResponseDto>
{
  mapFromCreateDto(createDto: AlbumReqCreateDto): Omit<Album, 'id'> {
    return {
      name: createDto.name,
      year: createDto.year,
      artistId: createDto.artistId || null,
    };
  }

  mapFromUpdateDto(updateDto: AlbumReqUpdateDto, existingAlbum: Album): Album {
    return {
      ...existingAlbum,
      name: updateDto.name ?? existingAlbum.name,
      year: updateDto.year ?? existingAlbum.year,
      artistId: updateDto.artistId ?? existingAlbum.artistId,
    };
  }

  mapToDto(album: Album): AlbumResponseDto {
    return {
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
  }

  mapToDtos(albums: Album[]): AlbumResponseDto[] {
    return albums.map((album) => this.mapToDto(album));
  }
}
