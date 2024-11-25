import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserReqCreateDto {
  @ApiProperty({ example: 'testUser' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
