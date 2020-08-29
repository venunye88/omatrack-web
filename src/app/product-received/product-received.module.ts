import { NgModule } from '@angular/core';
import { ProductReceivedRoutingModule } from './product-received-routing.module';
import { ProductReceivedPageComponent } from './product-received-page/product-received-page.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProductReceivedComponent } from './product-received/product-received.component';
import { ProductReceivedReversalComponent } from './product-received-reversal/product-received-reversal.component';
import { FuelReceivedComponent } from './fuel-received/fuel-received.component';


@NgModule({
  declarations: [ProductReceivedPageComponent, ProductReceivedComponent, ProductReceivedReversalComponent, FuelReceivedComponent],
  imports: [
    SharedModule,
    ProductReceivedRoutingModule
  ]
})
export class ProductReceivedModule { }
