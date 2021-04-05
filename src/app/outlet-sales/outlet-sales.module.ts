import { NgModule } from '@angular/core';

import { OutletSalesRoutingModule } from './outlet-sales-routing.module';
import { OutletSalesPageComponent } from './outlet-sales-page/outlet-sales-page.component';
import { OutletSalesComponent } from './outlet-sales/outlet-sales.component';
import { OutletSalesReversalComponent } from './outlet-sales-reversal/outlet-sales-reversal.component';
import { SharedModule } from 'app/shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [OutletSalesPageComponent, OutletSalesComponent, OutletSalesReversalComponent],
  imports: [
    SharedModule,
    TabsModule.forRoot(),
    OutletSalesRoutingModule
  ]
})
export class OutletSalesModule { }
