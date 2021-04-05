import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Outlet } from 'app/models/station.model';
import { environment } from 'environments/environment';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class StockService extends BaseService<Stock> {
  constructor(public http: HttpClient) { super(http, "stocks") }


  getByOutlet(id: number) {
    return this.http.get<Stock[]>(`${environment.baseApi}/${this.model}/outlet?id=${id}`);
  }

  bulkSave(record) {
    return this.http.post<number>(`${environment.baseApi}/${this.model}/bulksave`, record).toPromise()
  }

}

export interface Stock {
  id: number
  productId: number
  reorderLevel: number
  initialStock: number
  currentStock: number
  outletId: number
}