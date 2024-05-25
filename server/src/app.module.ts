import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Afreen:afreen123@cluster0.tmbhk5e.mongodb.net/MoviesDB?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
