import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StocksComponent } from './stocks/stocks.component';
import { SharedModule } from 'app/shared/shared.module';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';
import { AddStockComponent } from './add-stock/add-stock.component';


@NgModule({
  declarations: [StocksComponent, StockFormComponent, StockAdjustmentComponent, AddStockComponent],
  imports: [
    SharedModule,
    StockRoutingModule
  ]
})
export class StockModule { }
