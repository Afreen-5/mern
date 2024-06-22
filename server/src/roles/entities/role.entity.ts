import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractEntity } from "src/abstract.entity";
import { User } from "src/users/entities/user.entity";

@Schema()
export class Role extends AbstractEntity {

    @Prop({required: true, index: true})
    role: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })    
    users: User[];
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
