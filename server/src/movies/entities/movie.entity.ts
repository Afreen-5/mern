import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractEntity } from "src/abstract.entity";
import { Upload } from "src/uploads/entities/upload.entity";

@Schema()
export class Movie extends AbstractEntity{

    @Prop({ required: false, index: true })
    movie?: string;

    @Prop({ requied: false, index: true })
    poster?: string;

    @Prop({ requied: false, index: true })
    videoKey?: string; 

    @Prop({ type: mongoose.Schema.ObjectId, ref: 'Upload', required: false, index: true })
    upload: Upload[];
}

export type MovieDocumet = Movie & Document;
export const MovieSchema = SchemaFactory.createForClass(Movie);
