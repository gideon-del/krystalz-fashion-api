/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/cart.dto';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
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
      const cartProduct = this.prismaService.cart.update({
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
            include: {
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
      throw new ConflictException('Product already in cart');
    }
  }
}
