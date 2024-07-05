import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Movie } from './entities/movie.entity';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';

const mockMovieData = {
  title: 'Test Movie',
  description: 'This is a test movie',
  release_date: new Date(),
  rating: 4.5,
  genresId: [1, 2, 3],
  poster_path: 'path/to/poster.jpg',
};

const mockMovieModel = {
  create: jest.fn().mockResolvedValue({_id: 'mockId', ...mockMovieData}),
}

describe('MoviesService', () => {
  let service: MoviesService;
  let movieModel: Model<Movie>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: mockMovieModel,
        }
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieModel = module.get<Model<Movie>>(getModelToken('Movie'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a movie', async () => {
    const createMovieDto: CreateMovieDto = {
        title: 'Test Movie',
        description: 'This is a test movie',
        release_date: new Date(),
        rating: 4.5,
        genresId: [1, 2, 3],
        poster_path: 'path/to/poster.jpg',
    };

    const createdMovie = await service.create(createMovieDto);
    expect(createdMovie).toHaveProperty('_id');
    expect(mockMovieModel.create).toHaveBeenCalledWith(createMovieDto);
  });

});


