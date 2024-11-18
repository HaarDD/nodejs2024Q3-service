import { IsNotEmpty, IsString } from 'class-validator';

export class UserReqCreateDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
