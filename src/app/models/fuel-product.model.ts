import { HasId } from 'app/shared/shared.model'

export interface FuelProduct extends HasId {
    name: string
    description: string
}