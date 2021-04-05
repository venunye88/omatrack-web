import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditorService extends BaseService<Creditor>{

  constructor(public http: HttpClient) { super(http, "creditors") }

  getByOutlet(id: number) {
    return this.http.get<Creditor[]>(`${environment.baseApi}/${this.model}/outlet?id=${id}`);
  }

}


export interface Creditor {
  id: number
  name: string
  phoneNumber: string
  address: string
  outletId: number
  outletName: string
  initialBalance: number
}