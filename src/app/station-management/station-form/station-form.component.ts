import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Station } from 'app/models/station.model';
import { Region } from 'app/models/region.model';
import { PriceGroupLookUp, PriceGroup, PriceList } from 'app/models/price-group.model';
import { StationService } from 'app/services/station.service';
import { RegionService } from 'app/services/region.service';
import { PriceGroupService } from 'app/services/price-group.service';
import { MessageBox, Toast } from 'app/shared/message-helper';
import { LoadingMessages, AppRouteNames } from 'app/shared/config-keys';
import { Router, ActivatedRoute } from '@angular/router';
import { where, pluck, last, findWhere } from "underscore";
import { isNullOrUndefined } from 'util';
import { FuelStock } from 'app/models/fuel-stock.model';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.scss']
})
export class StationFormComponent implements OnInit {
  stationForm: FormGroup;
  // stations: Observable<Station[]>;
  station: Station;
  regions: Observable<Region[]>;
  priceGroups: Observable<PriceGroup[]>;
  selectedGroupId: any;
  products: FuelStock[] = [];
  selectedFuel: FuelStock;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder, private stationService: StationService, private regionService: RegionService, private priceGroupService: PriceGroupService, private router: Router, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchRegions();
    this.fetchPriceGroups();

    let id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) { this.getStation(id); }
  }

  async getStation(id: number) {
    try {
      this.loading.start();
      this.station = await this.stationService.find(id);
      this.stationForm.patchValue({
        id: this.station.id,
        name: this.station.name,
        phoneNumber: this.station.phoneNumber,
        priceGroupId: this.station.priceGroupId,
        regionId: this.station.regionId,
        location: this.station.location,
        latitude: this.station.latitude,
        longitude: this.station.longitude,
        address: this.station.address
      });

      this.fuelStocks.controls.splice(0);

      var items = []
      if (this.station.fuelStocks) {
        // for product
        this.station.fuelStocks.forEach(stock => {
          items.push({
            id: stock.id,
            fuelProductId: stock.fuelProductId,
            fuelProductName: stock.fuelProductName,
            reorderLevel: stock.reorderLevel,
            quantity: 0,
            stationId: null,
            stationName: null
          });

          this.fuelStocks.push(this.fb.group({
            id: stock.id,
            fuelProductId: stock.fuelProductId,
            fuelProductName: stock.fuelProductName,
            reorderLevel: stock.reorderLevel,
            quantity: 0,
            stationId: null,
            stationName: null
          }));
        }
        );
        this.products = JSON.parse(JSON.stringify(items));
      }
    }
    catch (error) { this.loading.stop(); this.closeForm(); }
    finally { this.loading.stop(); }
  }



  async fetchRegions() {
    this.regions = this.regionService.get();
  }

  async fetchPriceGroups() {
    this.priceGroups = this.priceGroupService.get();
  }

  loadProducts(priceGroup: PriceGroup) {
    if (!isNullOrUndefined(priceGroup)) {
      var items = []
      priceGroup.priceLists
        .forEach(q =>
          items.push({
            id: 0,
            fuelProductId: q.fuelProductId,
            fuelProductName: q.fuelProductName,
            quantity: 0,
            reorderLevel: 0,
            stationId: null,
            stationName: null
          }));
      this.clearFuelSelect();
      this.products = items;

    }
    else {
      this.products = [];
      this.clearFuelSelect();
    }
  }

  clearFuelSelect() {
    if (this.fuelStocks.length > 0) {
      this.fuelStocks.controls.forEach(control => {
        control.patchValue({
          id: 0,
          fuelProductId: null,
          fuelProductName: ''
        });
      });
    }
  }

  async onFuelSelected(stock: FuelStock) {
    if (!stock) { this.selectedFuel = null; return; };
    let exist = where(this.fuelStocks.value, { fuelProductId: stock.fuelProductId });
    if (exist.length > 1) {
      this.selectedFuel = stock;
      Toast.warning(`${stock.fuelProductName} already added.`);
    }
  }

  get fuelStocks() {
    return this.stationForm.get('fuelStocks') as FormArray;
  }

  async addFuelStock(isClicked: boolean) {
    if (isClicked) {
      if (this.selectedFuel != null) {
        Toast.error(`Found Duplicate ${this.selectedFuel.fuelProductName}`);
        this.selectedFuel = null;
        return;
      }
      var fuel = <FuelStock>last(this.fuelStocks.value);
      if (isNullOrUndefined(fuel?.fuelProductId) || fuel?.fuelProductId == 0) {
        Toast.warning(`Select Fuel`);
        return;
      }
    }

    const stock = this.fb.group({
      id: 0,
      fuelProductId: null,
      fuelProductName: '',
      quantity: 0,
      reorderLevel: 0,
      stationId: null,
      stationName: null
    });

    this.fuelStocks.push(stock);
  }

  removeFuelStock(index: number) {
    this.fuelStocks.removeAt(index);
    this.selectedFuel = null;
  }

  validate(fuelStocks) {
    var fuelArr = pluck(fuelStocks, 'fuelProductId');
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    var hasDuplicate = findDuplicates(fuelArr).length > 0;

    var hasFuel = where(fuelStocks, { fuelProductId: null }).length > 0;

    if (hasFuel) { return "Fuel has not been selected for one or more stocks"; }
    if (hasDuplicate) { return "Found duplicate fuel entries"; }

    return "";
  }

  async save(station: Station) {
    console.log(station)
    var msg = this.validate(station.fuelStocks);
    if (msg != "") { Toast.error(msg); return; }
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.stationService.save(station);
      if (res) {
        this.closeForm();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }


  async delete(station: Station) {
    let confirm = await MessageBox.confirm("Delete Station", `Are you sure you want to delete ${station.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.stationService.delete(station.id);
      if (res) {
        this.closeForm();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  closeForm() { this.router.navigate([`${AppRouteNames.StationMgt}/${AppRouteNames.Station}`]) }


  setUpForm() {
    this.stationForm = this.fb.group({
      id: 0,
      name: '',
      regionId: 0,
      regionName: '',
      priceGroupId: 0,
      priceGroupName: '',
      phoneNumber: '',
      address: '',
      email: '',
      location: '',
      description: '',
      latitude: null,
      longitude: null,
      fuelStocks: this.fb.array([])
    });
    this.addFuelStock(false);

  }


}


// TODO: in update, affect stock products on price group change