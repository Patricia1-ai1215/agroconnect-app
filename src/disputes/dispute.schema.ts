import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DisputeDocument = Dispute & Document;

@Schema({ timestamps: true })
export class Dispute {
  @Prop({ required: true }) orderId: string;
  @Prop({ required: true }) reportedBy: string;
  @Prop({ required: true }) reason: string;
  @Prop({ required: true }) description: string;
  @Prop({
    type: String,
    enum: ['open', 'under_review', 'resolved', 'closed'],
    default: 'open',
  })
  status: string;
  @Prop() adminId: string;
  @Prop() resolution: string;
}

export const DisputeSchema = SchemaFactory.createForClass(Dispute);