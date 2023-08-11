import { ICommodity } from "@/domain/entities/commodity";
import { ICommodityRepository } from "@/domain/repositories/commodity-repository";
import { validateFields } from "@/application/validation/validation-helpers";

export class CreateCommodityUseCase {
    constructor(private commodityRepository: ICommodityRepository) { }
    async execute(data: ICommodity): Promise<any> {
        validateFields({
            name: { value: data.name, required: true },
            image: { value: data.image, required: true },
        })
        const commodity = await this.commodityRepository.createCommodity(data);
        return commodity;
    }
}