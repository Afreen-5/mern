import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}
  create(createAdminDto: CreateAdminDto) {

    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  //          -----------------------------------******   CUSTOM FUNCTIONS   ******----------------------------------------------

  async listAllUsers(): Promise<User[]> {
    return await this.userModel.find({})
      .populate('role')
      .exec()
      .then(users => {
        return users.filter(user => user.role && user.role.role === 'User');
      });
 }

}
