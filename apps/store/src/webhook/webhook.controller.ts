import { PaymentService } from '@app/shared/payment/payment.service';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import {
  Body,
  Controller,
  Headers,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  constructor(
    private paymentService: PaymentService,
    private prismaService: PrismaService,
  ) {}
  @Post('paystack')
  async processOrder(
    @Body() body: any,
    @Headers('x-paystack-signature') signature: string,
  ) {
    const isValid = this.paymentService.verifyWebhookSignature(signature, body);
    if (!isValid) {
      throw new UnauthorizedException('Invalid webhook signature');
    }
    const event = body.event;
    const reference = body.data.reference;
    const order = await this.prismaService.order.findUnique({
      where: {
        paystack_reference: reference,
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (event == 'charge.success') {
      const updatedOrder = await this.prismaService.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: 'PAYED',
          transactions: {
            create: {},
          },
        },
        include: {
          transactions: true,
        },
      });
      console.log(updatedOrder);
    }
    return { received: true };
  }
}
