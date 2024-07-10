import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './entities/profile.entity';
import { Movie, MovieSchema } from 'src/movies/entities/movie.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Profile.name, schema: ProfileSchema},
    {name: Movie.name, schema: MovieSchema},
    {name: User.name, schema: UserSchema}
  ])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
