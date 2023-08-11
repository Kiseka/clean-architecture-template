import { PrismaClient } from "@prisma/client";
import { ICommodityPrice } from "@/domain/entities/commodity-price";
import { ICommodityPriceRepository } from "@/domain/repositories/commodity-price-repository";
const prisma = new PrismaClient();

export class CommodityPricesRepository implements ICommodityPriceRepository {

    async getCommodityPrices(commodityId: number): Promise<ICommodityPrice[]> {
        return await prisma.commodityPrice.findMany(
            {
                where: { commodityId: commodityId }
            }
        );
    }
    async createCommodityPrice(commodityPrice: ICommodityPrice): Promise<ICommodityPrice> {
        const prismaCommodityPrice = prisma.commodityPrice.create({
            data: {
                commodityId: commodityPrice.commodityId,
                price: commodityPrice.price,
                currency: commodityPrice.currency,
                units: commodityPrice.units,
                referenceDate: commodityPrice.referenceDate,
            },
        });
        return prismaCommodityPrice
    }
}