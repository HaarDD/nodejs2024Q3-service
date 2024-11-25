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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get single user by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Get(':id')
  async findById(@Param() params: IdParamReqDto): Promise<UserResponseDto> {
    return this.userService.findById(params.id);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been created.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @Post()
  @HttpCode(201)
  async create(
    @Body() createUserDto: UserReqCreateDto,
  ): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: "Update a user's password" })
  @ApiResponse({
    status: 200,
    description: 'The user has been updated.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 403,
    description: 'oldPassword is wrong',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Put(':id')
  async updatePassword(
    @Param() params: IdParamReqDto,
    @Body() updatePasswordDto: UserReqUpdateDto,
  ): Promise<UserResponseDto> {
    return this.userService.updatePassword(params.id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 204,
    description: 'The user has been deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamReqDto): Promise<void> {
    return this.userService.delete(params.id);
  }
}
