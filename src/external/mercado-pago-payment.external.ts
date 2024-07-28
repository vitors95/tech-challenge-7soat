import { IPayment } from 'src/interfaces/payment.interface';
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';
import { Payment } from 'src/entities/payment.entity';
import { PaymentError } from 'src/errors/payment.error';
import { createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from 'src/enum/order-status.enum';


export class MercadoPago implements IPayment {
  async create(amount: number, payerEmail: string, expirationDate:Date): Promise<Payment> {
    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
      });
      const payment = new MercadoPagoPayment(client);

      const requestOptions = { idempotencyKey: uuidv4() };
      const body = {
        date_of_expiration: expirationDate.toISOString(),
        transaction_amount: amount,
        description: '',
        payment_method_id: 'pix',
        payer: {
          email: payerEmail ?? 'no_customer@stub.com',
        },
      };

      const paymentResponse = await payment.create({ body, requestOptions });

      const paymentId = paymentResponse?.id;

      const pixQrCode =
        paymentResponse?.point_of_interaction?.transaction_data?.qr_code;

      const pixQrCodeBase64 =
        paymentResponse?.point_of_interaction?.transaction_data?.qr_code_base64;

      if (!paymentId || !pixQrCode || !pixQrCodeBase64)
        throw new PaymentError('Failed to create payment');

      return new Payment(
        paymentId,
        amount,
        pixQrCode,
        pixQrCodeBase64,
        expirationDate,
        payerEmail,
      );
    } catch (error: any) {
      throw new PaymentError('Failed to create payment');
    }
  }

  checkPaymentSource(
    dataID: string,
    xSignature: string,
    xRequestId: string,
  ): boolean {
    try {
      const secret: string = process.env.MERCADO_PAGO_SECRET || '';

      if (!xSignature || !xRequestId) {
        return false;
      }

      const parts = xSignature.split(',');

      let ts: string | undefined;
      let hash: string | undefined;

      parts.forEach((part) => {
        const [key, value] = part.split('=').map((str) => str.trim());
        if (key === 'ts') {
          ts = value;
        } else if (key === 'v1') {
          hash = value;
        }
      });

      if (!ts || !hash) {
        return false;
      }

      const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
      const hmac = createHmac('sha256', secret);
      hmac.update(manifest);
      const sha = hmac.digest('hex');

      if (sha === hash) return true;
      else return false;
    } catch (error) {
      throw new PaymentError('Failed to check payment source');
    }
  }
  checkPaymentAction(action: string): boolean{
    return action==="payment.updated"?true:false
  }
  async getPaymenteStatus(paymentId: number): Promise<OrderStatus>{
    try{

      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
      });
      const payment = new MercadoPagoPayment(client);

      const paymentResponse = await payment.get({
        id:paymentId
      })
      if (paymentResponse.status === "approved")
        return OrderStatus.IN_PROGRESS
      return OrderStatus.PAYMENT_FAILED

    }catch(error){
      throw new PaymentError('Failed to check payment Status');
    }
  }
}
