import { NgModule } from '@angular/core';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [TransactionsComponent, TransactionDetailComponent],
  imports: [
    SharedModule,
    TransactionRoutingModule
  ]
})
export class TransactionModule { }
