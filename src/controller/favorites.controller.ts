import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { FavoritesService } from '../service/favorites.service';
import { IdParamDto } from '../dto/request/id-param.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrackToFavorites(@Param() params: IdParamDto): Promise<void> {
    return this.favoritesService.addTrackToFavorites(params.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrackFromFavorites(@Param() params: IdParamDto): Promise<void> {
    return this.favoritesService.removeTrackFromFavorites(params.id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbumToFavorites(@Param() params: IdParamDto): Promise<void> {
    return this.favoritesService.addAlbumToFavorites(params.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbumFromFavorites(@Param() params: IdParamDto): Promise<void> {
    return this.favoritesService.removeAlbumFromFavorites(params.id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtistToFavorites(@Param() params: IdParamDto): Promise<void> {
    return this.favoritesService.addArtistToFavorites(params.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtistFromFavorites(@Param() params: IdParamDto): Promise<void> {
    return this.favoritesService.removeArtistFromFavorites(params.id);
  }
}
