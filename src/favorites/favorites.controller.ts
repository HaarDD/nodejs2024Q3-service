import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IdParamReqDto } from '../common/dto/id-param.dto';
import { FavoritesResponseDto } from 'src/favorites/dto/favorites.response.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@ApiBearerAuth('access-token')
@Controller('favs')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: FavoritesResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @Get()
  async getFavorites(@Req() request): Promise<FavoritesResponseDto> {
    return this.favoritesService.getFavorites(request.user.id);
  }

  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 422,
    description: "Track with id doesn't exist.",
  })
  @Post('track/:id')
  @HttpCode(201)
  async addTrackToFavorites(
    @Req() request,
    @Param() params: IdParamReqDto,
  ): Promise<void> {
    return this.favoritesService.addTrackToFavorites(
      request.user.id,
      params.id,
    );
  }

  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @Delete('track/:id')
  @HttpCode(204)
  async removeTrackFromFavorites(
    @Req() request,
    @Param() params: IdParamReqDto,
  ): Promise<void> {
    return this.favoritesService.removeTrackFromFavorites(
      request.user.id,
      params.id,
    );
  }

  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 422,
    description: "Album with id doesn't exist.",
  })
  @Post('album/:id')
  @HttpCode(201)
  async addAlbumToFavorites(
    @Req() request,
    @Param() params: IdParamReqDto,
  ): Promise<void> {
    return this.favoritesService.addAlbumToFavorites(
      request.user.id,
      params.id,
    );
  }

  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbumFromFavorites(
    @Req() request,
    @Param() params: IdParamReqDto,
  ): Promise<void> {
    return this.favoritesService.removeAlbumFromFavorites(
      request.user.id,
      params.id,
    );
  }

  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 422,
    description: "Artist with id doesn't exist.",
  })
  @Post('artist/:id')
  @HttpCode(201)
  async addArtistToFavorites(
    @Req() request,
    @Param() params: IdParamReqDto,
  ): Promise<void> {
    return this.favoritesService.addArtistToFavorites(
      request.user.id,
      params.id,
    );
  }

  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist was not found.',
  })
  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtistFromFavorites(
    @Req() request,
    @Param() params: IdParamReqDto,
  ): Promise<void> {
    return this.favoritesService.removeArtistFromFavorites(
      request.user.id,
      params.id,
    );
  }
}
