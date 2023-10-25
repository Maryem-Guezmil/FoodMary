import { AbstractControl } from '@angular/forms';
//a custom validator for password matching
export const PasswordMatchValidator = (
  passwordControlName: string,
  passwordconfirmationControlName: string
) => {
  //a function that gets a form
  const validator = (form: AbstractControl) => {
    //form.get to find control inside a form
    const passwordControl = form.get(passwordControlName);
    const passwordConfirmationControl = form.get(
      passwordconfirmationControlName
    );

    if (!passwordControl || !passwordConfirmationControl) return;

    if (passwordControl.value !== passwordConfirmationControl.value) {
      //define new erro
      passwordConfirmationControl.setErrors({ notMatch: true });
    } else {
      const errors = passwordConfirmationControl.errors;
      if (!errors) return;
      else {
        delete errors.notMatch;
        passwordConfirmationControl.setErrors(errors);
      }
    }
  };
  return validator;
};
