import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { ArtistModule } from './modules/artist.module';
import { AlbumModule } from './modules/album.module';
import { TrackModule } from './modules/track.module';
import { RepositoryModule } from './modules/repository.module';
import { FavoritesModule } from './modules/favorites.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    RepositoryModule,
  ],
})
export class AppModule {}
