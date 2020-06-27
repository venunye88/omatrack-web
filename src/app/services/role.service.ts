import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from 'app/auth/auth.models';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }


  get() {
    return this.http.get<Role[]>(`${environment.baseApi}/profiles`)
  }

  getPrivilegs() {
    return this.http.get<string[]>(`${environment.baseApi}/admin/getprivileges`)
  }

  save(role: Role) {
    if (role.id) {
      return this.http.put<Role>(`${environment.baseApi}/profiles`, role).toPromise()
    } else {
      return this.http.post<Role>(`${environment.baseApi}/profiles`, role).toPromise()
    }
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${environment.baseApi}/profiles/${id}`).toPromise()
  }

}
