import { OrderProduct } from 'src/entities/order-product.entity';
import { IDatabase } from 'src/interfaces/database.interface';
import { IOrderProductGateway } from 'src/interfaces/order-product.gateway.interface';

export class OrderProductGateway implements IOrderProductGateway {
  constructor(private database: IDatabase) {}

  async findByOrderId(orderId: number): Promise<OrderProduct[]> {
    return this.database.findOrderProductsByOrderId(orderId);
  }

  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    return this.database.createOrderProduct(orderProduct);
  }

  async delete(id: number): Promise<void> {
    return this.database.deleteOrderProduct(id);
  }
}