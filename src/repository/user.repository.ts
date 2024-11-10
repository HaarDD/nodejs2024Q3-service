import { User } from '../entity/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';
import { v4 as uuidv4 } from 'uuid';

type UserWithoutPassword = Omit<User, 'password'>;

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<UserWithoutPassword> {
    user.id = uuidv4();
    user.version = 1;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    this.users.push(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.users.map(({ password, ...rest }) => rest);
  }

  async findById(id: string): Promise<UserWithoutPassword | null> {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async update(updatedUser: User): Promise<UserWithoutPassword> {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      updatedUser.version = this.users[index].version + 1;
      updatedUser.updatedAt = Date.now();
      this.users[index] = { ...updatedUser };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = this.users[index];
      return userWithoutPassword;
    }
    throw new Error('User not found');
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async validatePassword(id: string, password: string): Promise<boolean> {
    const user = this.users.find((user) => user.id === id);
    return user ? user.password === password : false;
  }
}
