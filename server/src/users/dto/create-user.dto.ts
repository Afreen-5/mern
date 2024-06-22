import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  roleId: Types.ObjectId;
}
