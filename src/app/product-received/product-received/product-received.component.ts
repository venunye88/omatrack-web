import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FuelStock } from 'app/models/fuel-stock.model';
import { Station } from 'app/models/station.model';
import { WebUtils } from 'app/shared/web-utils';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductReceivedService } from 'app/services/product-received.service';
import { TransporterService } from 'app/services/transporter.service';
import { without, where, last, shuffle } from "underscore";

import { FuelStockService } from 'app/services/fuel-stock.service';
import { Transporter } from 'app/models/transporter.model';
import { Toast } from 'app/shared/message-helper';
import { ProductReceived } from 'app/models/product-received.model';
import { LoadingMessages } from 'app/shared/config-keys';

@Component({
  selector: 'app-product-received',
  templateUrl: './product-received.component.html',
  styleUrls: ['./product-received.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductReceivedComponent implements OnInit {
  productForm: FormGroup;
  stocks: Promise<FuelStock[]>;
  transporters: Promise<Transporter[]>;
  maxDate = WebUtils.getIsoDateString(new Date());
  // refno = WebUtils.generateNumeric(6);
  refno = "";

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder, private productService: ProductReceivedService, private transportService: TransporterService, private stockService: FuelStockService) { }

  ngOnInit(): void {
    this.setUpForm();
    this.getStocks();
    this.getTransporters();
  }

  getStocks() {
    this.stocks = this.stockService.fetchStationStocks().toPromise();
  }

  refGenerator() {
    var date = new Date().getMilliseconds().toString();
    if (date.length < 3) {
      date = date + Math.floor(Math.random() * 10).toString();
    }
    var ref = WebUtils.generateNumeric(4) + date;
    return ref;
  }

  getTransporters() {
    this.transporters = this.transportService.get().toPromise();
  }

  get fuelStocks() {
    return this.productForm.get('fuelStocks') as FormArray
  }

  onFuelSelected(fuel, index) {
    if (!fuel) { return; }
    if (fuel.stocks.length > 0) {
      this.clearFuel(index);
      this.fuelStocks.at(index).patchValue({ fuel: fuel.stocks });
    } else {
      this.clearFuel(index);
      this.fuelStocks.at(index).patchValue({ fuel: fuel.stocks });
    }

  }

  clearFuel(index) {
    this.fuelStocks.at(index).patchValue({
      fuelProductName: '',
      fuelStockId: null
    })
  }

  async addFuelStock() {
    const product = this.fb.group({
      fuel: null,
      id: 0,
      date: null,
      fuelProductName: '',
      fuelStockId: null,
      stationId: null,
      invoice: '',
      referenceNumber: this.refno,
      quantity: null,
      shortage: null,
      receiptedPrice: null,
      value: null,
      transporterId: null,
      driver: '',
      vehicleNumber: '',
      narration: ''
    });
    this.fuelStocks.push(product);
  }

  removeFuelStock(index: number) {
    this.fuelStocks.removeAt(index);
  }

  calculateValue(index) {
    var fuelObj = (<any>this.productForm.value).fuelStocks[index];
    fuelObj.value = fuelObj.quantity * fuelObj.receiptedPrice;

    this.fuelStocks.at(index).patchValue({
      value: fuelObj.value
    })
  }

  reset() {
    this.setUpForm();
  }

  async save(productReceived: ProductReceived[]) {
    productReceived = productReceived.map(q => { (<any>q).fuel = null; return q });
    try {
      this.loading.start(LoadingMessages.Saving)
      let res = await this.productService.bulkTransaction(productReceived);
      if (res) {
        this.refno = this.refGenerator();
        this.productForm.reset();
        this.fuelStocks.controls.splice(1);
        // this.setUpForm();
      }
    } catch (error) { }
    finally {
      this.loading.stop();
      // this.productForm.reset();
    }
  }

  private setUpForm() {
    this.refno = this.refGenerator();
    this.productForm = this.fb.group({
      fuelStocks: this.fb.array([])
    });
    this.addFuelStock();
  }

}
