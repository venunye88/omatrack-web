import { NgModule } from '@angular/core';
import { StationManagementRoutingModule } from './station-management-routing.module';
import { StationsComponent } from './stations/stations.component';
import { SharedModule } from 'app/shared/shared.module';
import { PriceGroupComponent } from '../pricing/price-group/price-group.component';
import { StationFormComponent } from './station-form/station-form.component';


@NgModule({
  declarations: [StationsComponent, StationFormComponent],
  imports: [
    SharedModule,
    StationManagementRoutingModule
  ]
})
export class StationManagementModule { }
