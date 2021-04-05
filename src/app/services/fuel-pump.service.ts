import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Nozzle } from 'app/models/fuel-pump';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuelPumpService extends BaseService<Nozzle> {

  constructor(public http: HttpClient) { super(http, "nozzles") }

  getByStation(id: number) {
    return this.http.get<Nozzle[]>(`${environment.baseApi}/${this.model}/outlet?id=${id}`);
  }
}
