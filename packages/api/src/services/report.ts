import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'
import { ReportCreate } from '@recipes/api-types/v1'
import { Report } from '@/entities'
import { TYPES } from '@/utils/constants'
import { ReportResult } from '@/types'

@injectable()
export default class ReportService {
    @inject(TYPES.ReportRepository)
    private readonly reportRepository!: Repository<Report>

    public async reportRecipe(report: ReportCreate): Promise<ReportResult> {
        return await this.reportRepository.save(report)
    }

    public async getReportsByUser(userId: number): Promise<ReportResult[]> {
        return await this.reportRepository.find({
            where: { userId },
        })
    }

    public async getReportsByRecipe(recipeId: number): Promise<ReportResult[]> {
        return await this.reportRepository.find({
            where: { recipeId },
        })
    }
}
