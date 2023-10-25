import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading2.service';
import { EventType } from '@angular/router';
//to handle multiple req that goes to the server
var pendingRequests = 0;
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
    this.loadingService.showLoading;
    pendingRequests = pendingRequests + 1;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      //use its output without changing its values
      tap({
        next: (httpEvent) => {
          //means req is finished
          if (httpEvent.type === HttpEventType.Response) {
            this.handleHideLoading();
          }
        },
        error: (_) => {
          this.handleHideLoading;
        },
      })
    );
  }
  handleHideLoading() {
    pendingRequests = pendingRequests - 1;
    if (pendingRequests === 0) {
      this.loadingService.hideLoading();
    }
  }
}
