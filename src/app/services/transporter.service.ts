import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Transporter } from 'app/models/transporter.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransporterService extends BaseService<Transporter> {

  constructor(public http: HttpClient) { super(http, "transporters") }
}
