import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsOptional()
  username?: string;
  
  @IsOptional()
  password?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  roleId?: Types.ObjectId;
}
