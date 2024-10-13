import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateCartDto, UpdateCartItemDto } from './dto/cart.dto';
import { CartService } from './cart.service';
@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Post('/add')
  async addToCart(@Req() req, @Body() cartDto: CreateCartDto) {
    return await this.cartService.createCart(cartDto, req.user.id);
  }
  @Put('/:cartId')
  async updateCartQuantity(
    @Req() req,
    @Param() { cartId }: { cartId: string },
    @Body() updateCartDto: UpdateCartItemDto,
  ) {
    return await this.cartService.updateCartItem(
      req.user.id,
      cartId,
      updateCartDto.quantity,
    );
  }
  @Get('')
  async getAllCart(@Req() req) {
    return await this.cartService.getUserCarts(req.user.id);
  }
}
