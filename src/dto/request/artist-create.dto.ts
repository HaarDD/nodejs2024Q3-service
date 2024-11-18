import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ArtistReqCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
