import { BlockGroup } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  //via this subjall classes that are using this loading service will be informed about state of the loading
  private isLoadingSubject = new BehaviorSubject<Boolean>(false);

  constructor() {}

  showLoading() {
    //whoever listening to this subj will be notified that loading is true
    this.isLoadingSubject.next(true);
  }
  hideLoading() {
    this.isLoadingSubject.next(false);
  }
  get isLoading(){
    return this.isLoadingSubject.asObservable()
  }
}
