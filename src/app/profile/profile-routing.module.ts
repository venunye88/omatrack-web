import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames } from 'app/shared/config-keys';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: AppRouteNames.ProfileAccount,
    pathMatch: 'full'
  },
  {
    path: '',
    component: ProfilePageComponent,
    data: {
      title: 'Profile'
    },
    children: [
      {
        path: AppRouteNames.ProfileAccount,
        component: ProfileAccountComponent
      },
      {
        path: AppRouteNames.ChangePassword,
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
