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
import { TrackService } from '../service/track.service';
import { CreateTrackDto } from '../dto/request/track-create.dto';
import { UpdateTrackDto } from '../dto/request/track-update.dto';
import { Track } from '../entity/track.entity';
import { IdParamDto } from 'src/dto/request/id-param.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: IdParamDto): Promise<Track> {
    return this.trackService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamDto): Promise<void> {
    return this.trackService.delete(params.id);
  }
}
