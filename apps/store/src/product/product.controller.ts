import { ProductService } from '@app/product';
import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  async getAllProduct() {
    // TODO Add pagination and filters
    return this.productService.getAllProduct();
  }
}
