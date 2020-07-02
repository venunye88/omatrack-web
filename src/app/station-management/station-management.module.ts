import { NgModule } from '@angular/core';
import { StationManagementRoutingModule } from './station-management-routing.module';
import { StationsComponent } from './stations/stations.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [StationsComponent],
  imports: [
    SharedModule,
    StationManagementRoutingModule
  ]
})
export class StationManagementModule { }
