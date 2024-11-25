import { ArtistResponseDto } from '../../artist/dto/artist.response.dto';
import { AlbumResponseDto } from '../../album/dto/album.response.dto';
import { TrackResponseDto } from '../../track/dto/track.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FavoritesResponseDto {
  @ApiProperty({ type: [ArtistResponseDto] })
  artists: ArtistResponseDto[];

  @ApiProperty({ type: [AlbumResponseDto] })
  albums: AlbumResponseDto[];

  @ApiProperty({ type: [TrackResponseDto] })
  tracks: TrackResponseDto[];
}
