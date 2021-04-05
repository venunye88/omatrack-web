import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class NozzleService extends BaseService<Nozzle> {

  constructor(public http: HttpClient) { super(http, "nozzles") }

  getByOutlet(id: number) {
    return this.http.get<Nozzle[]>(`${environment.baseApi}/${this.model}/outlet?id=${id}`);
  }
}

export interface Nozzle {
  id: number
  name: string
  outletId: number
  // outletName: string
  productId: number
  productName: string
  initialReading: string
  // address: string
}
