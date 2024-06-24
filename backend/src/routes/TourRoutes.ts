import { Router } from 'express';
import TourController from '../controllers/TourController';

const router = Router();

router.get('/', TourController.getAllTours); // Get all tours
router.get('/:id', TourController.getTourById); // Get tour by id
router.post('/', TourController.createTour); // Create tour
router.put('/:id', TourController.updateTour); // Update tour
router.delete('/:id', TourController.deleteTour); // Delete tour

router.get('/category/:id', TourController.getTourByCategoryId); // Get tour by category id
router.get('/search', TourController.searchTours); // Search tours

export default router;
