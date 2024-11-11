import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IUserRepository } from '../repository/interfaces/user.repository.interface';
import { User } from '../entity/user.entity';
import { UserReqCreateDto } from '../dto/request/user-create.dto';
import { UserReqUpdateDto } from '../dto/request/user-upd-pass.dto';
import { BaseService } from './common/base.service';
import { IMapper } from 'src/mappers/common/mapper-to-dto.interface';
import { UserResponseDto } from 'src/dto/response/user.response.dto';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('UserMapper')
    private readonly userMapper: IMapper<
      User,
      UserReqCreateDto,
      UserReqUpdateDto,
      UserResponseDto
    >,
  ) {
    super();
  }

  async create(createUserDto: UserReqCreateDto): Promise<UserResponseDto> {
    const createdUser = this.userMapper.mapFromCreateDto(createUserDto);

    createdUser.version = 1;
    createdUser.createdAt = Date.now();
    createdUser.updatedAt = Date.now();

    const savedUser = await this.userRepository.create(createdUser);
    return this.userMapper.mapToDto(savedUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return this.userMapper.mapToDtos(users);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userMapper.mapToDto(user);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UserReqUpdateDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await this.userRepository.validatePassword(
      id,
      updatePasswordDto.oldPassword,
    );
    if (!isValidPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const mappedUser = this.userMapper.mapFromUpdateDto(
      updatePasswordDto,
      existingUser,
    );

    mappedUser.version += 1;
    mappedUser.updatedAt = Date.now();

    const updatedUser = await this.userRepository.update(mappedUser);
    return this.userMapper.mapToDto(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
  }
}
