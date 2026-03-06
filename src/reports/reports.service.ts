import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parser } from 'json2csv';
import { Order } from '../orders/order.schema';
import { Product } from '../products/product.schema';
import { Dispute } from '../disputes/dispute.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<any>,
    @InjectModel(Product.name) private productModel: Model<any>,
    @InjectModel(Dispute.name) private disputeModel: Model<any>,
  ) {}

  async getOrdersReport(): Promise<string> {
    const orders = await this.orderModel.find().lean();
    const parser = new Parser();
    return parser.parse(orders);
  }

  async getProductsReport(): Promise<string> {
    const products = await this.productModel.find().lean();
    const parser = new Parser();
    return parser.parse(products);
  }

  async getDisputesReport(): Promise<string> {
    const disputes = await this.disputeModel.find().lean();
    const parser = new Parser();
    return parser.parse(disputes);
  }
}