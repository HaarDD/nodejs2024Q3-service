import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user-create.dto';
import { UpdatePasswordDto } from '../dto/user-upd-pass.dto';
import { User } from '../entity/user.entity';
import { IdParamDto } from 'src/dto/id-param.dto';

type UserWithoutPassword = Omit<User, 'password'>;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserWithoutPassword[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: IdParamDto): Promise<UserWithoutPassword> {
    return this.userService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async updatePassword(
    @Param() params: IdParamDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.updatePassword(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamDto): Promise<void> {
    return this.userService.delete(params.id);
  }
}
