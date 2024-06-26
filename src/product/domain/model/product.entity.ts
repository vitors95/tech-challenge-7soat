import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { CategoryEntity } from 'src/category/domain/model/category.entity';

export class ProductEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ example: 'product name' })
  name: string;

  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: Number })
  price: Prisma.Decimal;

  @ApiProperty({ example: 'product description' })
  description: string;

  @ApiProperty({ type: Array })
  pictures: string[];

  @ApiProperty({ type: CategoryEntity })
  category: CategoryEntity;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
