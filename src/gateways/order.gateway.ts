import { Order } from '../entities/order.entity';
import { IDatabase } from '../interfaces/database.interface';
import { IOrderGateway } from '../interfaces/order.gateway.interface';

export class OrderGateway implements IOrderGateway {
  constructor(private database: IDatabase) {}

  async findAll(): Promise<Order[]> {
    return this.database.findAllOrders();
  }

  async findById(id: number): Promise<Order | null> {
    return this.database.findOrderById(id);
  }

  findByPaymentId(paymentId: number): Promise<Order | null> {
    return this.database.findOrderByPaymentId(paymentId);
  }

  async create(order: Order): Promise<Order> {
    return this.database.createOrder(order);
  }

  async updateStatus(order: Order): Promise<Order> {
    return this.database.updateOrderStatus(order);
  }

  async delete(id: number): Promise<void> {
    return this.database.deleteOrder(id);
  }
}
