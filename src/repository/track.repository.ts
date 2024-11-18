import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Track } from '@prisma/client';
import { ITrackRepository } from './interfaces/track.repository.interface';

@Injectable()
export class TrackRepository implements ITrackRepository {
  constructor(private prisma: PrismaService) {}

  async create(track: Omit<Track, 'id'>): Promise<Track> {
    return this.prisma.track.create({ data: track });
  }

  async findAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async findById(id: string): Promise<Track | null> {
    return this.prisma.track.findUnique({ where: { id } });
  }

  async update(track: Track): Promise<Track> {
    return this.prisma.track.update({
      where: { id: track.id },
      data: track,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.track.delete({ where: { id } });
  }
}
