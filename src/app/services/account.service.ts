import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service';
import { Account } from 'app/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<Account> {

  constructor(http: HttpClient) { super(http, 'accounts') }

}
