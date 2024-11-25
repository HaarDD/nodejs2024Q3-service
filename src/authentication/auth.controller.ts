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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup' })
  @ApiResponse({ status: 204, description: 'Successful signup' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict. Login already exists' })
  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: UserReqCreateDto) {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Successful login.',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Incorrect login or password' })
  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Refresh' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
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
