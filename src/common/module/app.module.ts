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
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../authentication/jwt-auth.guard';

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
