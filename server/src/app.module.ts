import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt-strategy';
import { MoviesModule } from './movies/movies.module';
import { AdminModule } from './admin/admin.module';
import { RolesModule } from './roles/roles.module';
import { UploadsModule } from './uploads/uploads.module';
import { GenresModule } from './genres/genres.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/movies_mern'),
    MongooseModule.forRoot(
     'mongodb+srv://Afreen:afreen123@cluster0.tmbhk5e.mongodb.net/MoviesDB?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    AuthModule,
    MoviesModule,
    AdminModule,
    RolesModule,
    UploadsModule,
    GenresModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
