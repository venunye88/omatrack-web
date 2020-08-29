import { Injectable } from '@angular/core';
import { FuelStock, StationStock } from 'app/models/fuel-stock.model';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuelStockService extends BaseService<FuelStock> {

  constructor(http: HttpClient) { super(http, 'fuelstocks') }


  fetchStationStocks() {
    return this.http.get<StationStock[]>(`${environment.baseApi}/fuelstocks/stationstocks`)
  }

}
