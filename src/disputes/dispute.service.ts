import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dispute, DisputeDocument } from './dispute.schema';

@Injectable()
export class DisputeService {
  constructor(
    @InjectModel(Dispute.name) private disputeModel: Model<DisputeDocument>,
  ) {}

  async getAllDisputes() {
    return this.disputeModel.find().sort({ createdAt: -1 });
  }

  async createDispute(dto: any, reportedBy: string) {
    return this.disputeModel.create({ ...dto, reportedBy });
  }

  async takeUnderReview(id: string, adminId: string) {
    const dispute = await this.disputeModel.findById(id);
    if (!dispute) throw new NotFoundException('Litige introuvable');
    dispute.status = 'under_review';
    dispute.adminId = adminId;
    await dispute.save();
    return dispute;
  }

  async resolveDispute(id: string, resolution: string, adminId: string) {
    const dispute = await this.disputeModel.findById(id);
    if (!dispute) throw new NotFoundException('Litige introuvable');
    dispute.status = 'resolved';
    dispute.resolution = resolution;
    dispute.adminId = adminId;
    await dispute.save();
    return dispute;
  }
}