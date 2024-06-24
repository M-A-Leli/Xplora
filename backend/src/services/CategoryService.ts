import createError from 'http-errors';
import { Category } from '@prisma/client';
import prisma from '../config/Prisma.Config';

class CategoryService {
  async getAllCategories(): Promise<Partial<Category>[]> {
    const categories = await prisma.category.findMany({
      select: {
        category_id: true,
        category_name: true
      }
    });

    if (categories.length === 0) {
      throw createError(404, 'No categories found');
    }

    return categories;
  }

  async getCategoryById(categoryId: string): Promise<Partial<Category> | null> {
    const category = prisma.category.findUnique({
      where: { category_id: categoryId },
      select: {
        category_id: true,
        category_name: true
      }
    });

    if (!category) {
      throw createError(404, 'Category not found');
    }

    return category;
  }

  async createCategory(categoryName: string): Promise<Partial<Category>> {
    const newCategory = prisma.category.create({
      data: {
        category_name: categoryName,
      },
      select: {
        category_id: true,
        category_name: true
      }
    });

    return newCategory;
  }

  async updateCategory(category_id: string, data: Partial<Category>): Promise<Partial<Category> | null> {
    const category = await prisma.category.findUnique({ where: { category_id } });

    if (!category) {
      throw createError(404, 'Category not found');
    }

    const updatedCategory = await prisma.category.update({
      where: { category_id },
      data,
      select: {
        category_id: true,
        category_name: true
      }
    });

    return updatedCategory;
  }

  async deleteCategory(category_id: string): Promise<void> {
    const category = await prisma.category.findUnique({ 
      where: { category_id },
      include: {
        Tours: true,
      } 
    });

    if (!category) {
      throw createError(404, 'Category not found');
    }

    const activeCategories = category.Tours.filter(tour => tour.deleted_at === null);

    if(activeCategories.length > 0) {
      throw createError(400, 'Cannot delete a category wih active tours');
    }

    await prisma.category.update({
      where: { category_id },
      data: { deleted_at: new Date() }
    });
  }
}

export default CategoryService;
