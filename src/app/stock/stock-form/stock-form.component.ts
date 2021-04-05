import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Outlet, OutletService } from 'app/services/outlet.service';
import { Product, ProductService } from 'app/services/product.service';
import { StockService } from 'app/services/stock.service';
import { Toast } from 'app/shared/message-helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { pluck } from "underscore";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup;
  products: Observable<Product[]>;
  outlets: Observable<Outlet[]>;
  isDuplicates: boolean = false;
  tempArrayValue: any[] = [];

  // @Input() visitId: number;
  @BlockUI("main") loading: NgBlockUI

  constructor(public activeModal: NgbActiveModal, private productService: ProductService,
    private fb: FormBuilder, private stockService: StockService, private outletService: OutletService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.setupForm();
    this.loadProducts();
    this.loadOutlets();
  }

  loadProducts() {
    this.products = this.productService.get();
  }

  loadOutlets() {
    this.outlets = this.outletService.lookup();
  }

  get stocks() {
    return this.stockForm.get('stocks') as FormArray
  }

  onProductSelected(event) {
    if (event == undefined) return;
    if (this.tempArrayValue.some(x => x == event.id)) {
      this.isDuplicates = true;
    }
    else {
      this.tempArrayValue.push(event.id);
      this.isDuplicates = false;
    }
  }


  addStock() {
    if (!this.isDuplicates) {
      const stock = this.fb.group({
        productId: null,
        quantity: null,
        reorderLevel: null
      });
      this.stocks.push(stock);
      this.ref.detectChanges();
    }
    else {
      Toast.error("Product already selected");
    }
  }

  removeStock(index: number) {
    this.stocks.removeAt(index);
  }

  private setupForm() {
    this.stockForm = this.fb.group({
      outletId: null,
      stocks: this.fb.array([])
    });
    this.addStock();
  }

  validate(stocks) {
    var dupplicates = pluck(stocks, 'productId');
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
    return (findDuplicates(dupplicates).length > 0);
  }

  async save(stock: any) {
    let hasDuplicate = this.validate(stock.stocks);
    if (!hasDuplicate) {
      let success = await this.stockService.bulkSave(stock);
      if (success) this.activeModal.close('Saved');
    } else {
      Toast.error("There are duplicate products");
    }

  }

}
