import { LookUp } from 'app/shared/shared.model';

export interface Station extends LookUp {
    address: string
    phoneNumber: string
    location: string
    longitude?: number
    latitude?: number
}
