import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { IUserRepository } from './user.repository.interface';
import { UserReqCreateDto } from './dto/user-create.dto';
import { UserReqUpdateDto } from './dto/user-upd-pass.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { IMapper } from '../common/mapper/mapper-to-dto.interface';
import { BaseService } from '../common/service/base.service';
import { PasswordService } from '../authentication/password.service';

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
    private readonly passwordService: PasswordService,
  ) {
    super();
  }

  async create(createUserDto: UserReqCreateDto): Promise<UserResponseDto> {
    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );
    const userData = this.userMapper.mapFromCreateDto({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.create(userData);
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

    const isValidPassword = await this.passwordService.comparePasswords(
      updatePasswordDto.oldPassword,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const hashedNewPassword = await this.passwordService.hashPassword(
      updatePasswordDto.newPassword,
    );
    const userToUpdate = this.userMapper.mapFromUpdateDto(
      { ...updatePasswordDto, newPassword: hashedNewPassword },
      existingUser,
    );

    const updatedUser = await this.userRepository.update(userToUpdate);
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