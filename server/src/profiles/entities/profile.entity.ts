import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { AbstractEntity } from "src/abstract.entity";
import { Movie } from "src/movies/entities/movie.entity";
import { Review } from "src/reviews/entities/review.entity";
import { User } from "src/users/entities/user.entity";

@Schema()
export class Profile extends AbstractEntity{
    @Prop({required: true, index: true})
    firstName: string;

    @Prop({required: true, index: true})
    lastName: string;

    // 1-1
    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    // N-N
    @Prop({type: [{type:mongoose.Schema.Types.ObjectId , ref: 'Movie'}], required: false })
    favorites?: mongoose.Types.ObjectId[];

    @Prop({type:mongoose.Schema.Types.ObjectId , ref: 'Movie', required: false})
    watchLater?: Movie[];

    // not used
    @Prop({type: [{type:mongoose.Schema.Types.ObjectId , ref: 'Review', review: String}]})
    reviews?: Review[];

    @Prop({type: [{type:mongoose.Schema.Types.ObjectId , ref: 'Rating', required: false}]})
    rating?: Movie[];
}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
