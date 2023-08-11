import { CreateCommodityUseCase } from "@/application/use-cases/commodities/create-commodity"
import { CreateCommodityPriceUseCase } from "@/application/use-cases/commodities/create-commodity-prices"
import { GetCommoditiesUseCase } from "@/application/use-cases/commodities/get-commodities"
import { HTTP_STATUS_CODE } from "@/lib/config/constants"
import { apiErrorResponse, apiSuccessResponse } from "@/lib/helpers/response-helpers"
import { RequestModel } from "@/lib/types/request"


export class CommoditiesController {
    constructor(
        private createCommodityUseCase: CreateCommodityUseCase,
        private getCommoditiesUseCase: GetCommoditiesUseCase,
        private createCommodityPriceUseCase: CreateCommodityPriceUseCase,
    ) { }

    public createCommodity = async (request: RequestModel) => {
        try {
            const { data } = request.body
            const commodity = await this.createCommodityUseCase.execute(data)
            return apiSuccessResponse({ data: commodity, message: "Commodity Created", status: HTTP_STATUS_CODE.CREATED })
        } catch (error: any) {
            return apiErrorResponse({ error: error, message: error.message })
        }
    }

    public getCommodities = async (request: RequestModel) => {
        try {
            const commodity = await this.getCommoditiesUseCase.execute()
            return apiSuccessResponse({ data: commodity, message: "Commodities", status: HTTP_STATUS_CODE.OK })
        } catch (error: any) {
            return apiErrorResponse({ error: error, message: error.message })
        }
    }

    public createCommodityPrice = async (request:RequestModel)=>{
        try {
            const { data } = request.body
            const commodity = await this.createCommodityPriceUseCase.execute(data)
            return apiSuccessResponse({ data: commodity, message: "Commodity Price Created", status: HTTP_STATUS_CODE.CREATED })
        } catch (error: any) {
            return apiErrorResponse({ error: error, message: error.message })
        }
    }

}