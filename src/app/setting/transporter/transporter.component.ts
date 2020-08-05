import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { PriceGroup } from 'app/models/price-group.model';
import { FuelProduct } from 'app/models/fuel-product.model';
import { WebUtils } from 'app/shared/web-utils';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Transporter } from 'app/models/transporter.model';
import { TransporterService } from 'app/services/transporter.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { Region } from 'app/models/region.model';
import { MessageBox } from 'app/shared/message-helper';

@Component({
  selector: 'app-transporter',
  templateUrl: './transporter.component.html',
  styleUrls: ['./transporter.component.scss']
})
export class TransporterComponent implements OnInit {
  transporters: Observable<Transporter[]>;
  showForm: boolean;
  filterText: string = "";
  transporterForm: FormGroup;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private transporterService: TransporterService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchTransporters();
  }

  fetchTransporters() {
    this.transporters = this.transporterService.get();
  }

  openForm(transporter?: Transporter) {
    this.transporterForm.reset();
    this.showForm = true;
    if (transporter != null) {
      this.transporterForm.patchValue(transporter);
    }
  }

  closeForm() { this.showForm = false; }

  async save(transporter: Transporter) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.transporterService.save(transporter);
      if (res) {
        this.closeForm();
        this.fetchTransporters();
      }
    } catch (error) { } finally { this.loading.stop() };
  }

  async delete(transporter: Transporter) {
    let confirm = await MessageBox.confirm("Delete Transporter", `Are you sure you want to delete ${transporter.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.transporterService.delete(transporter.id);
      if (res) {
        this.closeForm();
        this.fetchTransporters();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.transporterForm = this.fb.group({
      id: 0,
      name: '',
      phoneNumber: '',
      address: ''
    })
  }

}
