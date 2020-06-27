import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationManagementRoutingModule } from './station-management-routing.module';
import { StationsComponent } from './stations/stations.component';


@NgModule({
  declarations: [StationsComponent],
  imports: [
    CommonModule,
    StationManagementRoutingModule
  ]
})
export class StationManagementModule { }
