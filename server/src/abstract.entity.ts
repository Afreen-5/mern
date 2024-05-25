import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export abstract class AbstractEntity {
  @Prop({ default: Date.now, index: true })
  createdAt: Date;

  @Prop({ default: Date.now, index: true })
  updatedAt: Date;
}
