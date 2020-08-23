import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { AccountGroupComponent } from './account-group/account-group.component';
import { AccountComponent } from './account/account.component';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { SharedModule } from 'app/shared/shared.module';
import { FuelProductComponent } from './fuel-product/fuel-product.component';
import { RegionComponent } from './region/region.component';
import { FinancialYearComponent } from './financial-year/financial-year.component';
import { TaxComponent } from './tax/tax.component';
import { TransporterComponent } from './transporter/transporter.component';
import { CreditorComponent } from './creditor/creditor.component';


@NgModule({
  declarations: [AccountGroupComponent, AccountComponent, SettingPageComponent, FuelProductComponent, RegionComponent, FinancialYearComponent, TaxComponent, TransporterComponent, CreditorComponent],
  imports: [
    SharedModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
