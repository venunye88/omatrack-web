import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';
import { OutletSalesComponent } from './outlet-sales/outlet-sales.component';
import { OutletSalesReversalComponent } from './outlet-sales-reversal/outlet-sales-reversal.component';
import { OutletSalesPageComponent } from './outlet-sales-page/outlet-sales-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: AppRouteNames.Transaction,
    pathMatch: 'full'
  },
  {
    path: '',
    component: OutletSalesPageComponent,
    data: {
      title: 'Outlet Sales'
    },
    children: [
      {
        path: AppRouteNames.Transaction,
        component: OutletSalesComponent
      },
      {
        path: AppRouteNames.Reversal,
        component: OutletSalesReversalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletSalesRoutingModule { }
