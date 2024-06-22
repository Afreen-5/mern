import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {

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
