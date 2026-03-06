import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { Order, OrderDocument } from '../orders/order.schema';
import { Product, ProductDocument } from '../products/product.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getMessagesByOrder(orderId: string) {
    return this.messageModel.find({ orderId }).sort({ createdAt: 1 });
  }

  async sendMessage(dto: any, senderId: string) {
    return this.messageModel.create({ ...dto, senderId });
  }

  async makeOffer(dto: any, senderId: string) {
    return this.messageModel.create({
      orderId: dto.orderId,
      senderId,
      receiverId: dto.receiverId,
      content: `Offre de prix: ${dto.offerPrice} FCFA/${dto.unit}`,
      type: 'offer',
      offerPrice: dto.offerPrice,
      offerStatus: 'pending',
    });
  }

  async acceptOffer(messageId: string) {
    const message = await this.messageModel.findById(messageId);
    if (!message) throw new NotFoundException('Message introuvable');

    message.offerStatus = 'accepted';
    await message.save();

    const order = await this.orderModel.findById(message.orderId);
    if (!order) throw new NotFoundException('Commande introuvable');
    order.totalPrice = message.offerPrice * order.quantity;
    await order.save();

    const product = await this.productModel.findById(order.productId);
    if (!product) throw new NotFoundException('Produit introuvable');
    product.pricePerUnit = message.offerPrice;
    await product.save();

    return { message: 'Offre acceptée!', newPrice: message.offerPrice };
  }

  async rejectOffer(messageId: string) {
    const message = await this.messageModel.findById(messageId);
    if (!message) throw new NotFoundException('Message introuvable');
    message.offerStatus = 'rejected';
    await message.save();
    return { message: 'Offre rejetée' };
  }

  async markAsRead(messageId: string) {
    return this.messageModel.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );
  }
}