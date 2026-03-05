import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(dto: any, farmerId: string) {
    return this.productModel.create({ ...dto, farmerId });
  }

  async getAllProducts() {
    return this.productModel.find({ status: 'available' }).sort({ createdAt: -1 });
  }

  async getProductsByFarmer(farmerId: string) {
    return this.productModel.find({ farmerId }).sort({ createdAt: -1 });
  }

  async getProductById(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Produit introuvable');
    return product;
  }

  async updateProduct(id: string, dto: any) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}