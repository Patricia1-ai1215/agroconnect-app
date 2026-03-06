import {
  Controller, Get, Post, Put,
  Body, Param, UseGuards, Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('buyer/:id')
  getOrdersByBuyer(@Param('id') id: string) {
    return this.orderService.getOrdersByBuyer(id);
  }

  @Get('farmer/:id')
  getOrdersByFarmer(@Param('id') id: string) {
    return this.orderService.getOrdersByFarmer(id);
  }

  @Post()
  createOrder(@Body() dto: any, @Request() req) {
    return this.orderService.createOrder(dto, req.user.userId);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: any) {
    return this.orderService.updateOrderStatus(id, body.status);
  }
}