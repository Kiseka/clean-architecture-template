import { ICommodityPrice } from "@/domain/entities/commodity-price";
import { ICommodityPriceRepository } from "@/domain/repositories/commodity-price-repository";
import { validateFields } from "@/application/validation/validation-helpers";

export class CreateCommodityPriceUseCase {
    constructor(private commodityPriceRepository: ICommodityPriceRepository) { }
    async execute(data: ICommodityPrice) {
        validateFields({
            commodityId: { value: data.commodityId, required: true },
            price: { value: data.price, required: true },
            currency: { value: data.currency, required: true },
            units: { value: data.units, required: true },
            referenceDate: { value: data.referenceDate, required: true }, 
        });
        const commodityPrice = await this.commodityPriceRepository.createCommodityPrice(data);
        return commodityPrice;
    }
}