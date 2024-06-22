import { IsOptional } from "class-validator";
import { Types } from "mongoose";

export class CreateUploadDto {

    @IsOptional()
    data: []

    @IsOptional()
    movieId?: Types.ObjectId;
}
