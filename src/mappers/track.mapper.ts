import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { TrackResponseDto } from '../dto/response/track.response.dto';
import { IMapper } from './common/mapper-to-dto.interface';
import { TrackReqCreateDto } from '../dto/request/track-create.dto';
import { TrackReqUpdateDto } from '../dto/request/track-update.dto';

@Injectable()
export class TrackMapper
  implements
    IMapper<Track, TrackReqCreateDto, TrackReqUpdateDto, TrackResponseDto>
{
  mapFromCreateDto(createDto: TrackReqCreateDto): Omit<Track, 'id'> {
    return {
      name: createDto.name,
      artistId: createDto.artistId || null,
      albumId: createDto.albumId || null,
      duration: createDto.duration,
    };
  }

  mapFromUpdateDto(updateDto: TrackReqUpdateDto, existingTrack: Track): Track {
    return {
      ...existingTrack,
      name: updateDto.name ?? existingTrack.name,
      artistId: updateDto.artistId ?? existingTrack.artistId,
      albumId: updateDto.albumId ?? existingTrack.albumId,
      duration: updateDto.duration ?? existingTrack.duration,
    };
  }

  mapToDto(track: Track): TrackResponseDto {
    return {
      id: track.id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };
  }

  mapToDtos(tracks: Track[]): TrackResponseDto[] {
    return tracks.map((track) => this.mapToDto(track));
  }
}
