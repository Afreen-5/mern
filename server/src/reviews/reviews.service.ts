import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { Movie, MovieDocumet } from 'src/movies/entities/movie.entity';
import { movieReviews } from 'src/tmdb.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocumet>
  ) {}

  create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create(createReviewDto);
  }

  findAll() {
    return this.reviewModel.find().exec();
  }

  findOne(id: string) {
    return this.reviewModel.findById(id);
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewModel.findByIdAndUpdate(id, updateReviewDto);
  }

  remove(id: string) {
    return this.reviewModel.findByIdAndDelete(id);
  }

  //          -----------------------------------******   CUSTOM FUNCTIONS   ******-----------------------------------------

  async saveFetchedReviews() {
    const movies = await this.movieModel.find().exec();
    if(!movies) throw new HttpException("Movies not found", 404);
    try {
      movies.map( async(movie) => {
          const reviews = await movieReviews(movie.movie_id);
          if(!reviews) throw new HttpException("No reviews found", 404);
          reviews.map(async(review: any) => {
            const mappedReview = this.mapReview(review, movie);
            const reviewsFromDB =await new this.reviewModel(mappedReview).save();
            return reviewsFromDB;
          })
      });
      console.log("All reveiws are saved successfully");
    } catch (error) {
      console.error("Failed to save review", error);
      return [];
    }
  }

  private mapReview(review: any, movie) {
    return {
      movie_id: movie.movie_id,
      username: review.author_details.username,
      rating: review.author_details.rating,
      content: review.content,
    }
  }

}
 