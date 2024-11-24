import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { RepositoryModule } from './repository.module';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from '../service/password.service';

@Module({
  imports: [RepositoryModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
