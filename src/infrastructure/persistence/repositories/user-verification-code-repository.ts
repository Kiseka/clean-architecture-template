import { PrismaClient } from "@prisma/client";
import { IUserVerificationCodeRepository } from "../../../domain/repository-interfaces/user-verification-code-repository";
import { IUserVerificationCode } from "../../../domain/user-verification-token";
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