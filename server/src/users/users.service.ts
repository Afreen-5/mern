import {
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role, RoleDocument } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isUsernameExist = await this.validateUsername(createUserDto.username);
    if (isUsernameExist) throw new HttpException('Username already exists', 406);

    const isEmailExist = await this.validateEmail(createUserDto.email);
    if (isEmailExist) throw new HttpException('Email already exists', 406);

    const role = await this.roleModel.findById(createUserDto.roleId).exec();
    if (!role) throw new NotFoundException('Role not found');

    const hashedPwd = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPwd,
      role: role._id,
    });
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().populate('role').exec();
  }

  async findOne(id: string) {
    const isValid = this.validateId(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    const user = await this.userModel.findById(id).populate('role').exec();
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const role = await this.roleModel.findById(updateUserDto.roleId).exec();
    if (!role) throw new HttpException('Role not found', 404);

    const user = this.userModel.findById(id);
    if (!user) throw new HttpException('User not found', 404);

    return this.userModel
      .findByIdAndUpdate(
        id,
        { ...updateUserDto, role: role._id },
        { new: true },
      )
      .exec();
  }

  async remove(id: string) {
    const isValid = this.validateId(id);
    if (!isValid) throw new HttpException('User id is not valid', 400);

    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new HttpException('User not found', 404);

    return user;
  }

  //          -----------------------------------******   CUSTOM FUNCTIONS   ******----------------------------------------------

  // signin
  async findUser(username: string) {
    return await this.userModel.findOne({ email: username }).exec();
  }

  // unique email verification
  async validateEmail(email: string) {
    const isExist = await this.userModel.findOne({ email: email }).exec();
    console.log(isExist, 'Within function call of email');
    return isExist;
  }

  // unique username verification
  async validateUsername(username: string) {
    const isExist = await this.userModel.findOne({ username: username }).exec();
    console.log(isExist, 'Within function of username');
    return isExist;
  }

  // check if the id is valid
  validateId(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    return isValid;
  }

  async findUsersByRole() {
    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'roles', // table name
          localField: 'role', // name in user table
          foreignField: '_id',
          as: 'roleDetails' 
        },
      },
      {
        $unwind: '$roleDetails'
      },
      {
        $match: {
          'roleDetails.role': "User"
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          phone: 1,
          role: '$roleDetails'
        }
      }
    ])
    if(!users.length) throw new HttpException("Users not found", 404);
    return users;
  }
}
