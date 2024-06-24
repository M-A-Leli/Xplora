import { Router } from 'express';
import PaymentController from '../controllers/PaymentController';

const router = Router();

router.get('/', PaymentController.getAllPayments); // Get all payments
router.get('/:id', PaymentController.getPaymentById); // Get payment by id
router.post('/', PaymentController.createPayment); // Create payment
// router.put('/:id', PaymentController.updatePayment); // Update payment
router.delete('/:id', PaymentController.deletePayment); // Delete payment

router.get('/booking/:id', PaymentController.getPaymentsByBookingId); // Get booking's payments
router.get('/user/:id', PaymentController.getPaymentsByUserId); // Get user's payments

export default router;
