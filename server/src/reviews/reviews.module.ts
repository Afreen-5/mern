import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { Movie, MovieSchema } from 'src/movies/entities/movie.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Review.name, schema: ReviewSchema},
    {name: Movie.name, schema: MovieSchema}
  ])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
