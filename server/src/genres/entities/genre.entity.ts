import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractEntity } from "src/abstract.entity";

@Schema()
export class Genre extends AbstractEntity{
    @Prop({requied: false, index: true})
    genresId: number;

    @Prop({required: false, index: true})
    genre: string;
}

export type GenreDocument = Genre & Document;
export const GenreSchema = SchemaFactory.createForClass(Genre);