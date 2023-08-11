import { GetProfileUseCase } from "@/application/use-cases/users/get-profile";
import { UserRepository } from "@/infrastructure/persistence/repositories/user-repository";
import UserController from "@/presentation/controllers/user-controller";

const userControllerFactory = () => {
    const userRepository = new UserRepository()
    const getProfileUseCase = new GetProfileUseCase(userRepository);
    const userController = new UserController(getProfileUseCase)
    return userController;
}

export default userControllerFactory;