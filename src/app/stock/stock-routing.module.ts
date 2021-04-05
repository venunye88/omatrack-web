import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames, Privileges } from 'app/shared/config-keys';
import { AddStockComponent } from './add-stock/add-stock.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';
import { StocksComponent } from './stocks/stocks.component';


const routes: Routes = [
  {
    path: '',
    data: { title: 'Station Management', authorize: Privileges.StockRead },
    children: [
      {
        path: `${AppRouteNames.Stocks}`,
        component: StocksComponent,
        data: {
          title: 'Station Form', authorize: Privileges.StockCreate
        }
      },
      {
        path: `${AppRouteNames.StockAdjustment}`,
        component: StockAdjustmentComponent,
        data: {
          title: 'Stock Addition', authorize: Privileges.StockUpdate
        }
      },
      {
        path: `${AppRouteNames.StockAdd}`,
        component: AddStockComponent,
        data: {
          title: 'Stock Addition', authorize: Privileges.StockUpdate
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
