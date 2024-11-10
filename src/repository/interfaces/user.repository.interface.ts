import { User } from '../../entity/user.entity';

type UserWithoutPassword = Omit<User, 'password'>;

export interface IUserRepository {
  create(user: User): Promise<UserWithoutPassword>;
  findAll(): Promise<UserWithoutPassword[]>;
  findById(id: string): Promise<UserWithoutPassword | null>;
  update(user: User): Promise<UserWithoutPassword>;
  delete(id: string): Promise<void>;
  validatePassword(id: string, password: string): Promise<boolean>;
}
