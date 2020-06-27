import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Station } from 'app/models/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationService extends BaseService<Station>{

  constructor(public http: HttpClient) { super(http, "stations") }



}
