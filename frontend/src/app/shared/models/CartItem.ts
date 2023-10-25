import { Food } from "./food";

export class CartItem{
    /* This means that when you create a CartItem,
     you need to provide a Food object as input.*/
    constructor(public food:Food){ }
    quantity:number=1;
    price:number=this.food.price;
}