import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGenreDto {
     @IsOptional()
     genresId: number;

     @IsOptional()
     @IsString()
     genre: string;
}
