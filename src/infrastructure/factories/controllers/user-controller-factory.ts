import { GetProfileUseCase } from "../../../application/use-cases/users/get-profile";
import UserController from "../../../presentation/controllers/user-controller";
import { UserRepository } from "../../persistence/repositories/user-repository";

const userControllerFactory = () => {
    const userRepository = new UserRepository()
    const getProfileUseCase = new GetProfileUseCase(userRepository);
    const userController = new UserController(getProfileUseCase)
    return userController;
}

export default userControllerFactory;