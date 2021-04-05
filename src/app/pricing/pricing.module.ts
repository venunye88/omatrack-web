import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { PriceGroupComponent } from './price-group/price-group.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [PriceGroupComponent],
  imports: [
    SharedModule,
    PricingRoutingModule
  ]
})
export class PricingModule { }
