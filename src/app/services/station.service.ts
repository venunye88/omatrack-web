import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Outlet } from 'app/models/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationService extends BaseService<Outlet>{

  constructor(public http: HttpClient) { super(http, "outlets") }

  lookup() {
    return this.http.get<Outlet[]>(`${environment.baseApi}/stations/lookup`)
  }

}
