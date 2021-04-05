import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { AccountGroupComponent } from './account-group/account-group.component';
import { AccountComponent } from './account/account.component';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { SharedModule } from 'app/shared/shared.module';
import { RegionComponent } from './region/region.component';
import { FinancialYearComponent } from './financial-year/financial-year.component';
import { TaxComponent } from './tax/tax.component';
import { TransporterComponent } from './transporter/transporter.component';
import { CreditorComponent } from './creditor/creditor.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { OutletComponent } from './outlet/outlet.component';
import { NozzleComponent } from './nozzle/nozzle.component';
import { ProductComponent } from './product/product.component';
import { BankComponent } from './bank/bank.component';


@NgModule({
  declarations: [SettingPageComponent, RegionComponent, FinancialYearComponent, TaxComponent, TransporterComponent, CreditorComponent, ExpenseTypeComponent, OutletComponent, NozzleComponent, ProductComponent, BankComponent],
  imports: [
    SharedModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
