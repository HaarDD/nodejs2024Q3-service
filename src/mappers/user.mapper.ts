import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserResponseDto } from '../dto/response/user.response.dto';
import { IMapper } from './common/mapper-to-dto.interface';
import { UserReqCreateDto } from 'src/dto/request/user-create.dto';
import { UserReqUpdateDto } from 'src/dto/request/user-upd-pass.dto';

@Injectable()
export class UserMapper
  implements IMapper<User, UserReqCreateDto, UserReqUpdateDto, UserResponseDto>
{
  mapFromCreateDto(createDto: UserReqCreateDto): User {
    const user = new User();
    user.login = createDto.login;
    user.password = createDto.password;
    return user;
  }

  mapFromUpdateDto(updateDto: UserReqUpdateDto, existingUser: User): User {
    return {
      ...existingUser,
      password: updateDto.newPassword,
    };
  }

  mapToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  mapToDtos(users: User[]): UserResponseDto[] {
    return users.map((user) => this.mapToDto(user));
  }
}
