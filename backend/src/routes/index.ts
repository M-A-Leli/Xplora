import express from 'express';
import AdminRoutes from './AdminRoutes';
import AuthRoutes from './AuthRoutes';
import BookingRoutes from './BookingRoutes';
import CategoryRoutes from './CategoryRoutes';
import ClientRoutes from './ClientRoutes';
import PasswordResetRoutes from './PasswordResetRoutes';
import PaymentRoutes from './PaymentRoutes';
import ReviewRoutes from './ReviewRoutes';
import TourRoutes from './TourRoutes';
import UserRoutes from './UserRoutes';

const router = express.Router();

// Mount routes
router.use('/admins', AdminRoutes);
router.use('/auth', AuthRoutes);
router.use('/bookings', BookingRoutes);
router.use('/categories', CategoryRoutes);
router.use('/clients', ClientRoutes);
router.use('/password-reset', PasswordResetRoutes);
router.use('/payments', PaymentRoutes);
router.use('/reviews', ReviewRoutes);
router.use('/tours', TourRoutes);
router.use('/users', UserRoutes);

export default router;
