import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    userId: Types.ObjectId;

    @IsOptional()
    favoriteIds?: string[];

    @IsOptional()
    watchLaterIds?: Types.ObjectId[];
}
