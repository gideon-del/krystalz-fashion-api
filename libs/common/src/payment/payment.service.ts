/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  secret: string;
  paystackApi: string;
  constructor(private httpClient: HttpService) {
    this.secret = process.env.PAYSTACK_SECRET;
    this.paystackApi = `https://api.paystack.co`;
  }

  async initializeTransaction(
    email: string,
    amount: number,
    metadata: any = {},
  ) {
    const source = this.httpClient.post(
      `${this.paystackApi}/transaction/initialize`,
      {
        amount: amount * 100,
        email,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${this.secret}`,
        },
      },
    );
    const transaction = await lastValueFrom(source);
    return transaction.data;
  }
}
