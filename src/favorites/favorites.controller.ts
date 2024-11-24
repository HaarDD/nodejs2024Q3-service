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

@Controller('favs')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites(@Req() request): Promise<FavoritesResponseDto> {
    const userId = request.user.id;
    return this.favoritesService.getFavorites(userId);
  }

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
