import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Region } from 'app/models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends BaseService<Region>{

  constructor(public http: HttpClient) { super(http, "regions") }
}
