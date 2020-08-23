import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Creditor } from 'app/models/creditor.model';

@Injectable({
  providedIn: 'root'
})
export class CreditorService extends BaseService<Creditor>{

  constructor(public http: HttpClient) { super(http, "creditors") }
}
