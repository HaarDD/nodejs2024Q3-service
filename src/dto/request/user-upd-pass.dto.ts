import { IsNotEmpty, IsString } from 'class-validator';

export class UserReqUpdateDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
