import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HTTP_STATUS_CODES } from '../models/http-status-codes.model';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let addHeader: HttpRequest<any>;
        if (req.url.includes('login') || req.url.includes('signup')) {
            addHeader = req.clone();
        } else {
            addHeader = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.getToken()}`
                }
            });
        }
        return next.handle(addHeader).pipe(
            catchError((error: HttpErrorResponse) => {
                const data = {
                    message: error.message ? error.message : error.error.message,
                    status: error.status
                };
                if (error.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
                    console.log('user not logged in; redirecting to /login');
                    this.authService.removeToken();
                    this.router.navigate(['/login']);
                }
                return throwError(data);
            })
        );
    }
}
