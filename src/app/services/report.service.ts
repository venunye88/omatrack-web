import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  fetchReport(filter: any, path: string) {
    const url = `${environment.baseApi}/${path}/report?${this.getQueryString(filter)}`;
    if (filter.output) { return this.http.get(url, { responseType: 'blob' }); }
    else { return this.http.get<any>(url); }
  }

  download(filter: any, path: string) {
    filter.download = true;
    return this.http.get(`${environment.baseApi}/${path}?${this.getQueryString(filter)}`, { responseType: 'blob' });
  }

  protected getQueryString(filter: object) {
    let queryString = Object.keys(filter).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key])
    }).join('&');

    return queryString
  }
}



