import { Component, OnInit } from '@angular/core';
import { FuelProduct } from 'app/models/fuel-product.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FuelProductService } from 'app/services/fuel-product.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';

@Component({
  selector: 'app-fuel-product',
  templateUrl: './fuel-product.component.html',
  styleUrls: ['./fuel-product.component.scss']
})
export class FuelProductComponent implements OnInit {
  fuelProducts: Observable<FuelProduct[]>;
  showForm: boolean;
  filterText: string = "";
  fpForm: FormGroup;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fpService: FuelProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchFuelProducts();
  }

  fetchFuelProducts() {
    this.fuelProducts = this.fpService.get();
  }


  openForm(fp?: FuelProduct) {
    this.fpForm.reset();
    this.showForm = true;
    if (fp != null) {
      this.fpForm.patchValue(fp);
    }
  }

  closeForm() { this.showForm = false; }

  async save(fp: FuelProduct) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.fpService.save(fp);
      if (res) {
        this.closeForm();
        this.fetchFuelProducts();
      }
    } catch (error) { } finally { this.loading.stop() };
  }


  async delete(fp: FuelProduct) {
    let confirm = await MessageBox.confirm("Delete Account Group", `Are you sure you want to delete ${fp.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.fpService.delete(fp.id);
      if (res) {
        this.closeForm();
        this.fetchFuelProducts();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.fpForm = this.fb.group({
      id: 0,
      name: '',
      description: ''
    })
  }

}
