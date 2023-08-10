import { IUserRepository } from "../../../domain/repository-interfaces/user-repository";
import { IUser } from "../../../domain/user";

export class GetProfileUseCase{
    constructor(private userRepository:IUserRepository){}
    async execute(userId:number):Promise<IUser | null>{
        const user = await this.userRepository.getUserById(userId);
        return user;
    }
}