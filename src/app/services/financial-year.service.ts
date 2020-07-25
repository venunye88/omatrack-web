import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { FinancialYear } from 'app/models/financial-year.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinancialYearService extends BaseService<FinancialYear>{

  constructor(http: HttpClient) { super(http, "financialyears") }
}
