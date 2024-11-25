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
import { TrackService } from './track.service';
import { TrackReqCreateDto } from './dto/track-create.dto';
import { TrackReqUpdateDto } from './dto/track-update.dto';
import { IdParamReqDto } from 'src/common/dto/id-param.dto';
import { TrackResponseDto } from 'src/track/dto/track.response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tracks')
@ApiBearerAuth()
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Get tracks list' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [TrackResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @Get()
  async findAll(): Promise<TrackResponseDto[]> {
    return this.trackService.findAll();
  }

  @ApiOperation({ summary: 'Get single track by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @Get(':id')
  async findById(@Param() params: IdParamReqDto): Promise<TrackResponseDto> {
    return this.trackService.findById(params.id);
  }

  @ApiOperation({ summary: 'Add new track' })
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: TrackResponseDto,
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
    @Body() createTrackDto: TrackReqCreateDto,
  ): Promise<TrackResponseDto> {
    return this.trackService.create(createTrackDto);
  }

  @ApiOperation({ summary: 'Update track information' })
  @ApiResponse({
    status: 200,
    description: 'The track has been updated.',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @Put(':id')
  async update(
    @Param() params: IdParamReqDto,
    @Body() updateTrackDto: TrackReqUpdateDto,
  ): Promise<TrackResponseDto> {
    return this.trackService.update(params.id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamReqDto): Promise<void> {
    return this.trackService.delete(params.id);
  }
}
