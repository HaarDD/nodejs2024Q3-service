import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserReqUpdateDto {
  @ApiProperty({ description: 'Current password', example: 'oldPass123' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: 'New password', example: 'newPass123' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
