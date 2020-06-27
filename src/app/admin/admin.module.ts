import { NgModule } from '@angular/core';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from 'app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [RoleComponent, UserComponent],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
