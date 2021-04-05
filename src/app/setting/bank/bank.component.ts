import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Bank } from 'app/models/bank.model';
import { BankService } from 'app/services/bank.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  banks: Observable<Bank[]>;
  showForm: boolean;
  filterText: string = "";
  bankForm: FormGroup;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private bankService: BankService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.setUpForm();
    this.fetchExpenseTypes();
  }

  async fetchExpenseTypes() {
    this.banks = await this.bankService.get();
  }

  closeForm() { this.showForm = false; }

  openForm(bank?: Bank) {
    this.bankForm.reset();
    this.showForm = true;
    if (bank != null) {
      this.bankForm.patchValue(bank);
    }
  }

  async save(bank: Bank) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.bankService.save(bank);
      if (res) {
        this.bankForm.reset();
        this.fetchExpenseTypes();
      }
    } catch (error) { } finally { this.loading.stop() };
  }

  async delete(bank: Bank) {
    let confirm = await MessageBox.confirm("Delete Bank", `Are you sure you want to delete ${bank.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.bankService.delete(bank.id);
      if (res) {

        this.closeForm();
        this.fetchExpenseTypes();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.bankForm = this.fb.group({
      id: 0,
      name: '',
      description: ''
    })
  }

}
