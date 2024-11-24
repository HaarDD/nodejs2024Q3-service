import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserReqCreateDto } from '../dto/request/user-create.dto';
import { LoginDto } from '../dto/request/login.dto';
import { RefreshTokenDto } from '../dto/request/refresh-token.dto';
import { Public } from '../decorators/public.decorator';

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
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }
}
