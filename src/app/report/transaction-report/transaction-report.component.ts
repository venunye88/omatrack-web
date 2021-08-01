import { Component, OnInit } from '@angular/core';
import { ReportService } from 'app/services/report.service';
import { Toast } from 'app/shared/message-helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as fileSaver from 'file-saver';
import { OutletService } from 'app/services/outlet.service';
import { WebUtils } from 'app/shared/web-utils';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss']
})
export class TransactionReportComponent implements OnInit {
  today = WebUtils.getIsoDateString(new Date());
  filter: any = { output: '', outlet: null, startDate: this.today, endDate: this.today };
  outlets: any = [];



  pdfUrl: string;
  pdfData: any;

  @BlockUI("main") loading: NgBlockUI

  constructor(private reportService: ReportService, private outletService: OutletService) { }

  ngOnInit(): void {
    this.fetchOutlets();
  }

  async fetchOutlets() {
    this.outlets = await this.outletService.lookup().toPromise();
  }

  async runReport() {
    try {
      this.loading.start();
      // if (this.filter.outlet == null) { this.filter.outlet = ""; }
      const data = await this.reportService.fetchReport(this.filter, "transactions").toPromise();
      this.pdfUrl = `data:application/pdf;base64,${data}`;
    } catch (error) { } finally { this.loading.stop(); }
  }

  downloadReport(type: string) {
    try {
      this.loading.start();
      // let filter = this.generateQueryFilter();
      this.filter.output = type;
      this.reportService.fetchReport(this.filter, "transactions")
        .subscribe(response => {
          this.loading.stop();
          fileSaver.saveAs(response, `${"daily_transactions"}.${type}`);
        }), () => { this.loading.stop(); Toast.error('Error downloading the file'); },
        () => { Toast.success('File downloaded successfully'); }
    } catch (error) { this.loading.stop(); Toast.error(error); }
  }

}


// export interface ReportFilters{
//   name:string
//   label:string
//   component:
// }