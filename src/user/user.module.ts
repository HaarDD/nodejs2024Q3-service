import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { RepositoryModule } from '../common/module/repository.module';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from '../authentication/password.service';

@Module({
  imports: [RepositoryModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
