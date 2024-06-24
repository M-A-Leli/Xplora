import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { Client, Prisma } from '@prisma/client';
import prisma from '../config/Prisma.Config';

class ClientService {
  async hashPassword(password: string): Promise<{ hash: string, salt: string }> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  }

  async getAllClients(): Promise<Partial<Client>[]> {
    const clients = await prisma.client.findMany({
      where: {
        deleted_at: null
      },
      select: {
        client_id: true,
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
  
    if (clients.length === 0) {
      throw createError(404, 'No clients found');
    }
  
    return clients;
  }

  async getClientById(client_id: string): Promise<Partial<Client> | null> {
    const client = await prisma.client.findUnique({
      where: { client_id, deleted_at: null },
      select: {
        client_id: true,
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

    if (!client) {
      throw createError(404, 'Client not found');
    }

    return client;
  }

  async createClient(data: any) {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      ...clientData
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

    const client = await prisma.client.create({
      data: {
        ...clientData,
        user_id: user.user_id,
      },
      select: {
        client_id: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
            first_name: true,
            last_name: true,
            phone_number: true
          },
        },
      }
    });

    return client;
  }

  async updateClient(client_id: string, data: any) {
    const {
      username,
      email,
      first_name,
      last_name,
      phone_number,
      ...clientData
    } = data;

    const client = await prisma.client.findUnique({ where: { client_id, deleted_at: null } });

    if (!client) {
      throw createError(404, 'Client not found');
    }

    const user = await prisma.user.findUnique({
      where: { user_id: client.user_id },
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
      where: { user_id: client.user_id, deleted_at: null },
      data: {
        username,
        email,
        first_name,
        last_name,
        phone_number
      }
    });

    const updatedClient = await prisma.client.update({
      where: { client_id, deleted_at: null },
      data: clientData,
      select: {
        client_id: true,
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

    return updatedClient;
  }

  async deleteClient(client_id: string) {
    const client = await prisma.client.findUnique({ where: { client_id, deleted_at: null } });

    if (!client) {
      throw createError(404, 'Client not found');
    }

    const user = await prisma.user.findUnique({ where: { user_id: client.user_id, deleted_at: null } });

    if (!user) {
      throw createError(404, 'User not found');
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { user_id: user.user_id },
        data: { deleted_at: new Date() }
      });

      await tx.client.update({
        where: { client_id },
        data: { deleted_at: new Date() }
      });
    }).catch((error) => {
      throw createError(500, `Error deleting client: ${error.message}`);
    });
  }
}

export default ClientService;
