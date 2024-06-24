import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { Admin, Prisma } from '@prisma/client';
import prisma from '../config/Prisma.Config';

class AdminService {
  async hashPassword(password: string): Promise<{ hash: string, salt: string }> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  }

  async getAllAdmins(): Promise<Partial<Admin>[]> {
    const admins = await prisma.admin.findMany({
      where: {
        deleted_at: null
      },
      select: {
        admin_id: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
            first_name: true,
            last_name: true,
            phone_number: true,
          },
        },
      }
    });

    if (admins.length === 0) {
      throw createError(404, 'No admins found');
    }

    return admins;
  }

  async getAdminById(admin_id: string): Promise<Partial<Admin> | null> {
    const admin = await prisma.admin.findUnique({
      where: { admin_id, deleted_at: null },
      select: {
        admin_id: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
            first_name: true,
            last_name: true,
            phone_number: true
          }
        }
      }
    });

    if (!admin) {
      throw createError(404, 'Admin not found');
    }

    return admin;
  }

  async createAdmin(data: any) {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      ...adminData
    } = data;

    const emailExists = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (emailExists) {
      throw createError(409, 'Email already exists');
    }

    const usernameExits = await prisma.user.findUnique({
      where: { username: data.username }
    });

    if (usernameExits) {
      throw createError(409, 'Username already exists');
    }

    const phoneNumberExists = await prisma.user.findUnique({
      where: { phone_number: data.phone_number }
    });

    if (phoneNumberExists) {
      throw createError(409, 'Phone number already exists');
    }

    const { hash, salt } = await this.hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        salt: salt,
        first_name,
        last_name,
        phone_number,
      },
      select: {
        user_id: true
      }
    });

    const admin = await prisma.admin.create({
      data: {
        ...adminData,
        user_id: user.user_id,
      },
      select: {
        admin_id: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
            first_name: true,
            last_name: true,
            phone_number: true
          }
        }
      }
    });

    return admin;
  }

  async updateAdmin(admin_id: string, data: any) {
    const {
      username,
      email,
      first_name,
      last_name,
      phone_number,
      ...adminData
    } = data;

    const admin = await prisma.admin.findUnique({ where: { admin_id, deleted_at: null } });

    if (!admin) {
      throw createError(404, 'Admin not found');
    }

    const user = await prisma.user.findUnique({
      where: { user_id: admin.user_id },
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    if (data.email) {
      const existingUserWithEmail = await prisma.user.findFirst({
        where: {
          email: data.email,
          user_id: { not: user.user_id },
        },
      });

      if (existingUserWithEmail) {
        throw createError(409, 'Email already exists');
      }
    }

    if (data.username) {
      const existingUserWithUsername = await prisma.user.findFirst({
        where: {
          username: data.username,
          user_id: { not: user.user_id },
        },
      });

      if (existingUserWithUsername) {
        throw createError(409, 'Username already exists');
      }
    }

    if (data.phone_number) {
      const existingUserWithPhoneNumber = await prisma.user.findFirst({
        where: {
          phone_number: data.phone_number,
          user_id: { not: user.user_id },
        },
      });

      if (existingUserWithPhoneNumber) {
        throw createError(409, 'Phone number already exists');
      }
    }

    await prisma.user.update({
      where: { user_id: admin.user_id, deleted_at: null },
      data: {
        username,
        email,
        first_name,
        last_name,
        phone_number
      }
    });

    const updatedAdmin = await prisma.admin.update({
      where: { admin_id, deleted_at: null },
      data: adminData,
      select: {
        admin_id: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
            first_name: true,
            last_name: true,
            phone_number: true
          }
        }
      }
    });

    return updatedAdmin;
  }

  async deleteAdmin(admin_id: string) {
    const admin = await prisma.admin.findUnique({ where: { admin_id, deleted_at: null } });

    if (!admin) {
      throw createError(404, 'Admin not found');
    }

    const user = await prisma.user.findUnique({ where: { user_id: admin.user_id, deleted_at: null } });

    if (!user) {
      throw createError(404, 'User not found');
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { user_id: user.user_id },
        data: { deleted_at: new Date() }
      });

      await tx.admin.update({
        where: { admin_id },
        data: { deleted_at: new Date() }
      });
    }).catch((error) => {
      throw createError(500, `Error deleting admin: ${error.message}`);
    });
  }
}

export default AdminService;
