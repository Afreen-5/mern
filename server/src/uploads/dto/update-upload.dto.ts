import { PartialType } from '@nestjs/mapped-types';
import { CreateUploadDto } from './create-upload.dto';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

export class UpdateUploadDto extends PartialType(CreateUploadDto) {

    @IsOptional()
    @Type(() => Array)
    data: []

    @IsOptional()
    movieId?: Types.ObjectId;
}
