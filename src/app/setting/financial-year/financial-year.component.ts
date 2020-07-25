import { Component, OnInit } from '@angular/core';
import { FinancialYearService } from 'app/services/financial-year.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FinancialYear } from 'app/models/financial-year.model';
import { Observable, of } from 'rxjs';
import { AccountGroup } from 'app/models/account-group.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';
import { WebUtils } from 'app/shared/web-utils';
import * as moment from 'moment';

@Component({
  selector: 'app-financial-year',
  templateUrl: './financial-year.component.html',
  styleUrls: ['./financial-year.component.scss']
})
export class FinancialYearComponent implements OnInit {
  financialYears: Observable<FinancialYear[]>;
  showForm: boolean;
  filterText: string = "";
  fyForm: FormGroup;
  count = 0;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fyService: FinancialYearService, private fb: FormBuilder) { }
  filter = { year: 0, startDate: '', endDate: '' };
  pageSize = 15;

  ngOnInit(): void {
    this.setUpForm();
    this.fetchRecords({});
  }

  async fetchRecords(filter: any) {
    try {
      this.loading.start()
      // filter.locationId = this.authService.currentUser.currentLocation.id
      filter._page = 1;
      filter._size = this.pageSize;
      let res = await this.fyService.query(filter)
      this.loading.stop()
      if (res) { this.financialYears = of(res); this.count = res.length; }
    } catch (error) { this.loading.stop(); }
  }

  async loadMore(filter: any) {
    try {
      this.loading.start()
      let currentRecords = (this.financialYears) ? await this.financialYears.toPromise() : []
      filter._page = Math.ceil(currentRecords.length / this.pageSize) + 1;
      filter._size = this.pageSize;
      let res = await this.fyService.query(filter)
      this.loading.stop()
      if (res) {
        this.financialYears = of([...currentRecords, ...res])
      }
    } catch (error) { this.loading.stop(); }
  }

  openForm(fy?: FinancialYear) {
    this.fyForm.reset();
    this.showForm = true;
    if (fy != null) {
      this.fyForm.patchValue({
        id: fy.id,
        year: fy.year,
        startDate: WebUtils.getIsoDateString(fy.startDate),
        endDate: WebUtils.getIsoDateString(fy.endDate),
        isClosed: fy.isClosed
      });
    }
  }

  closeForm() { this.showForm = false; }

  onChange(fy: FinancialYear) {
    if (fy != null) {
      this.fyForm.patchValue({
        endDate: WebUtils.getIsoDateString(moment(fy.startDate).add(1, 'year'))
      })
    }
  }

  async save(fy: FinancialYear) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.fyService.save(fy);
      if (res) {
        this.closeForm();
        this.fetchRecords({});
      }
    } catch (error) { } finally { this.loading.stop() };
  }

  async delete(fy: FinancialYear) {
    let confirm = await MessageBox.confirm("Delete Financial Year", `Are you sure you want to delete ${fy.year} financial year?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.fyService.delete(fy.id);
      if (res) {
        this.closeForm();
        this.fetchRecords({});
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.fyForm = this.fb.group({
      id: 0,
      year: '',
      startDate: null,
      endDate: null,
      isClosed: false
    })
  }


}
