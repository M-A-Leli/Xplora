import { Review } from '@prisma/client';
import createError from 'http-errors';
import prisma from '../config/Prisma.Config';

class ReviewService {
  async getAllReviews(): Promise<Partial<Review>[]> {
    const reviews = await prisma.review.findMany({
      select: {
        review_id: true,
        tour_id: true,
        rating: true,
        comment: true,
        created_at: true,
        User: {
          select: {
            user_id: true,
            username: true,
          }
        }
      }
    });

    if (reviews.length === 0) {
      throw createError(404, 'No reviews found');
    }

    return reviews;
  }

  async getReviewById(review_id: string): Promise<Partial<Review> | null> {
    const review = await prisma.review.findUnique({
      where: { review_id },
      select: {
        review_id: true,
        tour_id: true,
        rating: true,
        comment: true,
        created_at: true,
        User: {
          select: {
            user_id: true,
            username: true,
          }
        }
      }
    });

    if (!review) {
      throw createError(404, 'Review not found');
    }

    return review;
  }

  async createReview(data: Omit<Review, 'review_id'>): Promise<Partial<Review>> {
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

    if (tour.start_date > new Date()) {
      throw createError(403, 'Cannot leave a review before the tour starts');
    }

    const reviewExists = await prisma.review.findFirst({
      where: {
        user_id: data.user_id,
        tour_id: data.tour_id
      }
    });

    if (reviewExists) {
      throw createError(409, 'Review already exists');
    }

    const newReview = await prisma.review.create({
      data,
      select: {
        review_id: true,
        tour_id: true,
        rating: true,
        comment: true,
        created_at: true,
        User: {
          select: {
            user_id: true,
            username: true,
          }
        }
      }
    });

    return newReview;
  }

  async deleteReview(review_id: string): Promise<void> {
    const review = await prisma.review.findUnique({ where: { review_id } });

    if (!review) {
      throw createError(404, 'Review not found');
    }

    await prisma.review.update({
      where: { review_id },
      data: { deleted_at: new Date() }
    });
  }

  async getReviewsByUserId(user_id: string): Promise<Partial<Review>[]> {
    const user = await prisma.user.findUnique({ where: { user_id } });

    if (!user) {
      throw createError(404, 'User not found');
    }

    const reviews = await prisma.review.findMany({
      where: { user_id },
      select: {
        review_id: true,
        tour_id: true,
        rating: true,
        comment: true,
        created_at: true,
        User: {
          select: {
            user_id: true,
            username: true,
          }
        }
      }
    });

    if (reviews.length === 0) {
      throw createError(404, 'No reviews found');
    }

    return reviews;
  }

  async getReviewsByTourId(tour_id: string): Promise<Partial<Review>[]> {
    const tour = await prisma.tour.findUnique({ where: { tour_id } });

    if (!tour) {
      throw createError(404, 'Tour not found');
    }

    const reviews = await prisma.review.findMany({
      where: { tour_id },
      select: {
        review_id: true,
        tour_id: true,
        rating: true,
        comment: true,
        created_at: true,
        User: {
          select: {
            user_id: true,
            username: true,
          }
        }
      }
    });

    if (reviews.length === 0) {
      throw createError(404, 'No reviews found');
    }

    return reviews;
  }

  async searchReviews(query: string): Promise<Partial<Review>[]> {
    const lowerQuery = `%${query.toLowerCase()}%`;

    return prisma.$queryRaw<Review[]>`
      SELECT r.review_id, r.tour_id, r.rating, r.comment, r.created_at, u.user_id, u.username 
      FROM Review r
      JOIN User u ON r.user_id = u.user_id
      WHERE LOWER(r.comment) LIKE ${lowerQuery}
    `;
  }
}

export default ReviewService;
