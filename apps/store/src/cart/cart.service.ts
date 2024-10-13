/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/cart.dto';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CartService {
  cartSelect: any;
  constructor(private prismaService: PrismaService) {
    this.cartSelect = {
      cartProduct: {
        select: {
          cart_id: false,
          quantity: true,
          size_id: false,
          size: {
            select: {
              productId: false,
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
      userId: false,
    };
  }
  async createCart({ cart }: CreateCartDto, userId: string) {
    try {
      const existingCart = await this.prismaService.cart.findFirst({
        where: {
          userId,
        },
      });
      if (!existingCart) {
        return await this.prismaService.cart.create({
          data: {
            cartProduct: {
              create: {
                quantity: cart.cartSize.quantity,
                size_id: cart.cartSize.sizeId,
              },
            },
            total: 10,
            userId: userId,
          },
        });
      }
      const existingCartProduct = await this.prismaService.cart.findFirst({
        where: {
          userId,
          cartProduct: {
            some: {
              size_id: cart.cartSize.sizeId,
            },
          },
        },
      });
      if (existingCartProduct) {
        throw new ConflictException('Product size already in cart');
      }
      const cartProduct = await this.prismaService.cart.update({
        where: {
          userId,
          id: existingCart.id,
        },

        data: {
          cartProduct: {
            create: {
              quantity: cart.cartSize.quantity,
              size_id: cart.cartSize.sizeId,
            },
          },
          total: 10,
        },
        select: {
          cartProduct: {
            select: {
              size: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
      return cartProduct;
    } catch (error) {
      // TODO: ADD LOGGER
      throw new ConflictException('Product already in cart');
    }
  }
  async updateCartItem(
    userId: string,
    cartId: string,
    updatedQuantity: number,
  ) {
    try {
      const cartItem = await this.prismaService.cartProduct.findUnique({
        where: {
          id: cartId,
          cart: {
            userId,
          },
        },
      });
      if (!cartItem) {
        throw new NotFoundException('Product not in cart');
      }
      const cart = await this.prismaService.cart.update({
        where: {
          userId,
        },
        data: {
          cartProduct: {
            update: {
              where: {
                id: cartItem.id,
              },
              data: {
                quantity: updatedQuantity,
              },
            },
          },
        },
        select: this.cartSelect,
      });
      return cart;
    } catch (error) {
      // TODO: ADD LOGGER
      throw error;
    }
  }
  async getUserCarts(userId: string) {
    try {
      const cart = this.prismaService.cart.findUnique({
        where: {
          userId,
        },
        select: this.cartSelect,
      });
      if (!cart) {
        return {
          cartProduct: [],
        };
      }
      return cart;
    } catch (error) {
      // TODO: ADD LOGGER
      console.log(error);
      throw error;
    }
  }
}
