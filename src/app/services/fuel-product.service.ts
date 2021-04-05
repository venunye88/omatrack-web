import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { FuelProduct } from 'app/models/fuel-product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuelProductService extends BaseService<FuelProduct> {

  constructor(http: HttpClient) { super(http, "products") }
}
