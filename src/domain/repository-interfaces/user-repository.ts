import { IUser } from "../user";
export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser | null>;
  getUserById(id:number):Promise<IUser |null>;
  updateUser(user: IUser): Promise<IUser | null>;
  updateVerification(userId:number, accountVerified:boolean, accountVerifiedAt:Date):Promise<IUser | null>;
}
