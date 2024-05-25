import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/abstract.entity';

@Schema()
export class User extends AbstractEntity {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true, index: true })
  password: string;

  @Prop({ required: true, index: true })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
