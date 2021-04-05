import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class OutletService extends BaseService<Outlet> {
  constructor(public http: HttpClient) { super(http, "outlets") }

  lookup() {
    return this.http.get<Outlet[]>(`${environment.baseApi}/outlets/lookup`)
  }

}

export interface Outlet {
  id: number
  name: string
  address: string
  phoneNumber: string
  regionId: number
  regionName: string
  priceGroupId: number
}
