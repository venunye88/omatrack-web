import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Tax } from 'app/models/tax.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaxService extends BaseService<Tax> {

  constructor(public http: HttpClient) { super(http, "taxes") }
}
