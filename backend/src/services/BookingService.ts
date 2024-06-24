import { Booking } from '@prisma/client';
import createError from 'http-errors';
import prisma from '../config/Prisma.Config';

class BookingService {
  async getAllBookings(): Promise<Partial<Booking>[]> {
    const bookings = await prisma.booking.findMany({
      where: { deleted_at: null },
      select: {
        booking_id: true,
        user_id: true,
        tour_id: true,
        booking_date: true,
        status: true,
      }
    });

    if (bookings.length === 0) {
      throw createError(404, 'No bookings found');
    }

    return bookings;
  }

  async getBookingById(booking_id: string): Promise<Partial<Booking> | null> {
    const booking = await prisma.booking.findUnique({
      where: { booking_id, deleted_at: null },
      select: {
        booking_id: true,
        user_id: true,
        tour_id: true,
        booking_date: true,
        status: true,
      }
    });

    if (!booking) {
      throw createError(404, 'Booking not found');
    }

    return booking;
  }

  async createBooking(data: Omit<Booking, 'booking_id'>): Promise<Partial<Booking>> {
    const user = await prisma.user.findFirst({
      where: {
        user_id: data.user_id
      }
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    const tour = await prisma.tour.findFirst({
      where: {
        tour_id: data.tour_id
      }
    });

    if (!tour) {
      throw createError(404, 'Tour not found');
    }

    const bookingExists = await prisma.booking.findFirst({
      where: {
        user_id: data.user_id,
        tour_id: data.tour_id
      }
    });

    if (bookingExists) {
      throw createError(409, 'Booking already exists');
    }

    const newBooking = await prisma.booking.create({
      data,
      select: {
        booking_id: true,
        user_id: true,
        tour_id: true,
        booking_date: true,
        status: true
      }
    });

    return newBooking;
  }

  async updateBooking(booking_id: string, data: Partial<Booking>): Promise<Partial<Booking> | null> {
    const booking = await prisma.booking.findFirst({ where: { booking_id } });

    if (!booking) {
      throw createError(404, 'Booking not found');
    }

    const updatedBooking = await prisma.booking.update({
      where: { booking_id, deleted_at: null },
      data,
      select: {
        booking_id: true,
        user_id: true,
        tour_id: true,
        booking_date: true,
        status: true,
      }
    });

    if (!updatedBooking) {
      throw createError(404, 'Booking not found');
    }

    return updatedBooking;
  }

  async deleteBooking(booking_id: string): Promise<void> {
    const booking = await prisma.booking.findUnique({ where: { booking_id, deleted_at: null } });

    if (!booking) {
      throw createError(404, 'Booking not found');
    }

    await prisma.booking.update({
      where: { booking_id },
      data: { deleted_at: new Date() }
    });
  }

  async getBookingsByUserId(user_id: string): Promise<Partial<Booking>[]> {
    const user = await prisma.user.findUnique({ where: { user_id, deleted_at: null } });

    if (!user) {
      throw createError(404, 'User not found');
    }

    const bookings = await prisma.booking.findMany({
      where: { user_id, deleted_at: null },
      select: {
        booking_id: true,
        user_id: true,
        tour_id: true,
        booking_date: true,
        status: true,
      }
    });

    if (bookings.length === 0) {
      throw createError(404, 'No bookings found for this user');
    }

    return bookings;
  }

  async getBookingsByTourId(tour_id: string): Promise<Partial<Booking>[]> {
    const tour = await prisma.tour.findUnique({ where: { tour_id, deleted_at: null } });

    if (!tour) {
      throw createError(404, 'Tour not found');
    }

    const bookings = await prisma.booking.findMany({
      where: { tour_id, deleted_at: null },
      select: {
        booking_id: true,
        user_id: true,
        tour_id: true,
        booking_date: true,
        status: true,
      }
    });

    if (bookings.length === 0) {
      throw createError(404, 'No bookings found for this tour');
    }

    return bookings;
  }

  async getBookingsByStatus(status: string): Promise<Partial<Booking>[]> {
    const bookings = await prisma.booking.findMany({
      where: {
        status: status.toUpperCase(), // Ensure status comparison is case-insensitive
        deleted_at: null
      },
      select: {
        booking_id: true,
        user_id: true,
        tour_id: true,
        booking_date: true,
        status: true,
      }
    });

    if (bookings.length === 0) {
      throw createError(404, `No bookings found with status '${status}'`);
    }

    return bookings;
  }

  async searchBookings(query: string): Promise<Booking[]> {
    const lowerQuery = `%${query.toLowerCase()}%`;

    const bookings = await prisma.$queryRaw<Booking[]>`
      SELECT * FROM Booking 
      WHERE (LOWER(user_id) LIKE ${lowerQuery} 
      OR LOWER(tour_id) LIKE ${lowerQuery})
      AND deleted_at IS NULL
    `;

    if (bookings.length === 0) {
      throw createError(404, 'No bookings found matching the query');
    }

    return bookings;
  }
}

export default BookingService;
