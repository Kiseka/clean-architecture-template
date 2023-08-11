import { IAuthService } from "@/application/abstractions/auth-service";
import { IUserRepository } from "@/domain/repositories/user-repository";
import { IUser } from "@/domain/entities/user";
import { validateFields } from "@/application/validation/validation-helpers";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) { }

  async execute(user: IUser): Promise<IUser> {

    validateFields({
      email: { value: user.email, required: true },
      password: { value: user.password, required: true },
      firstName: { value: user.firstName, required: true },
      lastName: { value: user.lastName, required: true },
    });

    const password = await this.authService.encryptPassword(user.password)
    user.password = password

    // Check if the user with the given email already exists
    const existingUser = await this.userRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    // Create the new user
    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }
}


