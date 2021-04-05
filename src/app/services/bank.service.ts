import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bank } from 'app/models/bank.model';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class BankService extends BaseService<Bank>{

  constructor(public http: HttpClient) { super(http, "banks") }

}
