import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Nozzle, NozzleService } from 'app/services/nozzle.service';
import { Outlet, OutletService } from 'app/services/outlet.service';
import { Product, ProductService } from 'app/services/product.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-nozzle',
  templateUrl: './nozzle.component.html',
  styleUrls: ['./nozzle.component.scss']
})
export class NozzleComponent implements OnInit {
  filter = { name: '', stationId: 0 };
  pageSize = 15;
  nozzleForm: FormGroup;
  outlets: Observable<Outlet[]>;
  selectedStation: Outlet;
  nozzles: Observable<Nozzle[]>;
  products: Observable<Product[]>;
  showForm: boolean;

  @BlockUI('loading') loading: NgBlockUI;
  @ViewChild('ngOutlet') public ngSelect: NgSelectComponent;

  constructor(private fb: FormBuilder, private nozzleService: NozzleService, private outletService: OutletService, private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchOutlets();
    this.fetchProducts();
    this.setUpForm();
  }

  async fetchOutlets() {
    this.outlets = this.outletService.lookup();
  }

  async fetchProducts() {
    this.products = this.productService.get();
  }

  async fetchRecords(outletId: number) {
    try {
      this.loading.start()
      let res = await this.nozzleService.getByOutlet(outletId)
      this.loading.stop()
      if (res) { this.nozzles = res; }
    } catch (error) { this.loading.stop(); }
  }

  loadNozzles(nozzleId: number) {
    if (!isNullOrUndefined(nozzleId)) {
      this.fetchRecords(nozzleId)

    } else {
      this.nozzles = of([]);
      this.closeForm();
    }
  }

  openForm(nozzle?: Nozzle) {
    this.nozzleForm.reset();
    this.showForm = true;
    if (nozzle != null) {
      this.nozzleForm.patchValue({
        id: nozzle.id,
        name: nozzle.name,
        outletId: nozzle.outletId,
        productId: nozzle.productId,
        initialReading: nozzle.initialReading
      })
    }
  }

  closeForm() {
    this.ngSelect.handleClearClick();
    this.showForm = false;
  }

  async save(nozzle: Nozzle) {
    try {
      this.loading.start(LoadingMessages.Saving)
      let res = await this.nozzleService.save(nozzle);
      if (res) {
        this.ngSelect.handleClearClick();
        this.nozzleForm.reset();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  async delete(nozzle: Nozzle) {
    let confirm = await MessageBox.confirm("Delete Nozzle", `Are you sure you want to delete ${nozzle.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.nozzleService.delete(nozzle.id);
      if (res) {
        this.closeForm();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  private setUpForm() {
    this.nozzleForm = this.fb.group({
      id: 0,
      name: '',
      outletId: null,
      productId: null,
      // address: '',
      initialReading: null
    });
  }

}
