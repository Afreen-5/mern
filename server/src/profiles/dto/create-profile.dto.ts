import { IsNotEmpty, IsOptional, IsString } from "class-validator";
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
    favoriteIds?: Types.ObjectId[];

    @IsOptional()
    watchLaterIds?: Types.ObjectId[];
}
