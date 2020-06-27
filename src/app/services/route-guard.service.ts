import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { AppRouteNames } from 'app/shared/config-keys';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // let url: string = state.url;
    return this.checkLogin(route);
  }

  checkLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      let permissionToView = route.data.authorize
      if (permissionToView) {
        if (this.authService.isAuthorize(permissionToView)) {
          return true
        } else {
          this.router.navigate([AppRouteNames.UnAuthorized])
          return false
        }
      } else {
        return true;
      }
    }

    this.router.navigate([AppRouteNames.Login]);
    return false;
  }

}
