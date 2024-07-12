import { HttpException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
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

  async create(createProfileDto: CreateProfileDto) {
    const user = this.userModel.findById(createProfileDto.userId);
    if(!user) throw new HttpException("User not found", 404);

    const profile = await this.profileModel.findById({user: createProfileDto.userId});
    if(profile) throw new HttpException("Duplicate use of UserId", 406);

    let favoriteIds = [];
    if (createProfileDto.favoriteIds) {
        favoriteIds = createProfileDto.favoriteIds.map(id => new mongoose.Types.ObjectId(id));
    }
    const favorites = await this.movieModel.find({_id: {$in: favoriteIds} } ).exec();
    const favoriteObjIds = favorites.map(movie => movie._id);
    const createdprofile = {
      ...createProfileDto,
      user: createProfileDto.userId,
      favorites: favoriteObjIds
    }
    return this.profileModel.create(createdprofile);
  }

  findAll() {
    return this.profileModel.find().exec();
  }

  findOne(id: string) {
    return this.profileModel.findById(id);
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileModel.findById(id).populate('favorites').exec();
    if(!profile) throw new HttpException("Profile not found", 404);

    if(updateProfileDto.userId) {
      const user = await this.userModel.findById(updateProfileDto.userId).exec();
      if(!user) throw new HttpException("User not found", 404);
    }

    let favoriteObjIds: mongoose.Types.ObjectId[] = profile.favorites as mongoose.Types.ObjectId[]; 
    if (updateProfileDto.favoriteIds) {
        const favoriteIds = updateProfileDto.favoriteIds.map(id => new mongoose.Types.ObjectId(id));
        const favorites = await this.movieModel.find({ _id: { $in: favoriteIds } }).exec();
        favoriteObjIds = favorites.map(movie => movie._id);
    }
    const updatedprofile = {
      ...updateProfileDto,
      user: updateProfileDto.userId,
      favorites: favoriteObjIds
    }
    return this.profileModel.findByIdAndUpdate(id, updatedprofile, {new: true});
  }

  remove(id: string) {
    return this.profileModel.findByIdAndDelete(id);
  }

  //          -----------------------------------******   CUSTOM FUNCTIONS   ******-----------------------------------------


}
