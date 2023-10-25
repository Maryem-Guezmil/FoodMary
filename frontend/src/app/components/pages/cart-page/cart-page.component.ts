import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  //hold cart data that we want to use to show inside html
  cart!: Cart;
  constructor(private cartservice:CartService){
     //to update the cart each time we have new value
  this.cartservice.getCartObservable().subscribe((cart)=>{
    this.cart= cart;
  })
  }

  removeFromCart(cartItem:CartItem){
    this.cartservice.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartitem:CartItem,quantityInString:string){
    //convert qt of string into num
    const quantity=parseInt(quantityInString);
    this.cartservice.changeQuantity(cartitem.food.id,quantity);
  }
 
}
