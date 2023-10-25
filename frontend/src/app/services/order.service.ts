import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }
  //after creating this,in order to work u have to send access_token as header to server by httpInterceptor
  create(order:Order){
    return this.httpClient.post<Order>(ORDER_CREATE_URL,order)
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.httpClient.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL)
  }
  //bc we nedd order id which is string
  pay(order:Order):Observable<String>{
    return this.httpClient.post<String>(ORDER_PAY_URL,order)
  }
  trackOrderById(id:Number):Observable<Order>{
    return this.httpClient.get<Order>(ORDER_TRACK_URL +id)
  }
}

