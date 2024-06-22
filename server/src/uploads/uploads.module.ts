import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from './entities/upload.entity';
import { Movie, MovieSchema } from 'src/movies/entities/movie.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Upload.name, schema: UploadSchema },
      {name: Movie.name, schema: MovieSchema}
    ])
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
