import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [ProfilePageComponent, ChangePasswordComponent, ProfileAccountComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
