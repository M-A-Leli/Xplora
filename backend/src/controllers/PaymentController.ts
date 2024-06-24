import { Request, Response, NextFunction } from 'express';
import PaymentService from '../services/PaymentService';

class PaymentController {

  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await this.paymentService.getAllPayments();
      res.json(payments);
    } catch (error) {
      next(error);
    }
  }

  getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await this.paymentService.getPaymentById(req.params.id);
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }

  createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newPayment = await this.paymentService.createPayment(req.body);
      res.status(201).json(newPayment);
    } catch (error) {
      next(error);
    }
  }

  deletePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.paymentService.deletePayment(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  getPaymentsByBookingId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await this.paymentService.getPaymentsByBookingId(req.params.id);
      res.json(payments);
    } catch (error) {
      next(error);
    }
  }

  getPaymentsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await this.paymentService.getPaymentsByUserId(req.params.id);
      res.json(payments);
    } catch (error) {
      next(error);
    }
  }

  // !
  updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedPayment = await this.paymentService.updatePayment(req.params.id, req.body);
      res.json(updatedPayment);
    } catch (error) {
      next(error);
    }
  };
}

export default new PaymentController();
