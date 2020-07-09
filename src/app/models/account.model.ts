import {  HasId } from 'app/shared/shared.model';


export interface Account extends HasId {
    name: string
    stationId: number
    accountGroupId: number
    description: string
}