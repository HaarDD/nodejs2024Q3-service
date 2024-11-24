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

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<AlbumResponseDto[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: IdParamReqDto): Promise<AlbumResponseDto> {
    return this.albumService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createAlbumDto: AlbumReqCreateDto,
  ): Promise<AlbumResponseDto> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamReqDto,
    @Body() updateAlbumDto: AlbumReqUpdateDto,
  ): Promise<AlbumResponseDto> {
    return this.albumService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamReqDto): Promise<void> {
    return this.albumService.delete(params.id);
  }
}