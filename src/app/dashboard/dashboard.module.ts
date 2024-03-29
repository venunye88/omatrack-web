import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import { BarChartComponent } from '../shared-old/bar-chart/bar-chart.component';
import { LineChartComponent } from '../shared-old/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule, DashboardRoutingModule, ChartsModule
  ],
  declarations: [DashboardComponent, BarChartComponent, LineChartComponent],
  providers: [
    BarChartComponent, LineChartComponent
  ]
})
export class DashboardModule { }
