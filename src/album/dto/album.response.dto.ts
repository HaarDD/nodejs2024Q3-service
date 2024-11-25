import { ApiProperty } from '@nestjs/swagger';

export class AlbumResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Album Name' })
  name: string;

  @ApiProperty({ example: 2024 })
  year: number;

  @ApiProperty({ format: 'uuid', nullable: true })
  artistId: string | null;
}
