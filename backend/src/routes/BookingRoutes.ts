import { Router } from 'express';
import BookingController from '../controllers/BookingController';

const router = Router();

router.get('/', BookingController.getAllBookings); // Get all bookings
router.get('/:id', BookingController.getBookingById); // Get booking by id
router.post('/', BookingController.createBooking); // Create booking
router.put('/:id', BookingController.updateBooking); // Update booking
router.delete('/:id', BookingController.deleteBooking); // Delete booking

router.get('/user/:id', BookingController.getBookingsByUserId); // Get user's bookings
router.get('/tour/:id', BookingController.getBookingsByTourId); // Get tour's bookings
router.get('/status/:status', BookingController.getBookingsByStatus); // Get bookings by status
router.get('/search', BookingController.searchBookings); // Search bookings

export default router;
