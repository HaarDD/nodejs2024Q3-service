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
import { AlbumService } from '../service/album.service';
import { AlbumReqCreateDto } from '../dto/request/album-create.dto';
import { AlbumReqUpdateDto } from '../dto/request/album-update.dto';
import { Album } from '../entity/album.entity';
import { IdParamReqDto } from 'src/dto/request/id-param.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: IdParamReqDto): Promise<Album> {
    return this.albumService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDto: AlbumReqCreateDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamReqDto,
    @Body() updateAlbumDto: AlbumReqUpdateDto,
  ): Promise<Album> {
    return this.albumService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamReqDto): Promise<void> {
    return this.albumService.delete(params.id);
  }
}
