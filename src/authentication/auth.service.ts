import {
  Injectable,
  Inject,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../user/user.repository.interface';
import { UserReqCreateDto } from '../user/dto/user-create.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IMapper } from 'src/common/mapper/mapper-to-dto.interface';
import { User } from '@prisma/client';
import { UserReqUpdateDto } from 'src/user/dto/user-upd-pass.dto';
import { UserResponseDto } from 'src/user/dto/user.response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('UserMapper')
    private readonly userMapper: IMapper<
      User,
      UserReqCreateDto,
      UserReqUpdateDto,
      UserResponseDto
    >,
  ) {}

  async signup(createUserDto: UserReqCreateDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(this.configService.get<string>('CRYPT_SALT')),
    );

    createUserDto.password = hashedPassword;

    const userData = this.userMapper.mapFromCreateDto(createUserDto);
    const savedUser = await this.userRepository.create(userData);
    return this.userMapper.mapToDto(savedUser);
  }

  async validateUser(login: string, password: string) {
    const user = await this.userRepository.findByLogin(login);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.login, loginDto.password);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.login);
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    try {
      const decoded = this.jwtService.verify(refreshTokenDto.refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      });

      return this.generateTokens(decoded.userId, decoded.login);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  private async generateTokens(userId: string, login: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
          expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
        },
      ),
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
          expiresIn: this.configService.get<string>(
            'TOKEN_REFRESH_EXPIRE_TIME',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
