import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftNavTemplateComponent } from './template/left-nav-template.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { AppRouteNames, Privileges } from './shared/config-keys';
import { RouteGuard } from './services/route-guard.service';
import { BlankLayoutComponent } from './layouts/blank-layout.component';
import { UnauthorizedPageComponent } from './shared/unauthorized-page.component';

export const routes: Routes = [{
  path: '',
  redirectTo: AppRouteNames.Dashboard,
  pathMatch: 'full'
}, {
  path: '',
  // component: LeftNavTemplateComponent,
  component: AdminLayoutComponent,
  canActivate: [RouteGuard],
  data: {
    title: 'Omatrack'
  },
  children: [
    {
      path: AppRouteNames.UnAuthorized,
      component: UnauthorizedPageComponent
    },
    {
      path: AppRouteNames.Dashboard,
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      data: {
        title: 'Dashboard',
        authorize: Privileges.Dashboard
      }
    },
    {
      path: AppRouteNames.Admin,
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      data: {
        title: 'Admin',
        authorize: Privileges.Administration
      }
    },
    {
      path: AppRouteNames.StationMgt,
      loadChildren: () => import('./station-management/station-management.module').then(m => m.StationManagementModule),
      data: {
        title: 'Station Management',
        // authorize: Privileges.StationMgt
      }
    },
    {
      path: AppRouteNames.Settings,
      loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
      data: {
        title: 'Setting',
        authorize: Privileges.Setting
      }
    },
    {
      path: AppRouteNames.ProductReceived,
      loadChildren: () => import('./product-received/product-received.module').then(m => m.ProductReceivedModule),
      data: { title: 'ProductReceived' }
    },
    {
      path: AppRouteNames.UserProfile,
      loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      data: { title: 'Profile' }
    },
    {
      path: 'ui-elements',
      loadChildren: () => import('./ui-elements/ui-elements.module').then(m => m.UiElementsModule),
      data: {
        title: 'UI Elements'
      },
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule),
      data: {
        title: 'Form Page'
      },
    }
  ]
}, {
  path: AppRouteNames.Login,
  component: BlankLayoutComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }
  ]
}, {
  path: 'tables',
  // component: LeftNavTemplateComponent,
  component: AdminLayoutComponent,
  data: {
    title: 'Tables'
  },
  children: [
    {
      path: '',
      loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    }
  ]
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
  // providers: [RouteGuard] // not necessary
})
export class AppRoutingModule {
}
