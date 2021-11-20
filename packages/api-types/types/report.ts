export class Report {
    public readonly id!: number
    public recipeId!: number
    public userId!: number
    public category!: ReportType
    public description!: string
}

export type ReportCreate = Omit<Report, 'id'>

export enum ReportType {
    INCOMPLETE = 'incomplete',
    INVALID = 'invalid',
    TROLLING = 'trolling',
    SPAM = 'spam',
}
