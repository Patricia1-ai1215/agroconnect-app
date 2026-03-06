import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true }) orderId: string;
  @Prop({ required: true }) senderId: string;
  @Prop({ required: true }) receiverId: string;
  @Prop({ required: true }) content: string;
  @Prop({
    type: String,
    enum: ['text', 'offer', 'system'],
    default: 'text'
  })
  type: string;
  @Prop() offerPrice: number;
  @Prop({
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  })
  offerStatus: string;
  @Prop({ default: false }) isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);