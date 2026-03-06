import {
  Controller, Get, Post, Put,
  Body, Param, UseGuards, Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MessageService } from './message.service';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(':orderId')
  getMessages(@Param('orderId') orderId: string) {
    return this.messageService.getMessagesByOrder(orderId);
  }

  @Post()
  sendMessage(@Body() dto: any, @Request() req) {
    return this.messageService.sendMessage(dto, req.user.userId);
  }

  @Post('offer')
  makeOffer(@Body() dto: any, @Request() req) {
    return this.messageService.makeOffer(dto, req.user.userId);
  }

  @Put(':id/accept-offer')
  acceptOffer(@Param('id') id: string) {
    return this.messageService.acceptOffer(id);
  }

  @Put(':id/reject-offer')
  rejectOffer(@Param('id') id: string) {
    return this.messageService.rejectOffer(id);
  }

  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.messageService.markAsRead(id);
  }
}