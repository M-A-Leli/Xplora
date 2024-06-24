import { Tour } from '@prisma/client';
import createError from 'http-errors';
import prisma from '../config/Prisma.Config';

class TourService {
  async getAllTours(): Promise<Partial<Tour>[]> {
    const tours = await prisma.tour.findMany({
      where: { deleted_at: null },
      select: {
        tour_id: true,
        title: true,
        description: true,
        destination: true,
        price: true,
        category_id: true,
        start_date: true,
        end_date: true,
        TourImages: {
          where: { deleted_at: null },
          select: {
            image_path: true
          }
        },
      }
    });

    if (tours.length === 0) {
      throw createError(404, 'No tours found');
    }

    return tours;
  }

  async getTourById(tour_id: string): Promise<Partial<Tour> | null> {
    const tour = await prisma.tour.findUnique({
      where: { tour_id, deleted_at: null },
      select: {
        tour_id: true,
        title: true,
        description: true,
        destination: true,
        price: true,
        category_id: true,
        start_date: true,
        end_date: true,
        TourImages: {
          where: { deleted_at: null },
          select: {
            image_path: true
          }
        },
      }
    });

    if (!tour) {
      throw createError(404, 'Tour not found');
    }

    return tour;
  }

  async createTour(data: any, imagePaths: string[]): Promise<any> {
    if (imagePaths.length > 4) {
      throw createError(400, 'A tour can have at most 4 images');
    }
  
    try {
      const tour = await prisma.tour.create({
        data: {
          ...data,
          TourImages: {
            create: imagePaths.map(path => ({
              image_path: path
            }))
          }
        },
        select: {
          tour_id: true,
          title: true,
          description: true,
          destination: true,
          price: true,
          category_id: true,
          start_date: true,
          end_date: true,
          TourImages: {
            where: { deleted_at: null },
            select: {
              image_path: true
            }
          }
        }
      });
  
      return tour;
    } catch (error) {
      console.error('Error creating tour:', error);
      throw createError(500, 'Failed to create tour');
    }
  }
  
  async updateTour(tour_id: string, data: Partial<Omit<Tour, 'tour_id'>>, imagePaths: string[]): Promise<Partial<Tour> | null> {
    if (imagePaths.length > 4) {
      throw createError(400, 'A tour can have at most 4 images');
    }

    const existingTour = await prisma.tour.findUnique({ where: { tour_id, deleted_at: null } });

    if (!existingTour) {
      throw createError(404, 'Tour not found');
    }

    const updatedTour = await prisma.tour.update({
      where: { tour_id },
      data: {
        ...data,
        TourImages: {
          deleteMany: { tour_id },
          create: imagePaths.map((path) => ({
            image_path: path
          })),
        },
      },
      select: {
        tour_id: true,
        title: true,
        description: true,
        destination: true,
        price: true,
        category_id: true,
        start_date: true,
        end_date: true,
        TourImages: {
          where: { deleted_at: null },
          select: {
            image_path: true
          }
        },
      }
    });

    return updatedTour;
  }

  async deleteTour(tour_id: string): Promise<void> {
    const tour = await prisma.tour.findUnique({
      where: { tour_id },
      include: {
        Bookings: true,
      }
    });

    if (!tour) {
      throw createError(404, 'Tour not found');
    }

    const activeBookings = tour.Bookings.filter(booking => booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED');
    if (activeBookings.length > 0) {
      throw createError(400, 'Cannot delete a tour with active bookings');
    }

    await prisma.tour.update({
      where: { tour_id },
      data: { deleted_at: new Date() }
    });
  }

  async getTourByCategoryId(category_id: string): Promise<Partial<Tour>[]> {
    const category = await prisma.category.findUnique({
      where: { category_id, deleted_at: null },
    });

    if (!category) {
      throw createError(404, 'Category not found');
    }

    const tours = await prisma.tour.findMany({
      where: { category_id, deleted_at: null },
      select: {
        tour_id: true,
        title: true,
        description: true,
        destination: true,
        price: true,
        category_id: true,
        start_date: true,
        end_date: true,
        TourImages: {
          where: { deleted_at: null },
          select: {
            image_path: true
          }
        },
      }
    });

    if (tours.length === 0) {
      throw createError(404, 'No tours found for this category');
    }

    return tours;
  }

  async searchTours(query: string): Promise<Tour[]> {
    const lowerQuery = `%${query.toLowerCase()}%`;

    const tours = await prisma.$queryRaw<Tour[]>`
      SELECT * FROM Tour 
      WHERE LOWER(title) LIKE ${lowerQuery}
      AND deleted_at IS NULL
    `;

    if (tours.length === 0) {
      throw createError(404, 'No tours found matching the query');
    }

    return tours;
  }
}

export default TourService;
