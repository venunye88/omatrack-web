import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';
import { SettingPageComponent } from './setting-page/setting-page.component';
import { AccountGroupComponent } from './account-group/account-group.component';
import { AccountComponent } from './account/account.component';
// import { FuelProduct } from 'app/models/fuel-product.model';
// import { FuelProductComponent } from './fuel-product/fuel-product.component';
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


const routes: Routes = [
  {
    path: '',
    component: SettingPageComponent,
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: AppRouteNames.Outlet,
        component: OutletComponent
      },
      {
        path: AppRouteNames.Nozzle,
        component: NozzleComponent
      },
      {
        path: AppRouteNames.Product,
        component: ProductComponent
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
        path: AppRouteNames.ExpenseType,
        component: ExpenseTypeComponent
      },
      {
        path: AppRouteNames.Bank,
        component: BankComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
