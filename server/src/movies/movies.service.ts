import { HttpException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocumet } from './entities/movie.entity';
import mongoose, { Model } from 'mongoose';
import { fetchPopularMovies } from './tmdb.service';
@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocumet>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    return this.movieModel.create(createMovieDto);
  }

  findAllByPage(page = 1, limit = 10) {
    return this.movieModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 400);

    const movie = await this.movieModel.findById(id).exec();
    if (!movie) throw new HttpException('Movie not found', 404);

    return movie;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    return this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true });
  }

  remove(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    return this.movieModel.findByIdAndDelete(id);
  }

 //          -----------------------------------******   CUSTOM FUNCTIONS   ******-----------------------------------------

  // Fetch movies from tmdb api and storing it locally in DB
  async saveFetchedMovies(category: string) {
    const movies = await fetchPopularMovies(category);
    if(Array.isArray(movies)) {
      try {
        const savedMovies = movies.map(async (movie: any) => {
          const mappedMovie = this.mapMovies(movie);
          await new this.movieModel(mappedMovie).save();
        });
        await Promise.all(savedMovies);
        console.log("All movies saved successfully");
      } catch (error) {
        console.error("Error saving movies data", error);
      }
    } else {
      console.error("Fetched movies is not a valid array");
    }
  }

  // mapping the fetched movie details with the entity data
  mapMovies(movie: any) {
    return {
      title: movie.title,
      description: movie.overview,
      release_date: new Date(movie.release_date),
      rating: movie.vote_average, 
      genres: movie.genre_ids.map(String),
      poster_path: movie.poster_path
    }
  }

  async findAllMoviesCount() {
    const movies = await this.movieModel.find().exec();
    if(!movies) throw new HttpException("No movies found", 404);
    if(movies) {
      console.log(movies.length);
      return movies.length;
    }
    return 0;
  }
}
