import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { Product, ProductDocument } from '../products/product.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createOrder(dto: any, buyerId: string) {
    // 1. Trouver le produit
    const product = await this.productModel.findById(dto.productId);
    if (!product) throw new NotFoundException('Produit introuvable');
    if (product.quantity < dto.quantity)
      throw new BadRequestException('Quantité insuffisante');
    if (product.status !== 'available')
      throw new BadRequestException('Produit non disponible');

    // 2. Calculer le prix total
    const totalPrice = product.pricePerUnit * dto.quantity;

    // 3. Réserver le produit
    product.status = 'reserved';
    await product.save();

    // 4. Créer la commande
    return this.orderModel.create({
      ...dto,
      buyerId,
      farmerId: product.farmerId,
      totalPrice,
      status: 'pending',
    });
  }

  async getAllOrders() {
    return this.orderModel.find().sort({ createdAt: -1 });
  }

  async getOrdersByBuyer(buyerId: string) {
    return this.orderModel.find({ buyerId }).sort({ createdAt: -1 });
  }

  async getOrdersByFarmer(farmerId: string) {
    return this.orderModel.find({ farmerId }).sort({ createdAt: -1 });
  }

  async updateOrderStatus(id: string, status: string) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('Commande introuvable');

    order.status = status;
    await order.save();

    // Si livré → produit vendu
    if (status === 'delivered') {
      await this.productModel.findByIdAndUpdate(
        order.productId, { status: 'sold' }
      );
    }

    // Si annulé → produit disponible à nouveau
    if (status === 'cancelled') {
      await this.productModel.findByIdAndUpdate(
        order.productId, { status: 'available' }
      );
    }

    return order;
  }
}