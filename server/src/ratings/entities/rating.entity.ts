import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractEntity } from "src/abstract.entity";
import { Movie } from "src/movies/entities/movie.entity";

@Schema()
export class Rating extends AbstractEntity{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: false})
    movie: Movie;

    @Prop({required: false, index: true })
    rating: number;
}
