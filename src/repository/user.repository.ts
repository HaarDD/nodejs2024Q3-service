import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { User } from '@prisma/client';
import { IUserRepository } from './interfaces/user.repository.interface';

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

    const userUpdated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
        version: { increment: 1 },
        updatedAt: now,
      },
    });

    return userUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async validatePassword(id: string, password: string): Promise<boolean> {
    const user = await this.findById(id);
    return user?.password === password;
  }
}
