import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Artist Name' })
  name: string;

  @ApiProperty({ example: true })
  grammy: boolean;
}
