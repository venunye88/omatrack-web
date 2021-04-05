import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Outlet, OutletService } from 'app/services/outlet.service';
import { Stock, StockService } from 'app/services/stock.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  stockForm: FormGroup;
  stocks: Observable<Stock[]>;
  outlets: Observable<Outlet[]>;

  @BlockUI("main") loading: NgBlockUI;

  @ViewChild('ngProduct') ngProduct: NgSelectComponent;

  constructor(private fb: FormBuilder, private stockService: StockService, private outletService: OutletService) { }

  ngOnInit(): void {
    this.setupForm();
    this.loadOutlets();
  }

  loadOutlets() {
    this.outlets = this.outletService.lookup();
  }

  onSelectedOutlet(event) {
    if (event == undefined || event == null) {
      this.stocks = of([]);
      this.ngProduct.handleClearClick();
      this.clearTextFields();
      return
    } else {
      try {
        if (this.ngProduct.hasValue) {
          this.ngProduct.handleClearClick();
          this.clearTextFields();
        }
        this.loading.start();
        this.stocks = this.stockService.getByOutlet(event.id)
      }
      catch (err) { } finally { this.loading.stop(); }
    }
  }

  onSelectedProduct(stock: Stock) {
    if (stock == null || stock == undefined) {
      this.clearTextFields();
      return;
    } else {
      this.stockForm.patchValue({
        id: stock.id,
        productId: stock.productId
      });
    }
  }

  clearTextFields() {
    this.stockForm.patchValue({
      id: 0,
      productId: null,
      currentStock: null
    });
  }


  async update(stock: any) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.stockService.save(stock);
      if (res) {
        this.clearForm();
      }
    } catch (error) { } finally { this.loading.stop() };
  }

  clearForm() {
    this.stockForm.reset();
  }

  private setupForm() {
    this.stockForm = this.fb.group({
      id: 0,
      outletId: null,
      productId: null,
      currentStock: null,
      isAdjustment: false
    });
  }



}
