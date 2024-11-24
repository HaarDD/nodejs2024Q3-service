import {
  Controller,
  Post,
  Body,
  HttpCode,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserReqCreateDto } from '../user/dto/user-create.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: UserReqCreateDto) {
    return this.authService.signup(createUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Body(new ValidationPipe({ validateCustomDecorators: false }))
    refreshTokenDto: any,
  ) {
    if (!refreshTokenDto?.refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    return this.authService.refresh(refreshTokenDto);
  }
}
