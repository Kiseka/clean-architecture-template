import { ICommodityRepository } from "../../../domain/repositories/commodity-repository";
export class GetCommoditiesUseCase {
    constructor(private commodityRepository: ICommodityRepository) { }
    async execute(): Promise<any> {
        const commodities = await this.commodityRepository.getCommodities();
        return commodities;
    }
}