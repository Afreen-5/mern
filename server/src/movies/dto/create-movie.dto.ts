import { IsOptional, IsString } from "class-validator";

export class CreateMovieDto {

    @IsOptional()
    @IsString()
    movie?: string;

    @IsOptional()
    @IsString()
    poster?: string;

    @IsOptional()
    @IsString()
    videoKey?: string; 
}
