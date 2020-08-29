import { Component, OnInit, ViewChild } from '@angular/core';
import { FuelProduct } from 'app/models/fuel-product.model';
import { FuelPump } from 'app/models/fuel-pump';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Station } from 'app/models/station.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgSelectComponent } from '@ng-select/ng-select';
import { StationService } from 'app/services/station.service';
import { FuelProductService } from 'app/services/fuel-product.service';
import { FuelPumpService } from 'app/services/fuel-pump.service';
import { isNullOrUndefined } from 'util';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';

@Component({
  selector: 'app-fuel-pump',
  templateUrl: './fuel-pump.component.html',
  styleUrls: ['./fuel-pump.component.scss']
})
export class FuelPumpComponent implements OnInit {
  filter = { name: '', stationId: 0 };
  pageSize = 15;
  pumpForm: FormGroup;
  stations: Observable<Station[]>;
  selectedStation: Station;
  fuelPumps: Observable<FuelPump[]>;
  fuelProducts: Observable<FuelProduct[]>;
  showForm: boolean;

  @BlockUI('loading') loading: NgBlockUI;
  @ViewChild('ngStation') public ngSelect: NgSelectComponent;

  constructor(private fb: FormBuilder, private pumpService: FuelPumpService, private stationService: StationService, private fuelService: FuelProductService) { }

  ngOnInit(): void {
    this.fetchStations();
    this.fetchFuelProducts();
    this.setUpForm();
  }

  async fetchStations() {
    this.stations = this.stationService.lookup();
  }

  async fetchFuelProducts() {
    this.fuelProducts = this.fuelService.get();
  }

  async fetchRecords(stationId: number) {
    try {
      this.loading.start()
      let res = await this.pumpService.getByStation(stationId)
      this.loading.stop()
      if (res) { this.fuelPumps = res; }
    } catch (error) { this.loading.stop(); }
  }

  loadPumps(stationId: number) {
    if (!isNullOrUndefined(stationId)) {
      this.fetchRecords(stationId)

    } else {
      this.fuelPumps = of([]);
      this.closeForm();
    }
  }

  openForm(pump?: FuelPump) {
    this.pumpForm.reset();
    this.showForm = true;
    if (pump != null) {
      this.pumpForm.patchValue({
        id: pump.id,
        name: pump.name,
        stationId: pump.stationId,
        fuelProductId: pump.fuelProductId,
        address: pump.address,
      })
    }
  }

  closeForm() {
    this.ngSelect.handleClearClick();
    this.showForm = false;
  }

  async save(pump: FuelPump) {
    try {
      this.loading.start(LoadingMessages.Saving)
      let res = await this.pumpService.save(pump);
      if (res) {
        this.ngSelect.handleClearClick();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  async delete(pump: FuelPump) {
    let confirm = await MessageBox.confirm("Delete Fuel Pump", `Are you sure you want to delete ${pump.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.pumpService.delete(pump.id);
      if (res) {
        this.closeForm();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  private setUpForm() {
    this.pumpForm = this.fb.group({
      id: 0,
      name: '',
      stationId: null,
      fuelProductId: null,
      address: '',
    });
  }




}
