import { IUserRepository } from "@/domain/repositories/user-repository";
import { IUser } from "@/domain/entities/user";

export class GetProfileUseCase{
    constructor(private userRepository:IUserRepository){}
    async execute(userId:number):Promise<IUser | null>{
        const user = await this.userRepository.getUserById(userId);
        return user;
    }
}