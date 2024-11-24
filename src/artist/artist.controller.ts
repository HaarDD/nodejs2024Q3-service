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
import { ArtistService } from './artist.service';
import { ArtistReqCreateDto } from './dto/artist-create.dto';
import { ArtistReqUpdateDto } from './dto/artist-update.dto';
import { IdParamReqDto } from '../common/dto/id-param.dto';
import { ArtistResponseDto } from './dto/artist.response.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<ArtistResponseDto[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: IdParamReqDto): Promise<ArtistResponseDto> {
    return this.artistService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createArtistDto: ArtistReqCreateDto,
  ): Promise<ArtistResponseDto> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamReqDto,
    @Body() updateArtistDto: ArtistReqUpdateDto,
  ): Promise<ArtistResponseDto> {
    return this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamReqDto): Promise<void> {
    return this.artistService.delete(params.id);
  }
}
