import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { StationService } from 'app/services/station.service';
import { Observable, of } from 'rxjs';
import { Station } from 'app/models/station.model';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';
import { Region } from 'app/models/region.model';
import { RegionService } from 'app/services/region.service';
import { PriceGroupLookUp } from 'app/models/price-group.model';
import { PriceGroupService } from 'app/services/price-group.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
  filter = { name: '', phoneNumber: '', regionId: 0, regionName: '', priceGroupId: 0, priceGroupName: '' }
  pageSize = 15;
  filterText: string = "";
  showForm: boolean;
  stationForm: FormGroup;
  stations: Observable<Station[]>;
  regions: Observable<Region[]>;
  priceGroups: Observable<PriceGroupLookUp[]>;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder, private stationService: StationService, private regionService: RegionService, private priceGroupService: PriceGroupService) { }

  ngOnInit(): void {
    this.setUpForm();
    // this.fetchStations();
    this.fetchRecords({});
    this.fetchRegions();
    this.fetchPriceGroups();
  }

  async fetchRecords(filter: any) {
    try {
      this.loading.start()
      // filter.locationId = this.authService.currentUser.currentLocation.id
      filter._page = 1;
      filter._size = this.pageSize;
      let res = await this.stationService.query(filter)
      this.loading.stop()
      if (res) { this.stations = of(res); }
    } catch (error) { this.loading.stop(); }
  }

  async fetchRegions() {
    this.regions = this.regionService.get();
  }

  async fetchPriceGroups() {
    this.priceGroups = this.priceGroupService.getPriceGroupLookUp();
  }

  // fetchStations() {
  //   this.stations = this.stationService.get();
  // }

  openForm(station?: Station) {
    this.stationForm.reset();
    this.showForm = true
    if (station != null) { this.stationForm.patchValue(station); }
  }

  closeForm() { this.showForm = false; }

  async loadMore(filter: any) {
    try {
      this.loading.start()
      let currentRecords = (this.stations) ? await this.stations.toPromise() : []
      // filter.locationId = this.authService.currentUser.currentLocation.id
      filter._page = Math.ceil(currentRecords.length / this.pageSize) + 1;
      filter._size = this.pageSize;
      let res = await this.stationService.query(filter)
      this.loading.stop()
      if (res) {
        this.stations = of([...currentRecords, ...res])
      }
    } catch (error) { this.loading.stop(); }
  }

  async save(station: Station) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.stationService.save(station);
      if (res) {
        this.closeForm();
        this.fetchRecords({})
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
        this.fetchRecords({})
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

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
      longitude: null
    })
  }

}
