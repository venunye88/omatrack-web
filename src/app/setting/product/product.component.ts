import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product, ProductService } from 'app/services/product.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]>;
  showForm: boolean;
  filterText: string = "";
  productForm: FormGroup;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private productService: ProductService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.setUpForm();
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = this.productService.get();
  }


  openForm(product?: Product) {
    this.productForm.reset();
    this.showForm = true;
    if (product != null) {
      this.productForm.patchValue(product);
    }
  }

  closeForm() { this.showForm = false; }

  async save(product: Product) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let res = await this.productService.save(product);
      if (res) {
        this.closeForm();
        this.fetchProducts();
      }
    } catch (error) { } finally { this.loading.stop() };
  }


  async delete(product: Product) {
    let confirm = await MessageBox.confirm("Delete Account Group", `Are you sure you want to delete ${product.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.productService.delete(product.id);
      if (res) {
        this.closeForm();
        this.fetchProducts();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  setUpForm() {
    this.productForm = this.fb.group({
      id: 0,
      name: '',
      description: ''
    })
  }

}
