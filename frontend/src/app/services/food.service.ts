import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
  FOOD_BY_ID_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  //u have to know that http won't send raw data as our type, instead it will send and obs
  constructor(private http: HttpClient) {}

  //get food from data.ts at the momement and returns food array
  getAll(): Observable<Food[]> {
    //u have to pass the return type from the url by : <Food[]>
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchterm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodByTag(tag: string): Observable<Food[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }
  /*?? is the nullish coalescing operator. It's used here to provide
 a default value in case the .find() function doesn't find a matching Food object*/
  // it returns a new empty Food object as a default value.
  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
}
