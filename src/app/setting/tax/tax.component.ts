import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tax } from 'app/models/tax.model';
import { WebUtils } from 'app/shared/web-utils';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TaxService } from 'app/services/tax.service';
import { Region } from 'app/models/region.model';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox, Toast } from 'app/shared/message-helper';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
  taxForm: FormGroup;
  taxes: Observable<Tax[]>;
  showForm: boolean;
  maxDate = WebUtils.getIsoDateString(new Date())

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder, private taxService: TaxService) { }

  ngOnInit(): void {
    this.setUpForm();
    this.getTaxes();
  }

  async getTaxes() {
    this.taxes = await this.taxService.get();
  }

  openForm(tax?: Tax) {
    this.taxForm.reset();
    this.showForm = true;
    if (tax != null) {
      this.taxForm.patchValue({
        id: tax.id,
        name: tax.name,
        rate: tax.rate,
        effectiveDate: WebUtils.getIsoDateString(tax.effectiveDate),
        description: tax.description
      });
    }
  }



  closeForm() { this.showForm = false; }

  async save(tax: Tax) {
    if (isNullOrUndefined(tax.effectiveDate)) { Toast.error("Select Effective Date"); return; }
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.taxService.save(tax);
      if (res) {
        this.closeForm();
        this.getTaxes();
      }
    } catch (error) { } finally { this.loading.stop() };
  }

  async delete(tax: Tax) {
    let confirm = await MessageBox.confirm("Delete Tax", `Are you sure you want to delete ${tax.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.taxService.delete(tax.id);
      if (res) {
        this.closeForm();
        this.getTaxes();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.taxForm = this.fb.group({
      id: 0,
      name: '',
      rate: 0,
      effectiveDate: WebUtils.getIsoDateString(new Date()),
      description: ''
    })
  }

}
