import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/auth/auth.models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<User[]>(`${environment.baseApi}/admin/getusers`).toPromise()
  }

  find(id: number) {
    return this.http.get<User>(`${environment.baseApi}/admin/getuser?id=${id}`).toPromise()
  }

  save(user: User) {
    if (user.id) {
      return this.http.put<User>(`${environment.baseApi}/admin/updateuser`, user).toPromise()
    } else {
      return this.http.post<User>(`${environment.baseApi}/admin/createuser`, user).toPromise()
    }
  }

  delete(username: string) {
    return this.http.delete<boolean>(`${environment.baseApi}/admin/deleteuser?username=${username}`).toPromise()
  }

  search(term: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseApi}/admin/search?term=${term}`)
  }
}
