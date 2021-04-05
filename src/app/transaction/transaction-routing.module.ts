import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,

    // children: [
    //   {
    //     path: `${AppRouteNames.TransactionDetail}/:id`,
    //     component: TransactionDetailComponent
    //   }
    // ]
  },
  {
    path: `${AppRouteNames.Detail}/:id`,
    component: TransactionDetailComponent,
    data: {
      title: 'Transaction Detail'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
