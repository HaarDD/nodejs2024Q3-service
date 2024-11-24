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
import { UserService } from './user.service';
import { UserReqCreateDto } from './dto/user-create.dto';
import { UserReqUpdateDto } from './dto/user-upd-pass.dto';
import { IdParamReqDto } from 'src/common/dto/id-param.dto';
import { UserResponseDto } from 'src/user/dto/user.response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: IdParamReqDto): Promise<UserResponseDto> {
    return this.userService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createUserDto: UserReqCreateDto,
  ): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async updatePassword(
    @Param() params: IdParamReqDto,
    @Body() updatePasswordDto: UserReqUpdateDto,
  ): Promise<UserResponseDto> {
    return this.userService.updatePassword(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamReqDto): Promise<void> {
    return this.userService.delete(params.id);
  }
}
