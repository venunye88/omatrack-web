import { Component, OnInit } from '@angular/core';
import { AccountGroup } from 'app/models/account-group.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AccountGroupService } from 'app/services/account-group.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';

@Component({
  selector: 'app-account-group',
  templateUrl: './account-group.component.html',
  styleUrls: ['./account-group.component.scss']
})
export class AccountGroupComponent implements OnInit {
  accountGroups: Observable<AccountGroup[]>;
  showForm: boolean;
  filterText: string = "";
  agForm: FormGroup;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private agService: AccountGroupService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchAccountGroups();
  }

  fetchAccountGroups() {
    this.accountGroups = this.agService.get();
  }

  openForm(ag?: AccountGroup) {
    this.agForm.reset();
    this.showForm = true;
    if (ag != null) {
      this.agForm.patchValue(ag);
    }
  }

  closeForm() { this.showForm = false; }

  async save(ag: AccountGroup) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.agService.save(ag);
      if (res) {
        this.closeForm();
        this.fetchAccountGroups();
      }
    } catch (error) { } finally { this.loading.stop() };
  }

  async delete(ag: AccountGroup) {
    let confirm = await MessageBox.confirm("Delete Account Group", `Are you sure you want to delete ${ag.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.agService.delete(ag.id);
      if (res) {
        this.closeForm();
        this.fetchAccountGroups();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.agForm = this.fb.group({
      id: 0,
      name: '',
      description: ''
    })
  }

}
