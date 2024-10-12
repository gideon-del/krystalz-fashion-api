import {
  IsArray,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
class CartSize {
  @IsString()
  sizeId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
class CartProduct {
  @ValidateNested({ each: true })
  cartSize: CartSize;
}
export class CreateCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  cart: CartProduct;
}
