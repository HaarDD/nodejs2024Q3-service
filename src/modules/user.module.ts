import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { UserController } from '../controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'UserRepository', useClass: UserRepository },
  ],
})
export class UserModule {}
