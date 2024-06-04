import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { response } from 'express';

@Injectable()
export class MoviesService {
  private readonly API_KEY =
    '28ee46571bmsh0c1e10628829b09p1132c9jsn71d3324d3299';
  private readonly BASE_URL =
    'https://streaming-availability.p.rapidapi.com/shows/search/filters';

  constructor(private httpService: HttpService) {}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  searchMovies(query: string): Observable<AxiosResponse<any>> {
    const url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${query}`;
    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  getMovieDetails(id: string): Observable<AxiosResponse<any>> {
    const url = `${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}`;
    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
