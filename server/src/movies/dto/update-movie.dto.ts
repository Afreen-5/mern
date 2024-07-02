import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {

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
    release_date?: Date;

    @IsOptional()
    rating?: number;

    @IsOptional()
    @IsArray()
    genres?: string[];

    @IsOptional()
    poster_path?: string;
}
