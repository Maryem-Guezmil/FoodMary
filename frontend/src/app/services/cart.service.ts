import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStoarge();
  //initial value houa this.cart
  /*. A BehaviorSubject is a special type of object used for handling and observing changes to values over time.
 In this case, it appears to be used to keep track of changes to the shopping cart (Cart).*/
  /*By using the private keyword we encapsulate 
 cartSubject so that it can’t be accessed from outside the service.*/
  /*This is a good practice otherwise other parts of our app 
 could erroneously use the Subject and trigger data emission, for example.*/
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {}
  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.food.id == food.id);
    if (cartItem) return;
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStoareg();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.setCartToLocalStoareg();

  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id == foodId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStoareg();

  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStoareg();

  }

  getCartObservable(): Observable<Cart> {
    /*To have the possibility to subscribe to cartSubject
     we define a public variable(supposed to have 1 afterreturn)
    that exposes the read-only Observable part of the Subject.*/
    return this.cartSubject.asObservable();
  }

  getCart():Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStoareg():void{
    //reuce will be called as many items we have
    this.cart.totalPrice=this.cart.items
    .reduce((prevSum,currentItem)=>prevSum+currentItem.price,0);
    this.cart.totalCount=this.cart.items
    .reduce((prevSum,currentItem)=>prevSum+currentItem.quantity,0);

    //convert the cart that is an object to string json
    const cartJson=JSON.stringify(this.cart);
    localStorage.setItem("Cart",cartJson)
    /*when we setting cart to LS t means we r changing cart -->
    anybody listening to cart obs should be notified*/
    this.cartSubject.next(this.cart);

  }

  private getCartFromLocalStoarge():Cart{
    const cartJson=localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : new Cart();
  }
}
