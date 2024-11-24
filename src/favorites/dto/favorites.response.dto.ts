import { ArtistResponseDto } from '../../artist/dto/artist.response.dto';
import { AlbumResponseDto } from '../../album/dto/album.response.dto';
import { TrackResponseDto } from '../../track/dto/track.response.dto';

export class FavoritesResponseDto {
  artists: ArtistResponseDto[];
  albums: AlbumResponseDto[];
  tracks: TrackResponseDto[];
}
