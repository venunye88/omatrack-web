import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Privileges } from 'app/shared/config-keys';
import { UserComponent } from 'app/admin/user/user.component';
import { RoleComponent } from 'app/admin/role/role.component';
import { StationsComponent } from './stations/stations.component';


const routes: Routes = [
  {
    path: '',
    data: { title: 'Station Management', authorize: Privileges.Station },
    children: [
      {
        path: 'stations',
        component: StationsComponent,
        data: {
          title: 'Stations', authorize: Privileges.StationRead
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationManagementRoutingModule { }
