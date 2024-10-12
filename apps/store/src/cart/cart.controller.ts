import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateCartDto } from './dto/cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Post('/add')
  @UseGuards(JwtGuard)
  async addToCart(@Req() req, @Body() cartDto: CreateCartDto) {
    return await this.cartService.createCart(cartDto, req.user.id);
  }
}
