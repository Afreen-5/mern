import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AbstractEntity } from 'src/abstract.entity';
import { Role } from 'src/roles/entities/role.entity';

@Schema()
export class User extends AbstractEntity {
  @Prop({ unique: true })
  username: string;

  @Prop({ required: true, index: true })
  password: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true, index: true })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
