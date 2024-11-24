import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { RepositoryModule } from './repository.module';
import { PasswordService } from 'src/service/password.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('TOKEN_EXPIRE_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    RepositoryModule,
  ],
  providers: [AuthService, JwtStrategy, PasswordService],
  controllers: [AuthController],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
