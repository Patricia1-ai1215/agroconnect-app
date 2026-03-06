import {
  Controller, Get, Post,
  Body, Param, UseGuards, Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TrackingService } from './tracking.service';

@ApiTags('Tracking')
@Controller('tracking')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  @Get(':orderId')
  getTracking(@Param('orderId') orderId: string) {
    return this.trackingService.getTrackingByOrder(orderId);
  }

  @Post()
  addStep(@Body() dto: any, @Request() req) {
    return this.trackingService.addTrackingStep(dto, req.user.userId);
  }
}
