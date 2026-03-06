import {
  Controller, Get, Post, Put,
  Body, Param, UseGuards, Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DisputeService } from './dispute.service';

@ApiTags('Disputes')
@Controller('disputes')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DisputeController {
  constructor(private disputeService: DisputeService) {}

  @Get()
  getAllDisputes() {
    return this.disputeService.getAllDisputes();
  }

  @Post()
  createDispute(@Body() dto: any, @Request() req) {
    return this.disputeService.createDispute(dto, req.user.userId);
  }

  @Put(':id/review')
  takeUnderReview(@Param('id') id: string, @Request() req) {
    return this.disputeService.takeUnderReview(id, req.user.userId);
  }

  @Put(':id/resolve')
  resolveDispute(@Param('id') id: string, @Body() body: any, @Request() req) {
    return this.disputeService.resolveDispute(id, body.resolution, req.user.userId);
  }
}