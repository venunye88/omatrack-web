import { HttpInterceptor, HttpEvent, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { StoreKeys } from 'app/shared/config-keys';
import { flatten, values } from 'underscore';
import { tap } from 'rxjs/operators';
import { Toast } from 'app/shared/message-helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        const token: string = localStorage.getItem(StoreKeys.Token);
        let authReq = req.clone();
        if (token) {
            authReq = req.clone({ setHeaders: { Authorization: `Bearer ${atob(token)}` } });
        }

        return next.handle(authReq).pipe(
            tap((response: HttpResponse<any>) => {
                switch (response.status) {
                    case 201: //created
                        Toast.success("Data saved successfully.");
                        break;
                    case 200: //success
                        switch (req.method) {
                            case 'PUT':
                                Toast.success("Data updated successfully.");
                                break;
                            case 'DELETE':
                                Toast.success("Data deleted successfully.");
                                break;
                            default:
                                Toast.clear();
                        }
                    default:
                        break;
                }
                if (response.status === 200 && req.method != 'GET' && !response.url.endsWith('query')) {
                    // console.log(response)
                    // Toast.success(response.body.success);
                }
            }, err => {
                switch (err.status) {
                    case 401: //Unauthorized
                        const isLogin = this.authService.isLoggedIn();
                        if (isLogin) {
                            setTimeout(() => {
                                Toast.error("Session expired. Please login");
                                this.authService.logout();
                                location.reload();
                            }, 400);
                        } else {
                            Toast.error(err.error);
                        }
                        break;
                    case 403: //Forbiden
                        Toast.error("You are not authorized to perform this action. Contact your administrator.");
                        break;
                    case 400: //Bad Request
                        Toast.error(this.refactorError(err));
                        break;
                    case 404:
                        Toast.error("Resource doesn't exist.");
                        break;
                    case 500: //Internal Server Error
                        Toast.error(err.error);
                        break;
                    default:
                        Toast.error(err.statusText);
                        break;
                }
            })
        )


    }

    private refactorError(err: any): string {
        if (err.error) {
            if (err.error.errors) {
                let errors: string[] = flatten(values(err.error.errors))
                return errors.join('\n')
            } else {
                return err.error;
            }
        }
        else if (err.message) return err.message;
    }

}