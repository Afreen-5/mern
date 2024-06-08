import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Observable, map } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MoviesService {
  private readonly API_KEY =
    '90d4be4a96e8ee513a15b076908f391d';
  private readonly BASE_URL =
    'https://api.themoviedb.org/3/authentication';
    private readonly ACCESS_TOKEN_AUTH = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQ0YmU0YTk2ZThlZTUxM2ExNWIwNzY5MDhmMzkxZCIsInN1YiI6IjY2NWYzYmFmOTYxNThhM2M3ZjlkNmJlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F5rQifrZZUrSG94jYM-3WdcQ1GF9Wa8ZujeSOaNF17M';

  constructor(private httpService: HttpService) {}

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async getMoviesToken(): Promise<string> {
    const response = await axios.get(`https://api.themoviedb.org/3/authentication`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQ0YmU0YTk2ZThlZTUxM2ExNWIwNzY5MDhmMzkxZCIsInN1YiI6IjY2NWYzYmFmOTYxNThhM2M3ZjlkNmJlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F5rQifrZZUrSG94jYM-3WdcQ1GF9Wa8ZujeSOaNF17M'
      }
    });
    return response.data;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
