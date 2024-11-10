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
import { CreateAlbumDto } from '../dto/request/album-create.dto';
import { UpdateAlbumDto } from '../dto/request/album-update.dto';
import { Album } from '../entity/album.entity';
import { IdParamDto } from 'src/dto/request/id-param.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: IdParamDto): Promise<Album> {
    return this.albumService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamDto): Promise<void> {
    return this.albumService.delete(params.id);
  }
}
