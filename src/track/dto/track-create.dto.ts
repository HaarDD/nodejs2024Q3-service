import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class TrackReqCreateDto {
  @ApiProperty({ example: 'New Track' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  albumId?: string | null;

  @ApiProperty({ example: 180 })
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
