import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { ArtistModule } from './modules/artist.module';
import { AlbumModule } from './modules/album.module';
import { TrackModule } from './modules/track.module';
import { RepositoryModule } from './modules/repository.module';
import { FavoritesModule } from './modules/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma.module';
import { AuthModule } from './modules/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
