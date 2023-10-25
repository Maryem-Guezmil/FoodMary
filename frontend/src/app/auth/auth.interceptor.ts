import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user=this.userService.CurrentUser
    if(user.token){
      //clone req and change some fields
      request=request.clone({ 
        setHeaders:{
          access_token:user.token
        }
      })
    }
    //send req to server to authenticate us
    return next.handle(request);
  }
}
