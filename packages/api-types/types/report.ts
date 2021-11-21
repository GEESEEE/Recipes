export class Report {
    public readonly id!: number
    public recipeId!: number
    public userId!: number
    public category!: ReportType
    public description!: string
    public date!: Date
}

export type ReportCreate = Omit<Report, 'id' | 'date'>

export enum ReportType {
    INCOMPLETE = 'Incomplete',
    INVALID = 'Invalid',
    TROLLING = 'Trolling',
    SPAM = 'Spam',
    OTHER = 'Other',
}
