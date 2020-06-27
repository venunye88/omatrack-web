import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Pipe({
  name: 'imageLoad'
})
export class ImageLoadPipe implements PipeTransform {

  constructor(private http: HttpClient) { }

  transform(url: any, args?: any): any {
    return new Observable<string>((observer) => {
      observer.next('/assets/images/loading.gif');
      const { next, error } = observer;

      if (url) {
        this.http.get(`${environment.baseApi}/images?file=${url}`, { responseType: 'blob' }).subscribe(response => {
          const reader = new FileReader();
          reader.readAsDataURL(response);
          reader.onloadend = function () {
            observer.next(<string>(reader.result));
          };
        });
      } else if (args) {
        observer.next(`/assets/images/${args}`);
      }

      return { unsubscribe() { } };
    });
  }

}
