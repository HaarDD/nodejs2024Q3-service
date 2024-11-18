import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class ArtistReqUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
