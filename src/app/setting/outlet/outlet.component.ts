import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Outlet, OutletService } from 'app/services/outlet.service';
import { PriceGroupService } from 'app/services/price-group.service';
import { Region, RegionService } from 'app/services/region.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';
import { LookUp } from 'app/shared/shared.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {
  outletForm: FormGroup;
  showForm: boolean;
  filter = { text: '' }
  pageSize = 15;
  filterText: string = "";
  outlets: Observable<Outlet[]>
  priceGroups: Observable<LookUp[]>
  regions: Observable<Region[]>;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder, private outletService: OutletService, private regionService: RegionService, private priceGroupService: PriceGroupService, private router: Router) { }


  ngOnInit(): void {
    this.setUpForm();
    this.fetchRecords({});
    this.fetchRegions();
    this.fetchPriceGroups();
  }

  async fetchRecords(filter: any) {
    try {
      this.loading.start()
      filter._page = 1;
      filter._size = this.pageSize;
      let res = await this.outletService.query(filter)
      this.loading.stop()
      if (res) { this.outlets = of(res); }
    } catch (error) { this.loading.stop(); }
  }

  async fetchRegions() {
    this.regions = this.regionService.get();
  }

  openForm(outlet?: Outlet) {
    this.outletForm.reset();
    this.showForm = true
    if (outlet != null) { this.outletForm.patchValue(outlet); }

    // this.router.navigate([`${AppRouteNames.StationMgt}/${AppRouteNames.Station}/form`, station.id]);
  }

  closeForm() { this.showForm = false; }

  async save(outlet: Outlet) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.outletService.save(outlet);
      if (res) {
        // this.closeForm();
        this.fetchRecords({});
        this.outletForm.reset();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }


  async delete(outlet: Outlet) {
    let confirm = await MessageBox.confirm("Delete Outlet", `Are you sure you want to delete ${outlet.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.outletService.delete(outlet.id);
      if (res) {
        this.closeForm();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }



  async fetchPriceGroups() {
    this.priceGroups = this.priceGroupService.getPriceGroupLookUp();
  }

  setUpForm() {
    this.outletForm = this.fb.group({
      id: 0,
      name: '',
      regionId: 0,
      regionName: '',
      priceGroupId: 0,
      priceGroupName: '',
      phoneNumber: '',
      address: '',
      email: '',
      description: '',
    })
  }



}
