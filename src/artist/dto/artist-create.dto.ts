import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ArtistReqCreateDto {
  @ApiProperty({ example: 'New Artist' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
