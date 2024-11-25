import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ example: 'testUser', description: 'User login' })
  login: string;

  @ApiProperty({ example: 1, description: 'User version' })
  version: number;

  @ApiProperty({ example: 1673087200000, description: 'Creation timestamp' })
  createdAt: number;

  @ApiProperty({ example: 1673087200000, description: 'Last update timestamp' })
  updatedAt: number;
}
