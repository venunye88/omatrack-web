import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Privileges, AppRouteNames } from 'app/shared/config-keys';
import { UserComponent } from 'app/admin/user/user.component';
import { RoleComponent } from 'app/admin/role/role.component';
import { StationsComponent } from './stations/stations.component';
import { PriceGroupComponent } from './price-group/price-group.component';


const routes: Routes = [
  {
    path: '',
    data: { title: 'Station Management', authorize: Privileges.Station },
    children: [
      {
        path: AppRouteNames.Station,
        component: StationsComponent,
        data: {
          title: 'Stations', authorize: Privileges.StationRead
        }
      },
      {
        path: AppRouteNames.PriceGroup,
        component: PriceGroupComponent,
        data: {
          title: 'Price Groups', authorize: Privileges.PriceGroupRead
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationManagementRoutingModule { }
