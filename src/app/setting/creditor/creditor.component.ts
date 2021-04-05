import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Creditor, CreditorService } from 'app/services/creditor.service';
import { isNullOrUndefined } from 'util';
import { LoadingMessages } from 'app/shared/config-keys';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Outlet, OutletService } from 'app/services/outlet.service';

@Component({
  selector: 'app-creditor',
  templateUrl: './creditor.component.html',
  styleUrls: ['./creditor.component.scss']
})
export class CreditorComponent implements OnInit {
  filter = { name: '', outletId: 0 };
  pageSize = 15;
  creditorForm: FormGroup;
  outlets: Observable<Outlet[]>;
  selectedoutlet: Outlet;
  creditors: Observable<Creditor[]>;
  showForm: boolean;

  @BlockUI('loading') loading: NgBlockUI;
  @ViewChild('ngoutlet') public ngSelect: NgSelectComponent;

  constructor(private fb: FormBuilder, private creditorService: CreditorService, private outletService: OutletService) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchOutlets();
    // this.fetchRecords({});
  }

  // async fetchRecords(filter: any) {
  //   try {
  //     this.loading.start()
  //     // filter.locationId = this.authService.currentUser.currentLocation.id
  //     filter._page = 1;
  //     filter._size = this.pageSize;
  //     let res = await this.creditorService.query(filter)
  //     this.loading.stop()
  //     if (res) { this.creditors = of(res); }
  //   } catch (error) { this.loading.stop(); }
  // }

  async fetchRecords(outletId: number) {
    try {
      this.loading.start()
      let res = await this.creditorService.getByOutlet(outletId)
      this.loading.stop()
      if (res) { this.creditors = res; }
    } catch (error) { this.loading.stop(); }
  }


  async fetchOutlets() {
    this.outlets = this.outletService.lookup();
  }

  // loadCreditors(creditor: Creditor) {
  //   if (!isNullOrUndefined(creditor)) {
  //     this.fetchRecords({ name: '', id: creditor.id });

  //   } else {
  //     this.creditors = of([]);
  //     this.closeForm();
  //   }
  // }

  async loadMore() {
    if (!this.ngSelect.hasValue) return;
    let outletId = (<any>this.ngSelect.selectedValues[0]).id;
    try {
      let filter = <any>{ name: '', outletId: outletId };
      this.loading.start()
      let currentRecords = (this.creditors) ? await this.creditors.toPromise() : []
      filter._page = Math.ceil(currentRecords.length / this.pageSize) + 1;
      filter._size = this.pageSize;
      let res = await this.creditorService.query(filter)
      this.loading.stop()
      if (res) {
        this.creditors = of([...currentRecords, ...res])
      }
    } catch (error) { this.loading.stop(); }
  }

  openForm(creditor?: Creditor) {
    this.creditorForm.reset();
    this.showForm = true;
    if (creditor != null) {
      this.creditorForm.patchValue({
        id: creditor.id,
        name: creditor.name,
        outletId: creditor.outletId,
        phoneNumber: creditor.phoneNumber,
        address: creditor.address,
        initialBalance: creditor.initialBalance
      })
    }
  }
  closeForm() {
    this.ngSelect.handleClearClick();
    this.showForm = false;
  }

  async save(creditor: Creditor) {
    try {
      this.loading.start(LoadingMessages.Saving)
      let res = await this.creditorService.save(creditor);
      if (res) {
        this.closeForm();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  private setUpForm() {
    this.creditorForm = this.fb.group({
      id: 0,
      name: '',
      outletId: null,
      phoneNumber: '',
      address: '',
      initialBalance: 0,
    });
  }

}
