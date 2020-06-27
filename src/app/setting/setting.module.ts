import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { AccountGroupComponent } from './account-group/account-group.component';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [AccountGroupComponent, AccountComponent],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
