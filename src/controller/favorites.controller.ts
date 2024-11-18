import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { FavoritesService } from '../service/favorites.service';
import { IdParamReqDto } from '../dto/request/id-param.dto';
import { FavoritesResponseDto } from 'src/dto/response/favorites.response.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites(): Promise<FavoritesResponseDto> {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrackToFavorites(@Param() params: IdParamReqDto): Promise<void> {
    return this.favoritesService.addTrackToFavorites(params.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrackFromFavorites(
    @Param() params: IdParamReqDto,
  ): Promise<void> {
    return this.favoritesService.removeTrackFromFavorites(params.id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbumToFavorites(@Param() params: IdParamReqDto): Promise<void> {
    return this.favoritesService.addAlbumToFavorites(params.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbumFromFavorites(
    @Param() params: IdParamReqDto,
  ): Promise<void> {
    return this.favoritesService.removeAlbumFromFavorites(params.id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtistToFavorites(@Param() params: IdParamReqDto): Promise<void> {
    return this.favoritesService.addArtistToFavorites(params.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtistFromFavorites(
    @Param() params: IdParamReqDto,
  ): Promise<void> {
    return this.favoritesService.removeArtistFromFavorites(params.id);
  }
}
