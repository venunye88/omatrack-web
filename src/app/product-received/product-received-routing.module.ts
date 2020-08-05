import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';
import { ProductReceivedPageComponent } from './product-received-page/product-received-page.component';
import { ProductReceivedReversalComponent } from './product-received-reversal/product-received-reversal.component';
import { ProductReceivedComponent } from './product-received/product-received.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: AppRouteNames.Transaction,
    pathMatch: 'full'
  },
  {
    path: '',
    component: ProductReceivedPageComponent,
    data: {
      title: 'Product Received'
    },
    children: [
      {
        path: AppRouteNames.Transaction,
        component: ProductReceivedComponent
      },
      {
        path: AppRouteNames.Reversal,
        component: ProductReceivedReversalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReceivedRoutingModule { }
