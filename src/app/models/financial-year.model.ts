import { HasId } from 'app/shared/shared.model';

export interface FinancialYear extends HasId {
    year: number
    startDate: Date
    endDate: Date
    isClosed: boolean
}