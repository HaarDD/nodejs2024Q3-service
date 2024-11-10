import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IUserRepository } from '../repository/interfaces/user.repository.interface';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/request/user-create.dto';
import { UpdatePasswordDto } from '../dto/request/user-upd-pass.dto';
import { BaseService } from './common/base.service';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UserService extends BaseService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {
    super();
  }

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
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
  }
}
