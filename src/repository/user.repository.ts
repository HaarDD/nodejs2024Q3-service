import { User } from '../entity/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    user.id = uuidv4();
    user.version = 1;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((users) => users.id === id) || null;
  }

  async update(updatedUser: User): Promise<User> {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index === -1) {
      throw new Error('User not found');
    }

    this.users[index] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async validatePassword(id: string, password: string): Promise<boolean> {
    const user = this.users.find((user) => user.id === id);
    return user ? user.password === password : false;
  }
}
