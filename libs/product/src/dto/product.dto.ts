import { IsStringNumber } from '@app/shared/decorators/validator/is-string-number.validator';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSize)
  size: ProductSize[];

  @IsString()
  categoryId: string;
}

class ProductSize {
  @IsString()
  name: string;

  @IsStringNumber()
  quantity: number;

  @IsStringNumber()
  price: number;
}
