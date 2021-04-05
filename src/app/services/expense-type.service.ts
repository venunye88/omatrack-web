import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { ExpenseType } from 'app/models/expense-type.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService extends BaseService<ExpenseType>{

  constructor(public http: HttpClient) { super(http, "expensetypes") }
}
