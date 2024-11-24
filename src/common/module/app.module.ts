import { Module } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { ArtistModule } from '../../artist/artist.module';
import { AlbumModule } from '../../album/album.module';
import { TrackModule } from '../../track/track.module';
import { RepositoryModule } from './repository.module';
import { FavoritesModule } from '../../favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../../authentication/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from '../../authentication/jwt-auth.guard';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { HttpExceptionFilter } from '../logging/http-exceptions.filter';
import { LoggingService } from '../logging/logging.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    PrismaModule,
    RepositoryModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
  providers: [
    LoggingService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
