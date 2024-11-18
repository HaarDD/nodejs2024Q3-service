import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Album } from '@prisma/client';
import { IAlbumRepository } from './interfaces/album.repository.interface';

@Injectable()
export class AlbumRepository implements IAlbumRepository {
  constructor(private prisma: PrismaService) {}

  async create(album: Omit<Album, 'id'>): Promise<Album> {
    return this.prisma.album.create({ data: album });
  }

  async findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async findById(id: string): Promise<Album | null> {
    return this.prisma.album.findUnique({ where: { id } });
  }

  async update(album: Album): Promise<Album> {
    return this.prisma.album.update({
      where: { id: album.id },
      data: album,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.album.delete({ where: { id } });
  }
}
