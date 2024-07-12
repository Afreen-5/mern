import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateProfileDto {

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    userId: Types.ObjectId;

    @IsOptional()
    // @IsArray()
    // @IsString({each: true})
    favoriteIds?: string[];

    @IsOptional()
    watchLaterIds?: Types.ObjectId[];
}
