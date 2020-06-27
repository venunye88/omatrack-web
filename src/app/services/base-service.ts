import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  constructor(public http: HttpClient, public model: string) { }

  get() {
    return this.http.get<T[]>(`${environment.baseApi}/${this.model}`);
  }

  find(id: number) {
    return this.http.get<T>(`${environment.baseApi}/${this.model}/find?id=${id}`).toPromise();
  }

  info(id: number) {
    return this.http.get<T>(`${environment.baseApi}/${this.model}/info?id=${id}`).toPromise();
  }

  query(filter: any) {
    return this.http.get<T[]>(`${environment.baseApi}/${this.model}/query?${this.getQueryString(filter)}`).toPromise();
  }

  save(record: T) {
    if ((<any>record).id) {
      return this.http.put<number>(`${environment.baseApi}/${this.model}`, record).toPromise()
    } else {
      return this.http.post<number>(`${environment.baseApi}/${this.model}`, record).toPromise()
    }
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${environment.baseApi}/${this.model}/${id}`).toPromise()
  }

  private getQueryString(filter: object) {
    let queryString = Object.keys(filter).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key])
    }).join('&');

    return queryString
  }

}
