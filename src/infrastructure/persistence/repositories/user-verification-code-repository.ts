import { PrismaClient } from "@prisma/client";
import { IUserVerificationCodeRepository } from "@/domain/repositories/user-verification-code-repository";
import { IUserVerificationCode } from "@/domain/entities/user-verification-token";
const prisma = new PrismaClient();

export class UserVerificationCodeRepository implements IUserVerificationCodeRepository {
    async create(userVerificationCode: IUserVerificationCode): Promise<IUserVerificationCode> {
        return await prisma.userVerificationCode.upsert({
            where: { email: userVerificationCode.email },
            create: userVerificationCode,
            update: userVerificationCode
        })
    }
    async getVerificationCodeByEmailAndCode(email: string, code: string): Promise<IUserVerificationCode | null> {
        return await prisma.userVerificationCode.findFirst({
            where: { email: email, code: code }
        })
    }
}