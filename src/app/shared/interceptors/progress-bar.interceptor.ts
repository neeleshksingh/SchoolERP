import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressBarService } from 'src/app/global/services/common/progress-bar.service';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {
    constructor(private progressBarService: ProgressBarService) {}
    

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.requestStarted();

    return next.handle(req).pipe(
      finalize(() => {
        this.progressBarService.requestEnded()})
    );
  }
}