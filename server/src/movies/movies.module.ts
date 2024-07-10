import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './entities/movie.entity';
import { Review, ReviewSchema } from 'src/reviews/entities/review.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Movie.name, schema: MovieSchema},
      {name: Review.name, schema: ReviewSchema}
    ])
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
