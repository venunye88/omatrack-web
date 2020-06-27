import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { User } from 'app/auth/auth.models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getAccount() {
    return this.http.get<User>(`${environment.baseApi}/auth/userprofile`).toPromise();
  }

  updateAccount(user: User) {
    return this.http.put<User>(`${environment.baseApi}/auth/updateuserprofile`, user).toPromise();
  }

  changePassword(params: IChangePasswordParams) {
    return this.http.put<boolean>(`${environment.baseApi}/auth/changepassword`, params).toPromise()
  }

}

export interface IChangePasswordParams {
  currentPassword: string
  newPssword: string
  confirmPassword: string
}
