import { HttpException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './entities/profile.entity';
import { Movie, MovieDocumet } from 'src/movies/entities/movie.entity';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<ProfileDocument>,
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocumet>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const user = this.userModel.findById(createProfileDto.userId);
    if(!user) throw new HttpException("User not found", 404);

    const favoriteIds = this.movieModel.find(createProfileDto.favoriteIds).exec();

    return this.profileModel.create(createProfileDto);
  }

  findAll() {
    return this.profileModel.find().exec();
  }

  findOne(id: string) {
    return this.profileModel.findById(id);
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.profileModel.findByIdAndUpdate(id, updateProfileDto);
  }

  remove(id: string) {
    return this.profileModel.findByIdAndDelete(id);
  }

  //          -----------------------------------******   CUSTOM FUNCTIONS   ******-----------------------------------------


}
