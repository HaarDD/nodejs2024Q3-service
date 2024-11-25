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
import { AlbumService } from './album.service';
import { AlbumReqCreateDto } from './dto/album-create.dto';
import { AlbumReqUpdateDto } from './dto/album-update.dto';
import { IdParamReqDto } from '../common/dto/id-param.dto';
import { AlbumResponseDto } from './dto/album.response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Albums')
@ApiBearerAuth()
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: 'Get albums list' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [AlbumResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @Get()
  async findAll(): Promise<AlbumResponseDto[]> {
    return this.albumService.findAll();
  }

  @ApiOperation({ summary: 'Get single album by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({ status: 404, description: 'Album was not found.' })
  @Get(':id')
  async findById(@Param() params: IdParamReqDto): Promise<AlbumResponseDto> {
    return this.albumService.findById(params.id);
  }

  @ApiOperation({ summary: 'Add new album' })
  @ApiResponse({
    status: 201,
    description: 'Album is created',
    type: AlbumResponseDto,
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
    @Body() createAlbumDto: AlbumReqCreateDto,
  ): Promise<AlbumResponseDto> {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'Update album information' })
  @ApiResponse({
    status: 200,
    description: 'The album has been updated.',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({ status: 404, description: 'Album was not found.' })
  @Put(':id')
  async update(
    @Param() params: IdParamReqDto,
    @Body() updateAlbumDto: AlbumReqUpdateDto,
  ): Promise<AlbumResponseDto> {
    return this.albumService.update(params.id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({ status: 404, description: 'Album was not found.' })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamReqDto): Promise<void> {
    return this.albumService.delete(params.id);
  }
}
