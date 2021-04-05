import { AuditFields } from "../shared/shared.model";
import { Outlet } from 'app/models/station.model';

interface User {
    id: string
    username: string
    name: string
    email: string
    type: string
    station: string
    phoneNumber: string
    outlet: string
    picture: string
    token: string
    role: Role

}

export interface UserStation {
    id: number
    name: string
    type: string
}


interface Role extends AuditFields {
    name: string
    privileges: string[] | string
    notes: string
}


interface LoginParams {
    username: string;
    password: string;
    type: string;
}

export interface LoginResponse {
    username: string;
    token: string;
}


export { User, Role, LoginParams }