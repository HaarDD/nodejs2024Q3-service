import { ArtistResponseDto } from './artist.response.dto';
import { AlbumResponseDto } from './album.response.dto';
import { TrackResponseDto } from './track.response.dto';

export class FavoritesResponseDto {
  artists: ArtistResponseDto[];
  albums: AlbumResponseDto[];
  tracks: TrackResponseDto[];
}
