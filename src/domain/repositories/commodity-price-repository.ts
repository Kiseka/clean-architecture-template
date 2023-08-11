import { ICommodityPrice } from "../entities/commodity-price"

export interface ICommodityPriceRepository {
    getCommodityPrices(commodityId: number): Promise<ICommodityPrice[]>
    createCommodityPrice(commodityPrice: ICommodityPrice): Promise<ICommodityPrice>
}