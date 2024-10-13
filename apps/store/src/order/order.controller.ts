import { Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
