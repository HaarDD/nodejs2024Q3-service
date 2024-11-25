import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsUUID } from 'class-validator';

export class AlbumReqUpdateDto {
  @ApiPropertyOptional({ example: 'Updated Album' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 2024 })
  @IsOptional()
  @IsInt()
  year?: number;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
