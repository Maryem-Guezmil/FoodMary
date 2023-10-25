import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm='';
constructor(activatedRoute:ActivatedRoute, private router:Router){
  activatedRoute.params.subscribe((params) => {
    //u can replace ['searchTerm'] by .searchTerm if u go to tsconfig and put indexsignature to false
    if(params['searchTerm']){
      this.searchTerm=params['searchTerm']
    }})
}
search(term:string):void{
  if(term)
  this.router.navigateByUrl('/search/'+ term);


}
}
