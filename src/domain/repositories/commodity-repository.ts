import { ICommodity } from "../entities/commodity"

export interface ICommodityRepository{
    getCommodities():Promise<ICommodity[]>
    createCommodity(commodity:ICommodity):Promise<ICommodity>
}