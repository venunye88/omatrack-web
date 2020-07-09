import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { AccountGroup } from 'app/models/account-group.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountGroupService extends BaseService<AccountGroup> {

  constructor(http: HttpClient) { super(http, "accountgroups") }

}
