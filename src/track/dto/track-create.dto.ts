import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class TrackReqCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
