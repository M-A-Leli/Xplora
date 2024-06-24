import createError from 'http-errors';
import { Payment } from '@prisma/client';
import prisma from '../config/Prisma.Config';

class PaymentService {
  async getAllPayments(): Promise<Partial<Payment>[]> {
    const payments = await prisma.payment.findMany({
      select: {
        payment_id: true,
        booking_id: true,
        amount: true,
        payment_method: true,
        payment_status: true,
        transaction_date: true
      }
    });

    if (payments.length === 0) {
      throw createError(404, 'No payments found')
    }

    return payments;
  }

  async getPaymentById(payment_id: string): Promise<Partial<Payment> | null> {
    const payment = await prisma.payment.findUnique({
      where: { payment_id },
      select: {
        payment_id: true,
        booking_id: true,
        amount: true,
        payment_method: true,
        payment_status: true,
        transaction_date: true
      }
    });

    if (!payment) {
      throw createError(404, 'Payment not found');
    }

    return payment;
  }

  async createPayment(data: Omit<Payment, 'payment_id'>): Promise<Partial<Payment>> {
    const newPayment = await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data,
        select: {
          payment_id: true,
          booking_id: true,
          amount: true,
          payment_method: true,
          payment_status: true,
          transaction_date: true
        }
      });

      //! Add any additional logic related to payment creation here

      return payment;
    });

    return newPayment;
  }

  async deletePayment(payment_id: string): Promise<void> {
    const payment = await prisma.payment.findUnique({ where: { payment_id } });

    if (!payment) {
      throw createError(404, 'Payment not found');
    }

    await prisma.$transaction(async (tx) => {
      await tx.payment.delete({
        where: { payment_id }
      });

      // Add any additional logic related to payment deletion here
    });
  }

  async getPaymentsByBookingId(booking_id: string): Promise<Partial<Payment>[]> {
    const booking = await prisma.booking.findUnique({ where: { booking_id } });

    if (!booking) {
      throw createError(404, 'Booking not found');
    }

    const payments = await prisma.payment.findMany({
      where: { booking_id },
      select: {
        payment_id: true,
        booking_id: true,
        amount: true,
        payment_method: true,
        payment_status: true,
        transaction_date: true
      }
    });

    if (payments.length === 0) {
      throw createError(404, 'No payments found')
    }

    return payments;
  }

  async getPaymentsByUserId(user_id: string): Promise<Partial<Payment>[]> {
    const user = await prisma.user.findUnique({ where: { user_id } });

    if (!user) {
      throw createError(404, 'User not found');
    }

    const payments = await prisma.payment.findMany({
      where: { Booking: { user_id } },
      select: {
        payment_id: true,
        booking_id: true,
        amount: true,
        payment_method: true,
        payment_status: true,
        transaction_date: true
      }
    });

    if (payments.length === 0) {
      throw createError(404, 'No payments found')
    }

    return payments;
  }

  // !
  async updatePayment(payment_id: string, data: Partial<Payment>): Promise<Partial<Payment>> {
    const payment = await prisma.payment.findUnique({ where: { payment_id } });

    if (!payment) {
      throw createError(404, 'Payment not found');
    }

    const updatedPayment = await prisma.payment.update({
      where: { payment_id },
      data,
      select: {
        payment_id: true,
        booking_id: true,
        amount: true,
        payment_method: true,
        payment_status: true,
        transaction_date: true
      }
    });

    return updatedPayment;
  }
}

export default PaymentService;
