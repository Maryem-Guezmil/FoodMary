import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  /*AbstractControl is the type of control e used inside the validation in the form
   like email etc so we can pass them inside the input here */
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorWhen: boolean = true;
  @Input()
  label!:string;
  @Input()
  type: 'text' | 'password' |'email' ='text';

  get formControl(){
   return  this.control as FormControl
  }
}
