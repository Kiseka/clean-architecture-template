import { PrismaClient } from "@prisma/client";
import { ICommodity } from "@/domain/entities/commodity";
import { ICommodityRepository } from "@/domain/repositories/commodity-repository";
const prisma = new PrismaClient();

export class CommodityRepository implements ICommodityRepository {

    async getCommodities(): Promise<ICommodity[]> {
        const commodities = await prisma.commodity.findMany();
        return commodities as ICommodity[];
    }

    async createCommodity(commodity: ICommodity): Promise<ICommodity> {
        const prismaCommodity = await prisma.commodity.create({
            data: {
                name: commodity.name,
                image: commodity.image,
            },
        });
        return prismaCommodity as ICommodity;
    }
}