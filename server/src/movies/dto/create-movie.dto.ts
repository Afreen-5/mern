import { Type } from "class-transformer";
import { IsArray, IsDate, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    videoKey?: string; 

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    release_date?: Date;

    @IsOptional()
    rating?: number;

    @IsOptional()
    @IsArray()
    genres?: string[];

    @IsOptional()
    poster_path?: string;
}
