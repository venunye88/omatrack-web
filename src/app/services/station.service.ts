import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Station } from 'app/models/station.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StationService extends BaseService<Station>{

  constructor(public http: HttpClient) { super(http, "stations") }

  lookup() {
    return this.http.get<Station[]>(`${environment.baseApi}/stations/lookup`)
  }

}
