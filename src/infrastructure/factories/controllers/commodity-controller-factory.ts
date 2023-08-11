import { CreateCommodityUseCase } from "@/application/use-cases/commodities/create-commodity"
import { CreateCommodityPriceUseCase } from "@/application/use-cases/commodities/create-commodity-prices"
import { GetCommoditiesUseCase } from "@/application/use-cases/commodities/get-commodities"
import { CommodityPricesRepository } from "@/infrastructure/persistence/repositories/commodity-prices-repository"
import { CommodityRepository } from "@/infrastructure/persistence/repositories/commodity-repository"
import { CommoditiesController } from "@/presentation/controllers/commodities-controller"


const commodityControllerFactory = () => {
    const commodityRepository = new CommodityRepository()
    const commodityPriceRepository = new CommodityPricesRepository()
    const createCommodityUseCase = new CreateCommodityUseCase(commodityRepository)
    const getCommoditiesUseCase = new GetCommoditiesUseCase(commodityRepository)
    const createCommodityPriceUseCase = new CreateCommodityPriceUseCase(commodityPriceRepository)
    const commoditiesController = new CommoditiesController(createCommodityUseCase, getCommoditiesUseCase,createCommodityPriceUseCase);
    return commoditiesController;
}

export default commodityControllerFactory