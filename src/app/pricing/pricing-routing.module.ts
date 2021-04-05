import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames, Privileges } from 'app/shared/config-keys';
import { PriceGroupComponent } from './price-group/price-group.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PriceGroupComponent,
    data: { title: 'Pricing', authorize: Privileges.PriceGroupRead },
    // children: [
    //   {
    //     path: `${AppRouteNames.PriceGroup}`,
    //     component: PriceGroupComponent,
    //     data: {
    //       title: 'Stock Addition', authorize: Privileges.PriceGroupCreate
    //     }
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule { }
