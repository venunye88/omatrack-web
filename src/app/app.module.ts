import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BlankTemplateComponent } from "./template/blank-template.component";
import { LeftNavTemplateComponent } from "./template/left-nav-template.component";
import { AppRoutingModule, routes } from "./app.routing";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
// import { HeaderComponent } from "./shared/header/header.component";
import { NavigationComponent } from "./shared-old/navigation/navigation.component";
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout.component';
import { HeaderComponent } from './layouts/header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NavDropdownToggleDirective } from './directives/nav-dropdown-toggle.directive';
// import { AccordionModule } from 'ngx-bootstrap/accordion';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { LocationStrategy, HashLocationStrategy, CommonModule, PathLocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    AppComponent,
    BlankTemplateComponent,
    PageNotFoundComponent,
    LeftNavTemplateComponent,
    NavigationComponent,
    HeaderComponent,
    SidebarComponent,
    AdminLayoutComponent,
    BlankLayoutComponent,
    NavDropdownToggleDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    // TabsModule.forRoot(),
    AppRoutingModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
