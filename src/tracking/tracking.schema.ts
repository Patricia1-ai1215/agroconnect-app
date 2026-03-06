import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrackingDocument = Tracking & Document;

@Schema({ timestamps: true })
export class Tracking {
  @Prop({ required: true }) orderId: string;
  @Prop({ required: true }) status: string;
  @Prop({ required: true }) description: string;
  @Prop() location: string;
  @Prop({ required: true }) updatedBy: string;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);