import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class AlbumReqCreateDto {
  @ApiProperty({ example: 'New Album' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 2024 })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
