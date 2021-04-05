import { LookUp, HasId } from 'app/shared/shared.model'

export interface PriceGroup extends LookUp {
    priceLists: PriceList[]
}

export interface PriceList extends HasId {
    productId: number
    productName: string
    unitPrice: number
    effectiveDate: Date
}

export interface PriceGroupLookUp {
    id: number
    name: string
}