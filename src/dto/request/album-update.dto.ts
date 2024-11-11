import { IsOptional, IsString, IsInt, IsUUID } from 'class-validator';

export class AlbumReqUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
