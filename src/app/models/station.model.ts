import { LookUp } from 'app/shared/shared.model';

export interface Station extends LookUp {
    address: string
    phone: string
    longitude?: number
    latitude?: number
}
