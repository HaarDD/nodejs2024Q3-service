import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Artist } from '@prisma/client';
import { IArtistRepository } from './artist.repository.interface';

@Injectable()
export class ArtistRepository implements IArtistRepository {
  constructor(private prisma: PrismaService) {}

  async create(artist: Omit<Artist, 'id'>): Promise<Artist> {
    return this.prisma.artist.create({ data: artist });
  }

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async findById(id: string): Promise<Artist | null> {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  async update(artist: Artist): Promise<Artist> {
    return this.prisma.artist.update({
      where: { id: artist.id },
      data: artist,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.artist.delete({ where: { id } });
  }
}
