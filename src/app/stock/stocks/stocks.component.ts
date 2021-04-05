import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Outlet, OutletService } from 'app/services/outlet.service';
import { Stock, StockService } from 'app/services/stock.service';
import { LoadingMessages } from 'app/shared/config-keys';
import { MessageBox } from 'app/shared/message-helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, of } from 'rxjs';
import { StockFormComponent } from '../stock-form/stock-form.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stocks: Observable<Stock[]>;
  outlets: Observable<Outlet[]>;

  @BlockUI('loading') loading: NgBlockUI;
  @ViewChild('ngOutlet') public ngSelect: NgSelectComponent

  constructor(private modalService: NgbModal, private stockService: StockService, private outletService: OutletService) { }

  ngOnInit(): void {
    this.loadOutlets();
  }

  loadOutlets() {
    this.outlets = this.outletService.lookup();
  }

  async fetchRecords(outletId: number) {
    try {
      if (outletId == undefined || outletId == null) {
        this.stocks = of([]);
        return;
      } else {
        this.loading.start()
        let res = await this.stockService.getByOutlet(outletId)
        if (res) { this.stocks = res; }
      }
    } catch (error) { } finally { this.loading.stop() }
  }


  async openForm() {
    const modalRef = this.modalService.open(StockFormComponent,
      {
        backdrop: 'static',
        keyboard: true,
        size: 'lg',
        scrollable: true,
        windowClass: 'slideInUp'
      });
    // modalRef.componentInstance.visitId = this.consultation.visitId;
    let res = await modalRef.result;
    if (res == "Saved") {
      if (this.ngSelect.hasValue) {
        let outletId = (<any>this.ngSelect.selectedValues[0]).id;
        this.stocks = this.stockService.getByOutlet(outletId);
      }
    }
  }

  async delete(stock: Stock) {
    let confirm = await MessageBox.confirm("Delete Stock", `Are you sure you want to delete stock?`);
    if (!confirm.value) return;
    try {
      this.loading.start(LoadingMessages.Deleting);
      let res = await this.stockService.delete(stock.id);
      if (res) {
        this.stocks = this.stockService.getByOutlet(stock.outletId);
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

}
