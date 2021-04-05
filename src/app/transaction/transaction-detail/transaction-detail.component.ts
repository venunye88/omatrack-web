import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Status, Transaction, TransactionService } from 'app/services/transaction.service';
import { AppRouteNames } from 'app/shared/config-keys';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { isNumber } from "underscore";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  transaction: Transaction;
  detailForm: FormGroup

  isTouched: boolean = false;

  @BlockUI('loading') loading: NgBlockUI;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private transactionService: TransactionService, private fb: FormBuilder) { }

  ngOnInit(): void {
    let id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) { this.getTransaction(id); }

    this.setupForm();
  }

  async getTransaction(id: number) {
    try {
      this.loading.start();
      // await this.transactionService.find(id).then(res => {
      //   this.transaction = res;
      //   this.openForm(res);
      // })

      this.transaction = await this.transactionService.find(id)
      this.openForm(this.transaction)
    } catch {
    } finally {
      this.loading.stop();
    }
  }

  // todo: fetch outlet creditors, products

  get pumpSales() {
    return this.detailForm.get("pumpSales") as FormArray
  }
  get productsReceived() {
    return this.detailForm.get("productsReceived") as FormArray
  }
  get expenses() {
    return this.detailForm.get("expenses") as FormArray
  }
  get creditSales() {
    return this.detailForm.get("creditSales") as FormArray
  }
  get creditPayments() {
    return this.detailForm.get("creditPayments") as FormArray
  }
  get stockOperations() {
    return this.detailForm.get("stockOperations") as FormArray
  }
  get dailyBankings() {
    return this.detailForm.get("dailyBankings") as FormArray
  }

  openForm(transaction) {
    if (transaction != null) {
      this.detailForm.patchValue(transaction)

      // pump sales
      if (transaction.pumpSales != null) {
        transaction.pumpSales.forEach(x => {
          this.pumpSales.push(this.fb.group({
            id: x.id,
            nozzleId: x.nozzleId,
            nozzleName: x.nozzleName,
            product: x.product,
            price: x.price,
            meterSales: x.meterSales,
            productId: x.productId,
            openingReading: x.openingReading,
            closingReading: x.closingReading
          }));
        });
      }

      //products received
      if (transaction.productsReceived != null) {
        transaction.productsReceived.forEach(x => {
          this.productsReceived.push(this.fb.group({
            id: x.id,
            productId: x.productId,
            product: x.product,
            price: x.price,
            quantity: x.quantity,
            value: x.value,
            shortage: x.shortage
          }));
        });
      }

      //expenses
      if (transaction.expenses != null) {
        transaction.expenses.forEach(x => {
          this.expenses.push(this.fb.group({
            id: x.id,
            expenseTypeId: x.expenseTypeId,
            expenseType: x.expenseType,
            authorisedBy: x.authorisedBy,
            receivedBy: x.receivedBy,
            value: x.value,
            narration: x.narration
          }));
        });
      }

      //credit sales
      if (transaction.creditSales != null) {
        transaction.creditSales.forEach(x => {
          this.creditSales.push(this.fb.group({
            id: x.id,
            creditorId: x.creditorId,
            product: x.product,
            productId: x.productId,
            quantity: x.quantity,
            price: x.price,
            value: x.value,
            approvedBy: x.approvedBy
          }));
        });
      }

      //credit payments
      if (transaction.creditPayments != null) {
        transaction.creditPayments.forEach(x => {
          this.creditPayments.push(this.fb.group({
            id: x.id,
            creditorId: x.creditorId,
            creditor: x.creditor,
            amount: x.amount,
            narration: x.narration
          }));
        });
      }

      //daily bankings
      if (transaction.dailyBankings != null) {
        transaction.dailyBankings.forEach(x => {
          this.dailyBankings.push(this.fb.group({
            id: x.id,
            bankId: x.bankId,
            amount: x.amount,
            narration: x.narration,
          }));
        });
      }

      // stock operations 
      if (transaction.stockOperations != null) {
        transaction.stockOperations.forEach(x => {
          this.stockOperations.push(this.fb.group({
            id: x.id,
            openingStock: x.openingStock,
            closingStock: x.closingStock,
            productId: x.productId,
            product: x.product,
            price: x.price
          }));
        });
      }

      // console.log(this.detailForm.value)
    }

  }

  return() {
    window.history.back();
  }

  remove(index, transaction) {
    switch (transaction) {
      case "pumpsale":
        this.transaction.pumpSales.splice(index, 1);
        this.isTouched = true;
        break;
      case "creditsale":
        this.transaction.creditSales.splice(index, 1);
        this.isTouched = true;
        break;
      case "creditpayment":
        this.transaction.creditPayments.splice(index, 1);
        this.isTouched = true;
        break;
      case "expenses":
        this.transaction.expenses.splice(index, 1);
        this.isTouched = true;
        break;
      case "productreceived":
        this.transaction.productsReceived.splice(index, 1);
        this.isTouched = true;
        break;
      case "stockoperation":
        this.transaction.stockOperations.splice(index, 1);
        this.isTouched = true;
        break;
      case "dailybanking":
        this.transaction.dailyBankings.splice(index, 1);
        this.isTouched = true;
        break;

      default:
        this.isTouched = false;
        break;
    }
  }

  save(transaction: Transaction, status) {
    if (status == 'approve') transaction.status = Status.Approved;
    else { transaction.status = Status.Correction }

    try {
      this.loading.start();
      var res = this.transactionService.save(transaction);
      if (res) {
        this.router.navigate([`${AppRouteNames.Transaction}`]);
      }
    } catch { } finally { this.loading.stop(); }
  }

  setupForm() {
    this.detailForm = this.fb.group({
      id: null,
      outletId: null,
      date: null,
      referenceNumber: '',
      outlet: '',
      status: null,
      pumpSales: this.fb.array([]),
      productsReceived: this.fb.array([]),
      expenses: this.fb.array([]),
      stockOperations: this.fb.array([]),
      creditSales: this.fb.array([]),
      creditPayments: this.fb.array([]),
      dailyBankings: this.fb.array([])
    })
  }


}
