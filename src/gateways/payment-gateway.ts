import { Payment } from '../entities/payment.entity';
import { IPaymentGateway } from '../interfaces/payment.gateway.interface';
import { IPayment } from '../interfaces/payment.interface';

export class PaymentGateway implements IPaymentGateway {
  constructor(private paymentMethod: IPayment) {}

  public async create(payment: Payment): Promise<Payment> {
    return this.paymentMethod.create(
      payment.getAmount(),
      payment.getPayerEmail(),
    );
  }

  public checkPaymentSource(
    dataID: string,
    xSignature: string | string[],
    xRequestId: string | string[],
  ): boolean {
    return this.paymentMethod.checkPaymentSource(
      dataID,
      xSignature,
      xRequestId,
    );
  }

  public async isPaymentApproved(paymentId: number): Promise<boolean> {
    return this.paymentMethod.isPaymentApproved(paymentId);
  }

  public checkPaymentAction(action: string): boolean {
    return this.paymentMethod.checkPaymentAction(action);
  }
}
