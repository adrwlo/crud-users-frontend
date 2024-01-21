import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delayWhen, finalize } from 'rxjs';

import { timer } from 'rxjs';
import { SpinnerService } from '../components/spinner/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(
    private spinnerService: SpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.spinnerService.setSpinnerVisible(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          // Add a delay of at least 2 seconds using the timer function
          timer(500).pipe(
            delayWhen(async () => this.spinnerService.setSpinnerVisible(false))
          ).subscribe();
        }
      })
    );
  }
}