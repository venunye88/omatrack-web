import { LookUp } from 'app/shared/shared.model';
import { FuelStock } from './fuel-stock.model';

export interface Station extends LookUp {
    address: string
    phoneNumber: string
    location: string
    longitude?: number
    latitude?: number
    regionId: number
    priceGroupId: number
    fuelStocks: Array<FuelStock>
}
