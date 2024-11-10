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
import { ArtistService } from '../service/artist.service';
import { CreateArtistDto } from '../dto/artist-create.dto';
import { UpdateArtistDto } from '../dto/artist-update.dto';
import { Artist } from '../entity/artist.entity';
import { IdParamDto } from 'src/dto/id-param.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: IdParamDto): Promise<Artist> {
    return this.artistService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamDto): Promise<void> {
    return this.artistService.delete(params.id);
  }
}
