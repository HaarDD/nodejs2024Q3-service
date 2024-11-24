import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { User } from '@prisma/client';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  findFirst(): Promise<User | null> {
    return this.prisma.user.findFirst();
  }

  async create(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const now = new Date();
    return this.prisma.user.create({
      data: {
        ...userData,
        createdAt: now,
        updatedAt: now,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { login } });
  }

  async update(user: User): Promise<User> {
    const now = new Date();
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: user.password,
        version: { increment: 1 },
        updatedAt: now,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
