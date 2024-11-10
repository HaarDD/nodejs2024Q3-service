import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IUserRepository } from '../repository/interfaces/user.repository.interface';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/user-create.dto';
import { UpdatePasswordDto } from '../dto/user-upd-pass.dto';
import { isUUID } from 'class-validator';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const user = new User();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    return this.userRepository.create(user);
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<UserWithoutPassword> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserWithoutPassword> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Invalid UUID');
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await this.userRepository.validatePassword(
      id,
      updatePasswordDto.oldPassword,
    );
    if (!isValidPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = {
      ...user,
      password: updatePasswordDto.newPassword,
    } as User;
    return this.userRepository.update(updatedUser);
  }

  async delete(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
  }
}
