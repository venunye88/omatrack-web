import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreKeys } from 'app/shared/config-keys';
import { intersection } from 'underscore';
import { environment } from 'environments/environment';
import { isObject } from 'util';
import { User, LoginParams, LoginResponse, Role } from 'app/auth/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  loggedInSource = new Subject<boolean>();
  loggedIn$ = this.loggedInSource.asObservable();

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {
    let userStoreValue = localStorage.getItem(StoreKeys.CurrentUser);
    if (userStoreValue) this.currentUser = JSON.parse(localStorage.getItem(StoreKeys.CurrentUser));
  }

  login(credentials: LoginParams) {
    return this.http.post<LoginResponse>(`${environment.baseApi}/auth/login`, credentials).toPromise();
  }

  setUser(user: LoginResponse) {
    const userData = JSON.parse(atob(user.token.split('.')[1]));

    this.currentUser = <User>{
      username: user.username,
      name: userData.fullName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      picture: userData.picture,
      type: userData.type,
      station: userData.station,
      role: <Role>{
        name: userData.profile,
        privileges: (isObject(userData.roles)) ? userData.roles : [userData.roles]
      }
    };

    localStorage.setItem(StoreKeys.Token, btoa(user.token))
    localStorage.setItem(StoreKeys.CurrentUser, JSON.stringify(this.currentUser))
  }

  logout(): void {
    this.currentUser = null
    localStorage.removeItem(StoreKeys.CurrentUser)
    localStorage.removeItem(StoreKeys.Token)
  }

  announceLogin(isLoggedIn: boolean) {
    this.loggedInSource.next(isLoggedIn)
  }

  isLoggedIn() { return !!this.currentUser }

  isAuthorize(privilege: string) {
    if (!privilege) return true
    let privs = privilege.split("|")
    let res = intersection(this.currentUser.role.privileges, privs)
    return (res.length > 0)
  }


}
