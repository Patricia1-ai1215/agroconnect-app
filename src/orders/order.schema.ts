import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true }) productId: string;
  @Prop({ required: true }) buyerId: string;
  @Prop({ required: true }) farmerId: string;
  @Prop({ required: true }) quantity: number;
  @Prop({ required: true }) totalPrice: number;
  @Prop({ required: true }) deliveryLocation: string;
  @Prop({
    type: String,
    enum: ['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;
  @Prop() transporterId: string;
  @Prop() notes: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);