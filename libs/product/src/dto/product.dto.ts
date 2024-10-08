import {
  IsArray,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray({ each: true })
  @ValidateNested()
  size: ProductSize[];

  @IsString()
  categoryId: string;
}

class ProductSize {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  price: number;
}
