import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { PriceGroup, PriceGroupLookUp } from 'app/models/price-group.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceGroupService extends BaseService<PriceGroup> {

  constructor(public http: HttpClient) { super(http, "pricegroups") }

  getPriceGroupLookUp() {
    return this.http.get<PriceGroupLookUp[]>(`${environment.baseApi}/pricegroups/lookup`)
  }

}
