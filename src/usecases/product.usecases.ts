import { Product } from 'src/entities/product.entity';
import { CategoryGateway } from 'src/interfaces/category.gateway.interface';
import { ProductGateway } from 'src/interfaces/product.gateway.interface';
import { ProductAndCategory } from 'src/types/product-and-category.type';

// TODO return the associated entities or just their ids?
// TODO handle errors

export class ProductUseCases {
  static async findAll(
    productGateway: ProductGateway,
    categoryGateway: CategoryGateway,
  ): Promise<ProductAndCategory[]> {
    const productsAndCategory: ProductAndCategory[] = [];

    const products = await productGateway.findAll();

    products.forEach(async (product) => {
      const category = await categoryGateway.findById(product.categoryId);

      if (!category) throw Error('Category not found');

      productsAndCategory.push({ product, category });
    });

    return productsAndCategory;
  }

  static async findById(
    productGateway: ProductGateway,
    categoryGateway: CategoryGateway,
    id: number,
  ): Promise<ProductAndCategory> {
    const product = await productGateway.findById(id);

    if (!product) throw Error('Product not found');

    const category = await categoryGateway.findById(product.id);

    if (!category) throw Error('Category not found');

    return { product, category };
  }

  static async create(
    productGateway: ProductGateway,
    categoryGateway: CategoryGateway,
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ): Promise<ProductAndCategory> {
    const category = await categoryGateway.findById(categoryId);

    if (!category) throw Error('Category not found!');

    const newProduct = await productGateway.save(
      Product.new(name, price, description, pictures, categoryId),
    );

    return { product: newProduct, category };
  }

  static async delete(
    productGateway: ProductGateway,
    id: number,
  ): Promise<void> {
    await productGateway.delete(id);
  }
}
