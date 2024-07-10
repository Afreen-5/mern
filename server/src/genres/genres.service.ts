import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { fetchGenres } from 'src/tmdb.service';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from './entities/genre.entity';
import { Model } from 'mongoose';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name)
    private genreModel: Model<GenreDocument>,
  ) {}

  create(createGenreDto: CreateGenreDto) {
    return 'This action adds a new genre';
  }

  findAll() {
    return this.genreModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }

  //          -----------------------------------******   CUSTOM FUNCTIONS   ******----------------------------------------------

  // Fetch genres from tmdb api and storing it locally in DB
  async saveGenresLocal() {
    const genres = await fetchGenres();
    if (Array.isArray(genres)) {
      genres.map(async (genre) => {
        const mappedGenres = this.mapGenres(genre);
        await new this.genreModel(mappedGenres).save();
      });
    } else {
      console.error('Error adding genre data to db');
    }
  }

  mapGenres(genre: any) {
    return {
      genresId: genre.id,
      genre: genre.name,
    };
  }

  async findGenresCount() {
    const genres = await this.genreModel.find().exec();
    return genres.length;
  }
}
