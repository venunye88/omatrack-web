import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductReceived } from 'app/models/product-received.model';
import { BaseService } from './base-service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductReceivedService extends BaseService<ProductReceived> {

  constructor(public http: HttpClient) { super(http, "productsreceived") }

  bulkTransaction(products: ProductReceived[]) {
    return this.http.post<boolean>(`${environment.baseApi}/productsreceived/bulktransaction`, products).toPromise();
  }

}
