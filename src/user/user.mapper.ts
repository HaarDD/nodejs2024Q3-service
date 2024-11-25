import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserResponseDto } from './dto/user.response.dto';
import { IMapper } from '../common/mapper/mapper-to-dto.interface';
import { UserReqCreateDto } from './dto/user-create.dto';
import { UserReqUpdateDto } from './dto/user-upd-pass.dto';

@Injectable()
export class UserMapper
  implements IMapper<User, UserReqCreateDto, UserReqUpdateDto, UserResponseDto>
{
  mapFromCreateDto(createDto: UserReqCreateDto): Omit<User, 'id'> {
    return {
      login: createDto.login,
      password: createDto.password,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  mapFromUpdateDto(updateDto: UserReqUpdateDto, existingUser: User): User {
    return {
      ...existingUser,
      password: updateDto.newPassword,
      version: existingUser.version + 1,
      updatedAt: new Date(),
    };
  }

  mapToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  mapToDtos(users: User[]): UserResponseDto[] {
    return users.map((user) => this.mapToDto(user));
  }
}
