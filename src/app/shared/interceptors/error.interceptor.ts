import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../pages/auth/services/AuthenticationService';
import { ProgressBarService } from '../services/progress-bar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private progressBarService: ProgressBarService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.progressBarService.requestStarted();
        return this.handler(next, request);
    }
    handler(next: any, request: any) {
        return next.handle(request)
            .pipe(
                tap(
                    (event) => {
                        if (event instanceof HttpResponse) {
                            this.progressBarService.requestEnded();
                        }
                    },
                    (error: HttpErrorResponse) => {

                        this.progressBarService.resetProgressBar();

                        if (error.status === 401) {
                            if (this.router.routerState.snapshot.url.includes("home/cloudbytes")) {
                                this.router.navigateByUrl('/home/cloudbytes/unauthorized-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/mindspark")) {
                                this.router.navigateByUrl('/home/mindspark/unauthorized-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/knowledgestand")) {
                                this.router.navigateByUrl('/home/knowledgestand/unauthorized-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/finpro")) {
                                this.router.navigateByUrl('/home/finpro/unauthorized-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/bigleads")) {
                                this.router.navigateByUrl('/home/bigleads/unauthorized-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/digitalfingers")) {
                                this.router.navigateByUrl('/home/digitalfingers/unauthorized-access');
                            }
                        }
                        else if (error.status === 403) {
                            if (this.router.routerState.snapshot.url.includes("home/cloudbytes")) {
                                this.router.navigateByUrl('/home/cloudbytes/forbidden-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/mindspark")) {
                                this.router.navigateByUrl('/home/mindspark/forbidden-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/knowledgestand")) {
                                this.router.navigateByUrl('/home/knowledgestand/forbidden-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/finpro")) {
                                this.router.navigateByUrl('/home/finpro/forbidden-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/bigleads")) {
                                this.router.navigateByUrl('/home/bigleads/forbidden-access');
                            } else if (this.router.routerState.snapshot.url.includes("home/digitalfingers")) {
                                this.router.navigateByUrl('/home/digitalfingers/forbidden-access');
                            }
                        }

                        const errorMessage = error.error.message || error.statusText;
                        console.log('ErrorInterceptor: -> ' + JSON.stringify(errorMessage));
                        return throwError(" --> " + errorMessage);
                    }
                ),
            );
    }
}