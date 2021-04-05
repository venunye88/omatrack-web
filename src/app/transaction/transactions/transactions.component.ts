import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status, Transaction, TransactionService } from 'app/services/transaction.service';
import { AppRouteNames } from 'app/shared/config-keys';
import { WebUtils } from 'app/shared/web-utils';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Observable<Transaction[]>
  @BlockUI('loading') loading: NgBlockUI;

  filter = { Status: Status.Pending }

  constructor(private transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  async fetchTransactions() {
    try {
      this.loading.start();
      this.transactions = await this.transactionService.summaryQuery(this.filter);
    } catch { } finally { this.loading.stop(); }
  }

  detail(id) {
    this.router.navigate([`${AppRouteNames.Transaction}/${AppRouteNames.Detail}`, id])
  }

}
