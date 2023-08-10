import { IUserRepository } from "../../../domain/repository-interfaces/user-repository";
import { IUser, User } from "../../../domain/user";
import { RequestValidationError } from "../../../lib/errors/request-validation-error";
import { IAuthService } from "../../abstractions/auth-service";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) { }

  async execute(data: IUser): Promise<IUser> {
    const password = await this.authService.encryptPassword(data.password)
    const user = new User(
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      password
    )

    if (user.checkValidationErrors().length > 0) {
      const error = new RequestValidationError()
      error.messages = user.checkValidationErrors();
      throw error;
    }

    // Check if the user with the given email already exists
    const existingUser = await this.userRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    // Create the new user
    const createdUser = await this.userRepository.createUser(user);
    console.log(createdUser)
    return createdUser;
  }
}


