import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AbstractEntity } from 'src/abstract.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Schema()
export class Upload extends AbstractEntity {
  @Prop({ type: mongoose.Schema.Types.Mixed, index: true, required: false })
  data: any;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: false, index: true })
  movie?: Movie;
}

export type UploadDocument = Upload & Document;
export const UploadSchema = SchemaFactory.createForClass(Upload);
