import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HasId } from 'app/shared/shared.model';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  constructor(http: HttpClient) { super(http, "products") }
}

export interface Product extends HasId {
  name: string
  description: string
}
