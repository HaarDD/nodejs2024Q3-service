import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'testUser' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'Pass123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
