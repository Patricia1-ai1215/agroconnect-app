import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tracking, TrackingDocument } from './tracking.schema';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(Tracking.name) private trackingModel: Model<TrackingDocument>,
  ) {}

  async getTrackingByOrder(orderId: string) {
    return this.trackingModel.find({ orderId }).sort({ createdAt: 1 });
  }

  async addTrackingStep(dto: any, updatedBy: string) {
    return this.trackingModel.create({ ...dto, updatedBy });
  }
}