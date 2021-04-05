import { Component, OnInit } from '@angular/core';
import { AccountGroup } from 'app/models/account-group.model';
import { Account } from 'app/models/account.model';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AccountService } from 'app/services/account.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';
import { StationService } from 'app/services/station.service';
import { AccountGroupService } from 'app/services/account-group.service';
import { Outlet, OutletService } from 'app/services/outlet.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  filter = { name: '', stationId: 0, accountGroupId: 0 }
  pageSize = 15;
  accounts: Observable<Account[]>;
  outlets: Observable<Outlet[]>;
  accountGroups: Observable<AccountGroup[]>;
  showForm: boolean;
  filterText: string = "";
  accountForm: FormGroup;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private accountService: AccountService, private fb: FormBuilder, private outletService: OutletService, private agService: AccountGroupService) { }

  ngOnInit(): void {
    this.setUpForm();
    // this.fetchAccounts();
    this.fetchRecords({});
    this.fetchOutlets();
    this.fetchAccountGroups();
  }

  async fetchOutlets() {
    this.outlets = this.outletService.get();
  }

  async fetchAccountGroups() {
    this.accountGroups = this.agService.get();
  }

  // fetchAccounts() {
  //   this.accounts = this.accountService.get();
  // }

  async fetchRecords(filter: any) {
    try {
      this.loading.start()
      // filter.locationId = this.authService.currentUser.currentLocation.id
      filter._page = 1;
      filter._size = this.pageSize;
      let res = await this.accountService.query(filter)
      this.loading.stop()
      if (res) { this.accounts = of(res); }
    } catch (error) { this.loading.stop(); }
  }

  async loadMore(filter: any) {
    try {
      this.loading.start()
      let currentRecords = (this.accounts) ? await this.accounts.toPromise() : []
      // filter.locationId = this.authService.currentUser.currentLocation.id
      filter._page = Math.ceil(currentRecords.length / this.pageSize) + 1;
      filter._size = this.pageSize;
      let res = await this.accountService.query(filter)
      this.loading.stop()
      if (res) {
        this.accounts = of([...currentRecords, ...res])
      }
    } catch (error) { this.loading.stop(); }
  }

  openForm(account: Account) {
    this.accountForm.reset();
    this.showForm = true;
    if (account != null) { this.accountForm.patchValue(account); }
  }

  closeForm() { this.showForm = false; }

  async save(account: Account) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.accountService.save(account);
      if (res) {
        this.closeForm();
        // this.fetchAccounts();
        this.fetchRecords({})
      }
    } catch (error) { } finally { this.loading.stop() };
  }

  async delete(account: Account) {
    let confirm = await MessageBox.confirm("Delete Account", `Are you sure you want to delete ${account.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.accountService.delete(account.id);
      if (res) {
        this.closeForm();
        // this.fetchAccounts();
        this.fetchRecords({})
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.accountForm = this.fb.group({
      id: 0,
      name: '',
      stationId: 0,
      accountGroupId: 0,
      description: ''
    });
  }

}
