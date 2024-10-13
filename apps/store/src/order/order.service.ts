/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaymentService } from '@app/shared/payment/payment.service';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private paymentService: PaymentService,
  ) {}

  async createOrder(userId: string, email: string) {
    try {
      const userCart = await this.prismaService.cart.findFirst({
        where: {
          userId,
        },
        include: {
          cartProduct: {
            include: {
              size: {
                select: {
                  price: true,
                },
              },
            },
          },
        },
      });
      if (!userCart || !userCart.cartProduct) {
        throw new NotFoundException('User cart empty');
      }
      const total = userCart.cartProduct.reduce(
        (acc, cur) => acc + cur.quantity * cur.size.price,
        0,
      );
      const transaction = await this.paymentService.initializeTransaction(
        email,
        total,
      );
      const order = await this.prismaService.order.create({
        data: {
          authorization_url: transaction.data.authorization_url,
          paystack_reference: transaction.data.reference,
          total: total,
          orders: {
            createMany: {
              data: userCart.cartProduct.map((cart) => ({
                size_id: cart.size_id,
                sold_quantity: cart.quantity,
              })),
            },
          },
          status: 'PENDING',
          user_id: userId,
        },
        include: {
          orders: {
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
      await this.prismaService.cart.delete({
        where: {
          userId,
        },
      });
      return order;
    } catch (error) {
      throw error;
    }
  }
  async deletUserOrder(orderId: string, userId: string) {
    const order = await this.prismaService.order.findUnique({
      where: {
        id: orderId,
        user_id: userId,
      },
    });

    if (!order || order.status === 'DELETED') {
      throw new NotFoundException('Order not found');
    }
    if (order.status !== 'PENDING') {
      throw new UnauthorizedException('Order is being processed');
    }
    await this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: 'DELETED',
      },
    });

    return { message: 'Order deleted' };
  }
  async getUserOrders(userId: string) {
    try {
      const orders = await this.prismaService.order.findMany({
        where: {
          user_id: userId,
          status: {
            not: 'DELETED',
          },
        },
        include: {
          orders: {
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
      return orders;
    } catch (error) {
      // TODO: ADD LOGGER
      console.log(error);
      throw error;
    }
  }
}
