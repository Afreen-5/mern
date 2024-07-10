import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date } from "mongoose";
import { AbstractEntity } from "src/abstract.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Upload } from "src/uploads/entities/upload.entity";

@Schema()
export class Movie extends AbstractEntity{
    @Prop({ required: false, index: true })
    movie_id?: number;

    @Prop({ required: false, index: true })
    title?: string;

    @Prop({ required: false, index: true })
    description?: string;

    @Prop({ required: false, index: true })
    videoKey?: string; 

    @Prop({ type: Date, required: false, index: true})
    release_date?: Date;

    @Prop({ required: false, index: true })
    rating?: number; 

    @Prop({type: [Number], required: false, index: true })
    genreIds?: number[]; 

    @Prop({ required: false, index: true })
    poster_path?: string; 

    @Prop({ type: mongoose.Schema.ObjectId, ref: 'Upload', required: false, index: true })
    upload: Upload[];

    @Prop({ type: mongoose.Schema.ObjectId, ref: 'Review', required: false, index: true })
    review?: Review[];    

    @Prop({ type: mongoose.Schema.ObjectId, ref: 'Profile', required: false, index: true })
    profiles?: Profile[];
}

export type MovieDocumet = Movie & Document;
export const MovieSchema = SchemaFactory.createForClass(Movie);
