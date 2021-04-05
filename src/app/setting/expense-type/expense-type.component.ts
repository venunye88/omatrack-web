import { Component, OnInit } from '@angular/core';
import { ExpenseTypeService } from 'app/services/expense-type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExpenseType } from 'app/models/expense-type.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.scss']
})
export class ExpenseTypeComponent implements OnInit {
  expenseTypes: Observable<ExpenseType[]>;
  showForm: boolean;
  filterText: string = "";
  etForm: FormGroup;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private etService: ExpenseTypeService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchExpenseTypes();
  }

  async fetchExpenseTypes() {
    this.expenseTypes = await this.etService.get();
  }

  openForm(et?: ExpenseType) {
    this.etForm.reset();
    this.showForm = true;
    if (et != null) {
      this.etForm.patchValue(et);
    }
  }
  closeForm() { this.showForm = false; }

  async save(et: ExpenseType) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.etService.save(et);
      if (res) {
        this.etForm.reset();
        this.fetchExpenseTypes();
      }
    } catch (error) { } finally { this.loading.stop() };
  }

  async delete(et: ExpenseType) {
    let confirm = await MessageBox.confirm("Delete Expense Type", `Are you sure you want to delete ${et.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.etService.delete(et.id);
      if (res) {
        this.closeForm();
        this.fetchExpenseTypes();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.etForm = this.fb.group({
      id: 0,
      name: '',
      description: ''
    })
  }


}
