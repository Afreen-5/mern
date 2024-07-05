import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
