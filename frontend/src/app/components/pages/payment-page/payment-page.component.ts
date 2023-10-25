import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent {
  order: Order = new Order();
  constructor(private orderService: OrderService,router:Router) {
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        //set the oredr of this C by the order coming from the S
        this.order = order;
      },
      error:()=>{
        router.navigateByUrl('/checkout')
      }
    });
  }
}
