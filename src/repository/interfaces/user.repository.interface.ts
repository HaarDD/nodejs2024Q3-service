import { User } from '@prisma/client';

export interface IUserRepository {
  findFirst(): Promise<User | null>;
  create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  validatePassword(id: string, password: string): Promise<boolean>;
}
