import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //an array that will store food items
  foods: Food[] = [];
  
  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute
  ) {
    let foodObservable:Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      //u can replace ['searchTerm'] by .searchTerm if u go to tsconfig and put indexsignature to false
      if(params.searchTerm){
        foodObservable=this.foodService.getAllFoodsBySearchterm(params.searchTerm)
      }
      else if(params.tag){
        foodObservable=this.foodService.getAllFoodByTag(params.tag)
      }
      else 
      foodObservable = foodService.getAll();

      foodObservable.subscribe((serverFood)=>this.foods=serverFood)
    });
  
  }

  
}
