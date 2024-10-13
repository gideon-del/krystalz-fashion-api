/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { OrderService } from './order.service';
@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('create')
  async createOrder(@Req() req) {
    return this.orderService.createOrder(req.user.id, req.user.email);
  }

  @Delete('/:orderId')
  async deleteOrder(@Param() { orderId }: { orderId: string }, @Req() req) {
    return this.orderService.deletUserOrder(orderId, req.user.id);
  }
  @Get()
  async getUserOrders(@Req() req) {
    return this.orderService.getUserOrders(req.user.id);
  }
}
