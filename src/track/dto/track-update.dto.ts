import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsUUID } from 'class-validator';

export class TrackReqUpdateDto {
  @ApiPropertyOptional({ example: 'Updated Track' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  albumId?: string | null;

  @ApiPropertyOptional({ example: 180 })
  @IsOptional()
  @IsInt()
  duration?: number;
}
