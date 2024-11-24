import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Album, Artist, Favorites, Track } from '@prisma/client';
import { IFavoritesRepository } from './favorites.repository.interface';

@Injectable()
export class FavoritesRepository implements IFavoritesRepository {
  constructor(private prisma: PrismaService) {}

  private async ensureFavoritesExist(userId: string): Promise<void> {
    const favorites = await this.prisma.favorites.findUnique({
      where: { userId },
    });

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          userId,
        },
      });
    }
  }

  async getFavorites(userId: string): Promise<
    Favorites & {
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
  > {
    await this.ensureFavoritesExist(userId);
    return this.prisma.favorites.findUnique({
      where: { userId },
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
  }

  async addTrack(userId: string, trackId: string): Promise<void> {
    await this.ensureFavoritesExist(userId);
    await this.prisma.favorites.update({
      where: { userId },
      data: {
        tracks: { connect: { id: trackId } },
      },
    });
  }

  async addAlbum(userId: string, albumId: string): Promise<void> {
    await this.prisma.favorites.update({
      where: { userId },
      data: {
        albums: { connect: { id: albumId } },
      },
    });
  }

  async addArtist(userId: string, artistId: string): Promise<void> {
    await this.prisma.favorites.update({
      where: { userId },
      data: {
        artists: { connect: { id: artistId } },
      },
    });
  }

  async removeTrack(userId: string, trackId: string): Promise<void> {
    await this.prisma.favorites.update({
      where: { userId },
      data: {
        tracks: { disconnect: { id: trackId } },
      },
    });
  }

  async removeAlbum(userId: string, albumId: string): Promise<void> {
    await this.prisma.favorites.update({
      where: { userId },
      data: {
        albums: { disconnect: { id: albumId } },
      },
    });
  }

  async removeArtist(userId: string, artistId: string): Promise<void> {
    await this.prisma.favorites.update({
      where: { userId },
      data: {
        artists: { disconnect: { id: artistId } },
      },
    });
  }

  async isTrackFavorite(userId: string, trackId: string): Promise<boolean> {
    const favorite = await this.prisma.favorites.findFirst({
      where: {
        userId,
        tracks: { some: { id: trackId } },
      },
    });
    return !!favorite;
  }

  async isAlbumFavorite(userId: string, albumId: string): Promise<boolean> {
    const favorite = await this.prisma.favorites.findFirst({
      where: {
        userId,
        albums: { some: { id: albumId } },
      },
    });
    return !!favorite;
  }

  async isArtistFavorite(userId: string, artistId: string): Promise<boolean> {
    const favorite = await this.prisma.favorites.findFirst({
      where: {
        userId,
        artists: { some: { id: artistId } },
      },
    });
    return !!favorite;
  }
}
