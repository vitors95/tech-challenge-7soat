import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class OrderProductDTO {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDTO {
  @ApiPropertyOptional()
  @IsOptional()
  customerId: number;

  @ApiProperty({ example: 'order notes' })
  @IsString()
  notes: string;

  @ApiProperty({ type: OrderProductDTO, isArray: true })
  @IsArray()
  @ValidateNested()
  @Type(() => OrderProductDTO)
  orderProducts: OrderProductDTO[];
}
