import {  HasId } from 'app/shared/shared.model';

export interface AccountGroup extends HasId {
    name: string
    description: string
}
