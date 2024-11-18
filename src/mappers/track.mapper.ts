import { Injectable } from '@nestjs/common';
import { Track } from '../entity/track.entity';
import { TrackResponseDto } from '../dto/response/track.response.dto';
import { IMapper } from './common/mapper-to-dto.interface';
import { TrackReqCreateDto } from 'src/dto/request/track-create.dto';
import { TrackReqUpdateDto } from 'src/dto/request/track-update.dto';

@Injectable()
export class TrackMapper
  implements
    IMapper<Track, TrackReqCreateDto, TrackReqUpdateDto, TrackResponseDto>
{
  mapFromCreateDto(createDto: TrackReqCreateDto): Track {
    const track = new Track();
    track.name = createDto.name;
    track.artistId = createDto.artistId || null;
    track.albumId = createDto.albumId || null;
    track.duration = createDto.duration;
    return track;
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
