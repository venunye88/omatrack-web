import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { LookUp } from 'app/shared/shared.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends BaseService<Region>{

  constructor(public http: HttpClient) { super(http, "regions") }
}

export interface Region extends LookUp {

}