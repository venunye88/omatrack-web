import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { PriceGroup, PriceList } from 'app/models/price-group.model';
import { PriceGroupService } from 'app/services/price-group.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageBox, Toast } from 'app/shared/message-helper';
import { LoadingMessages } from 'app/shared/config-keys';
import { findWhere, where, last, pluck } from "underscore";
import { WebUtils } from 'app/shared/web-utils';
import { isNullOrUndefined } from 'util';
import { Product, ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-price-group',
  templateUrl: './price-group.component.html',
  styleUrls: ['./price-group.component.scss']
})
export class PriceGroupComponent implements OnInit {
  pgForm: FormGroup;
  priceGroups: Observable<PriceGroup[]>;
  selectedGroup: PriceGroup;
  products: Observable<Product[]>;
  showForm: boolean;
  selectedGroupId: any;
  selectedFuel: Product;
  maxDate = WebUtils.getIsoDateString(new Date())

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder, private pgService: PriceGroupService, private productService: ProductService) { }

  ngOnInit(): void {
    this.setUpForm();
    this.fetchPriceGroups();
    this.fetchFuelProuducts();
  }

  async fetchPriceGroups() {
    this.priceGroups = await this.pgService.get();
  }

  async fetchFuelProuducts() {
    this.products = this.productService.get();
  }

  get priceLists() {
    return this.pgForm.get('priceLists') as FormArray
  }

  onFuelSelected(fuel) {
    if (!fuel) { this.selectedFuel = null; return; }

    const exist = where(this.priceLists.value, { productId: fuel.id });
    if (exist.length > 1) {
      this.selectedFuel = fuel;
      Toast.warning(`${fuel.name} already added.`);
    }
  }

  async addPriceList(isClicked: boolean) {
    if (isClicked) {
      if (this.selectedFuel != null) {
        Toast.error(`Found Duplicate ${this.selectedFuel.name}`);
        this.selectedFuel = null;
        return;
      }
      var fuel = <PriceList>last(this.priceLists.value);
      if (isNullOrUndefined(fuel?.productId) || fuel?.productId == 0
        || isNullOrUndefined(fuel?.unitPrice) || fuel?.unitPrice < 1 || isNullOrUndefined(fuel?.effectiveDate)) {
        Toast.warning(`Ensure fuel is selected, price is set and effective date is selected`);
        return;
      }
    }
    const price = this.fb.group({
      id: 0,
      productId: null,
      unitPrice: '',
      effectiveDate: null,
      isNew: false
    });

    this.priceLists.push(price)
  }

  removePrice(index: number) {
    this.priceLists.removeAt(index);
    this.selectedFuel = null;
  }

  async loadPriceList(id: number) {
    if (id) {
      var groups = await this.priceGroups.toPromise();
      this.selectedGroup = <PriceGroup>findWhere(groups, { id: id });
    }
    else {
      this.selectedGroup = null;
      this.selectedGroupId = null;
      this.closeForm();
    }
  }

  openForm(priceGroup?: PriceGroup) {
    this.pgForm.reset();
    if (this.priceLists.controls.length > 0) {
      this.priceLists.controls.splice(1);
    }
    this.showForm = true
    if (priceGroup != null) {
      this.pgForm.patchValue({
        id: priceGroup.id,
        name: priceGroup.name
      });
      this.priceLists.controls.splice(0);
      if (priceGroup.priceLists) {
        priceGroup.priceLists.forEach(price => {
          this.priceLists.push(this.fb.group({
            id: price.id,
            productId: price.productId,
            unitPrice: price.unitPrice,
            effectiveDate: WebUtils.getIsoDateString(price.effectiveDate),
            isNew: false
          }));
        });
      }
    }
  }


  closeForm() {
    if (this.priceLists.controls.length > 0) {
      this.priceLists.controls.splice(1);
    }
    this.showForm = false;
  }


  validate(priceList) {
    var fuelArr = pluck(priceList, 'productId');
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    var hasDuplicate = findDuplicates(fuelArr).length > 0;

    var hasFuel = where(priceList, { productId: null }).length > 0;
    var priceArr = where(priceList, { unitPrice: 0 || null }).length > 0;
    var setDate = where(priceList, { effectiveDate: null }).length > 0;

    if (hasFuel) { return "Fuel has not been selected for one or more price list"; }
    if (hasDuplicate) { return "Found duplicate product entries"; }
    if (priceArr) { return "Some prices have not been set"; }
    if (setDate) { return "Some dates have not been selected"; }
    return "";
  }

  async save(pg: PriceGroup) {
    var msg = this.validate(pg.priceLists);
    if (msg != "") { Toast.error(msg); return; }

    try {
      this.loading.start(LoadingMessages.Saving)
      let res = await this.pgService.save(pg);
      if (res) {
        this.closeForm();
        await this.fetchPriceGroups();
        this.loadPriceList(res);
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  async delete(priceGroup: PriceGroup) {
    let confirm = await MessageBox.confirm("Delete Price Group", `Are you sure you want to delete ${priceGroup.name}?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.pgService.delete(priceGroup.id);
      if (res) {
        this.closeForm();
        this.fetchPriceGroups();
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  private setUpForm() {
    this.pgForm = this.fb.group({
      id: 0,
      name: '',
      description: '',
      priceLists: this.fb.array([])
    });
    this.addPriceList(false);
  }



}
