import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

/* for each validator which text should be shown*/
const VALIDATORS_MESSAGES: any = {
  required: 'should not be empty',
  email: 'Email is not valid',
  minLength: 'Filed is too short',
  notMatch: 'Password and Confirm Password does not match',
};
//designed to handle the validation of form inputs
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss'],
})
export class InputValidationComponent implements OnChanges, OnInit {
  /*AbstractControl is the type of control e used inside the validation in the form
   like email etc so we can pass them inside the input here */
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorWhen: boolean = true;
  //will be filled based on the error keys inside the control
  errorMessages: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.checkvalidation();
  }
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkvalidation();
    });
    //when we enter sthg inside the input
    this.control.valueChanges.subscribe(() => {
      this.checkvalidation();
    });
  }

  checkvalidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }
    //this will be an array with ['required','email'] so we can map those keys
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
    
  }
}
