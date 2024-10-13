import { PaymentService } from '@app/shared/payment/payment.service';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

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
      console.log(transaction);
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
      console.log(error);
      throw error;
    }
  }
}
