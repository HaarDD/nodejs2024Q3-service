import { IsOptional, IsString, IsInt, IsUUID } from 'class-validator';

export class TrackReqUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;

  @IsOptional()
  @IsInt()
  duration?: number;
}
