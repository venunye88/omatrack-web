import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Privileges } from 'app/shared/config-keys';
import { ReportComponent } from './report/report.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';


const routes: Routes = [
  {
    path: '',
    data: { title: 'Report', authorize: Privileges.Report },
    component: ReportComponent,
    children: [
      {
        path: 'transactions',
        component: TransactionReportComponent,
      },

      // {
      //   path: 'roles',
      //   component: RoleComponent,
      //   data: { title: 'Configure Roles ', authorize: Privileges.Administration }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
