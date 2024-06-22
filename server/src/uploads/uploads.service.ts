import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Upload, UploadDocument } from './entities/upload.entity';
import mongoose, { Model } from 'mongoose';
import { Movie, MovieDocumet } from 'src/movies/entities/movie.entity';

@Injectable()
export class UploadsService {
  constructor(
    @InjectModel(Upload.name)
    private uploadModel: Model<UploadDocument>,
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocumet>,
  ) {}

  async create(file: Express.Multer.File, movieId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(movieId);
    if (!isValid) throw new HttpException('Invalid Id', 406);

    const movie = await this.movieModel.findById(movieId);
    if (!movie)
      throw new HttpException('Movie not found for requested Id', 404);

    const upload = new this.uploadModel({
      data: file,
      movie: movie._id,
    });
    return await upload.save();
  }

  findAll() {
    return this.uploadModel.find().populate('movie').exec();
  }

  findOne(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException("Invalid Id", 400);

    const upload = this.uploadModel.findById(id).populate('movie').exec();
    if(!upload) throw new HttpException("File not found", 404);

    return upload;
  }

  async update(id: string, file: Express.Multer.File, movieId?: Object) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 406);
    if (movieId) {
      const movie = await this.movieModel.findById(movieId).exec();
      await this.uploadModel.findByIdAndUpdate(id, { movie: movie._id });
    }
    return await this.uploadModel.findByIdAndUpdate(id, { data: file }, { new: true });
  }

  async remove(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException("Invalid Id", 400);

    const upload = await this.uploadModel.findById(id);
    if(!upload) throw new HttpException("File not found", 404);

    return this.uploadModel.findByIdAndDelete(id);
  }
}
