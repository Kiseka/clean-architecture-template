import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '@/domain/repositories/user-repository';
import { IUser } from '@/domain/entities/user';
const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {

    async updateVerification(userId: number, accountVerified: boolean, accountVerifiedAt: Date): Promise<IUser> {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                accountVerified: accountVerified,
                accountVerifiedAt: accountVerifiedAt
            }
        }) as IUser
    }

    async createUser(user: IUser): Promise<IUser> {
        const prismaUser = await prisma.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                password: user.password,
            },
        });
        return prismaUser as IUser;
    }

    
    async getUserById(userId: number): Promise<IUser | null> {
        const prismaUser = await prisma.user.findUnique({
            where: { id:userId },
        });
        return prismaUser as IUser | null;
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        const prismaUser = await prisma.user.findUnique({
            where: { email },
        });

        return prismaUser as IUser | null;
    }

    async updateUser(user: IUser): Promise<IUser | null> {
        const prismaUser = await prisma.user.update({
            where: { email: user.email },
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                password: user.password,
            },
        });

        return prismaUser as IUser | null;
    }


}
