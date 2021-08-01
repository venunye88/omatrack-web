import { NgModule } from '@angular/core';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { SharedModule } from 'app/shared/shared.module';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';

@NgModule({
  declarations: [ReportComponent, TransactionReportComponent],
  imports: [
    SharedModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
