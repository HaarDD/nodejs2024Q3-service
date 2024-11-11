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
import { UserReqCreateDto } from '../dto/request/user-create.dto';
import { UserReqUpdateDto } from '../dto/request/user-upd-pass.dto';
import { IdParamReqDto } from 'src/dto/request/id-param.dto';
import { UserResponseDto } from 'src/dto/response/user.response.dto';

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
