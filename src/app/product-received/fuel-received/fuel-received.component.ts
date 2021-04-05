import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { FuelStock, StationStock } from 'app/models/fuel-stock.model';
import { WebUtils } from 'app/shared/web-utils';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductReceivedService } from 'app/services/product-received.service';
import { FuelStockService } from 'app/services/fuel-stock.service';
import { ProductReceived } from 'app/models/product-received.model';
import { LoadingMessages } from 'app/shared/config-keys';
import { Outlet } from 'app/models/station.model';
import { Observable } from 'rxjs';
import { StationService } from 'app/services/station.service';

@Component({
  selector: 'app-fuel-received',
  templateUrl: './fuel-received.component.html',
  styleUrls: ['./fuel-received.component.scss'],
})
export class FuelReceivedComponent implements OnInit {
  productForm: FormGroup;
  stations: Observable<StationStock[]>;
  maxDate = WebUtils.getIsoDateString(new Date());

  refno = "";

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder, private productService: ProductReceivedService, private stockService: FuelStockService, private stationService: StationService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setUpForm();
    this.getStationStocks();
  }

  async getStationStocks() {
    this.loading.start(LoadingMessages.Loading)
    this.stations = await this.stockService.fetchStationStocks();
    this.loading.stop()
  }

  refGenerator() {
    var date = new Date().getMilliseconds().toString();
    if (date.length < 3) {
      date = date + Math.floor(Math.random() * 10).toString();
    }
    var ref = WebUtils.generateNumeric(4) + date;
    return ref;
  }

  get productReceivedDetails() {
    return this.productForm.get('productReceivedDetails') as FormArray
  }

  onStationSelected(station: StationStock) {
    if (!station) {
      this.productReceivedDetails.patchValue([{
        fuelProductName: '',
        fuelStockId: null,
        unitPrice: null
      }])
    }
    this.productForm.patchValue({
      station: station
    });
  }

  onProductSelected(fuel: FuelStock, index) {
    if (!fuel) { this.clearFuel(index); return; }
    this.productReceivedDetails.at(index).patchValue({ unitPrice: fuel.unitPrice });
    this.calculateValue(index);
  }

  clearFuel(index) {
    this.productReceivedDetails.at(index).patchValue({
      fuelProductName: '',
      fuelStockId: null,
      unitPrice: null,
      value: null
    })
  }

  async addProductReceivedDetails() {
    const product = this.fb.group({
      fuel: null,
      id: 0,
      date: null,
      fuelProductName: null,
      fuelStockId: null,
      stationId: null,
      invoice: '',
      quantity: null,
      shortage: null,
      unitPrice: null,
      value: null,
      // transporterId: null,
      driver: '',
      vehicleNumber: '',
      narration: ''
    });
    this.productReceivedDetails.push(product);
    this.ref.detectChanges();
  }

  removeFuelStock(index: number) {
    this.productReceivedDetails.removeAt(index);
  }

  calculateValue(index) {
    var fuelObj = (<any>this.productForm.value).productReceivedDetails[index];
    fuelObj.value = fuelObj.quantity * fuelObj.unitPrice;

    this.productReceivedDetails.at(index).patchValue({
      value: fuelObj.value
    })
  }

  reset() {
    this.setUpForm();
  }

  async save(productReceived: ProductReceived) {
    (<any>productReceived).station = null;
    try {
      this.loading.start(LoadingMessages.Saving)
      let res = await this.productService.save(productReceived);
      if (res) {
        this.refno = this.refGenerator();
        this.productForm.reset();
        this.productReceivedDetails.controls.splice(1);
      }
    } catch (error) { }
    finally {
      this.loading.stop();
    }
  }

  private setUpForm() {
    this.refno = this.refGenerator();
    this.productForm = this.fb.group({
      id: 0,
      station: null,
      stationId: null,
      date: null,
      referenceNumber: this.refno,
      productReceivedDetails: this.fb.array([])
    });
    this.addProductReceivedDetails();
  }

}
