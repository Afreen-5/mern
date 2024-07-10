import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { AbstractEntity } from "src/abstract.entity";
import { Movie } from "src/movies/entities/movie.entity";

@Schema()
export class Review extends AbstractEntity{

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: false})
    movie: Movie;

    @Prop({ required: false, index: true })
    movie_id?: number;    

    @Prop({required: false, index: true})
    username: string;

    @Prop({required: false, index: true})
    rating: number;

    @Prop({required: false, index: true })
    content: string;
}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
