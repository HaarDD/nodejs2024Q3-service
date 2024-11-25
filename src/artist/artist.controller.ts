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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Artists')
@ApiBearerAuth()
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [ArtistResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @Get()
  async findAll(): Promise<ArtistResponseDto[]> {
    return this.artistService.findAll();
  }

  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({ status: 404, description: 'Artist was not found.' })
  @Get(':id')
  async findById(@Param() params: IdParamReqDto): Promise<ArtistResponseDto> {
    return this.artistService.findById(params.id);
  }

  @ApiOperation({ summary: 'Add new artist' })
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: ArtistResponseDto,
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
    @Body() createArtistDto: ArtistReqCreateDto,
  ): Promise<ArtistResponseDto> {
    return this.artistService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'Update artist information' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been updated.',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({ status: 404, description: 'Artist was not found.' })
  @Put(':id')
  async update(
    @Param() params: IdParamReqDto,
    @Body() updateArtistDto: ArtistReqUpdateDto,
  ): Promise<ArtistResponseDto> {
    return this.artistService.update(params.id, updateArtistDto);
  }

  @ApiOperation({ summary: 'Delete artist' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({ status: 404, description: 'Artist was not found.' })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: IdParamReqDto): Promise<void> {
    return this.artistService.delete(params.id);
  }
}
