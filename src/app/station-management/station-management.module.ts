import { NgModule } from '@angular/core';
import { StationManagementRoutingModule } from './station-management-routing.module';
import { StationsComponent } from './stations/stations.component';
import { SharedModule } from 'app/shared/shared.module';
import { PriceGroupComponent } from './price-group/price-group.component';


@NgModule({
  declarations: [StationsComponent, PriceGroupComponent],
  imports: [
    SharedModule,
    StationManagementRoutingModule
  ]
})
export class StationManagementModule { }
