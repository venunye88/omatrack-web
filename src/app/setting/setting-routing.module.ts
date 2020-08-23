import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { AccountGroupComponent } from './account-group/account-group.component';
import { AccountComponent } from './account/account.component';
import { FuelProduct } from 'app/models/fuel-product.model';
import { FuelProductComponent } from './fuel-product/fuel-product.component';
import { RegionComponent } from './region/region.component';
import { FinancialYearComponent } from './financial-year/financial-year.component';
import { TaxComponent } from './tax/tax.component';
import { TransporterComponent } from './transporter/transporter.component';
import { CreditorComponent } from './creditor/creditor.component';
import { FuelPumpComponent } from './fuel-pump/fuel-pump.component';


const routes: Routes = [
  {
    path: '',
    component: SettingPageComponent,
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: AppRouteNames.AccountGroup,
        component: AccountGroupComponent
      },
      {
        path: AppRouteNames.Account,
        component: AccountComponent
      },
      {
        path: AppRouteNames.FuelProduct,
        component: FuelProductComponent
      },
      {
        path: AppRouteNames.Region,
        component: RegionComponent
      },
      {
        path: AppRouteNames.FinancialYear,
        component: FinancialYearComponent
      },
      {
        path: AppRouteNames.Tax,
        component: TaxComponent
      },
      {
        path: AppRouteNames.Transporter,
        component: TransporterComponent
      },
      {
        path: AppRouteNames.Creditor,
        component: CreditorComponent
      },
      {
        path: AppRouteNames.FuelPump,
        component: FuelPumpComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
