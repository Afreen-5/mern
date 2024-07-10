import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAllByPage(@Query('page') page: number, @Query('limit') limit: number) {
    return this.moviesService.findAllByPage(page, limit);
  }
 
  // Movies count for Status in Admin Dashboard
  @Get('/count') 
  findAllMoviesCount() {
    return this.moviesService.findAllMoviesCount();
  }

  @Get('stats')
  getMoviesStats() {
    return this.moviesService.getMovieStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/added-per-month')
  async getMoviesAddedPerMonth(): Promise<{ month: string; count: number }[]> {
    return this.moviesService.getMoviesAddedPerMonth();
  }

  // Get reviews by movie
  @UseGuards(JwtAuthGuard)
  @Get('review-by-movie/:movie_id')
  getReview(@Param('movie_id') movie_id: number) {
    return this.moviesService.getReviews(movie_id);
  }  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  // save movies from tmdb to local db
  @Get('fetch/:category')
  fetchMovies(@Param('category') category: string) {
    return this.moviesService.saveFetchedMovies(category);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
