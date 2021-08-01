import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from 'app/dashboard/dashboard.component';
import { environment } from 'environments/environment';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<Transaction>{

  constructor(http: HttpClient) {
    super(http, "transactions");
  }


  summaryQuery(filter: any) {
    return this.http.get<any[]>(`${environment.baseApi}/transactions/summary`);
  }

  fetchDashboard() {
    return this.http.get<Dashboard>(`${environment.baseApi}/transactions/dashboard`).toPromise();
  }

  protected getQueryString(filter: object) {
    let queryString = Object.keys(filter).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key])
    }).join('&');

    return queryString
  }

}

export interface Transaction {
  id: number
  outletId: number,
  date: number,
  referenceNumber: string,
  outlet: string,
  pumpSales: Array<any>,
  status: Status,
  productsReceived: Array<any>,
  expenses: Array<any>,
  stockOperations: Array<any>,
  creditSales: Array<any>,
  creditPayments: Array<any>,
  dailyBankings: Array<any>
}

export enum Status {
  Pending,
  Correction,
  Approved
}