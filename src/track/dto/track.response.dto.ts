import { ApiProperty } from '@nestjs/swagger';

export class TrackResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Test Track' })
  name: string;

  @ApiProperty({ format: 'uuid', nullable: true })
  artistId: string | null;

  @ApiProperty({ format: 'uuid', nullable: true })
  albumId: string | null;

  @ApiProperty({ example: 180 })
  duration: number;
}
