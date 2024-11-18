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
import { TrackReqCreateDto } from '../dto/request/track-create.dto';
import { TrackReqUpdateDto } from '../dto/request/track-update.dto';
import { IdParamReqDto } from 'src/dto/request/id-param.dto';
import { TrackResponseDto } from 'src/dto/response/track.response.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<TrackResponseDto[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: IdParamReqDto): Promise<TrackResponseDto> {
    return this.trackService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() createTrackDto: TrackReqCreateDto,
  ): Promise<TrackResponseDto> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamReqDto,
    @Body() updateTrackDto: TrackReqUpdateDto,
  ): Promise<TrackResponseDto> {
    return this.trackService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamReqDto): Promise<void> {
    return this.trackService.delete(params.id);
  }
}
