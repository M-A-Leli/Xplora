import { Request, Response, NextFunction } from 'express';
import BookingService from '../services/BookingService';


class BookingController {

  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.bookingService.getAllBookings();
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  }

  getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = await this.bookingService.getBookingById(req.params.id);
      res.json(booking);
    } catch (error) {
      next(error);
    }
  }

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBooking = await this.bookingService.createBooking(req.body);
      res.status(201).json(newBooking);
    } catch (error) {
      next(error);
    }
  }

  updateBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedBooking = await this.bookingService.updateBooking(req.params.id, req.body);
      res.json(updatedBooking);
    } catch (error) {
      next(error);
    }
  }

  deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.bookingService.deleteBooking(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  getBookingsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.bookingService.getBookingsByUserId(req.params.id);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  }

  getBookingsByTourId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.bookingService.getBookingsByTourId(req.params.id);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  }

  getBookingsByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.bookingService.getBookingsByStatus(req.params.status);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  }

  searchBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.bookingService.searchBookings(req.query.q as string);
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  }
}

export default new BookingController();
