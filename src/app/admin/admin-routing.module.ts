import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/auth/login/login.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { Privileges } from 'app/shared/config-keys';



const routes: Routes = [
  {
    path: '',
    data: { title: 'Manage Users', authorize: Privileges.Administration },
    children: [
      {
        path: 'users',
        component: UserComponent,
        data: {
          title: 'Manage Users', authorize: Privileges.Administration
        }
      },

      {
        path: 'roles',
        component: RoleComponent,
        data: { title: 'Configure Roles ', authorize: Privileges.Administration }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
