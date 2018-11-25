import { AuthenticationService } from './../shared/services/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }

        if (this.auth.getToken() != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.auth.getToken())
            });
            return next.handle(clonedreq)
                .do(
                    succ => { },
                    err => {
                        if (err.status === 401) {
                            this.auth.logout();
                            this.router.navigateByUrl('/login');
                        }
                    }
                );
        } else {
            this.router.navigateByUrl('/login');
        }
    }
}
