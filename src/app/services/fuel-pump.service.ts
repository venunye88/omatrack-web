import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { FuelPump } from 'app/models/fuel-pump';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuelPumpService extends BaseService<FuelPump> {

  constructor(public http: HttpClient) { super(http, "fuelpumps") }

  getByStation(id: number) {
    return this.http.get<FuelPump[]>(`${environment.baseApi}/${this.model}/station?id=${id}`);
  }
}
