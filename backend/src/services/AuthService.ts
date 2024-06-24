import prisma from '../config/Prisma.Config';
import bcrypt from 'bcrypt';
import createError from 'http-errors'

class AuthService {
    async authenticate(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email, deleted_at: null },
            include: {
                Client: true,
                Admin: true,
            },
        });

        if (!user) {
            throw createError(401, 'Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createError(401, 'Invalid email or password');
        }

        return user;
    }

    isAdmin(user: any): boolean {
        return user.Admin !== null;
    }

    isClient(user: any): boolean {
        return user.Client !== null;
    }
}

export default AuthService;
