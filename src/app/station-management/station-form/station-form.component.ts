import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Outlet } from 'app/models/station.model';
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
  outlet: Outlet;
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
      this.outlet = await this.stationService.find(id);
      this.stationForm.patchValue({
        id: this.outlet.id,
        name: this.outlet.name,
        phoneNumber: this.outlet.phoneNumber,
        priceGroupId: this.outlet.priceGroupId,
        regionId: this.outlet.regionId,
        // location: this.outlet.location,
        // latitude: this.outlet.latitude,
        // longitude: this.outlet.longitude,
        address: this.outlet.address
      });

      this.fuelStocks.controls.splice(0);

      var items = []
      if (this.outlet.fuelStocks) {
        // for product
        this.outlet.fuelStocks.forEach(stock => {
          items.push({
            id: stock.id,
            fuelProductId: stock.fuelProductId,
            fuelProductName: stock.fuelProductName,
            reorderLevel: stock.reorderLevel,
            initialStock: stock.initialStock,
          });

          this.fuelStocks.push(this.fb.group({
            id: stock.id,
            fuelProductId: stock.fuelProductId,
            fuelProductName: stock.fuelProductName,
            initialStock: stock.initialStock,
            reorderLevel: stock.reorderLevel,
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
            productId: q.productId,
            productName: q.productName,
            initialStock: 0,
            reorderLevel: 0,
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
      initialStock: 0,
      reorderLevel: 0,
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

  async save(station: Outlet) {
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


  async delete(outlet: Outlet) {
    let confirm = await MessageBox.confirm("Delete Station", `Are you sure you want to delete ${outlet.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.stationService.delete(outlet.id);
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

