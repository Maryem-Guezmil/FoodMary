import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  //to get authentic status of user
  const userService = inject(UserService);
  //to redirect the page
  const router = inject(Router);

  if (userService.CurrentUser.token) return true;
  //state url have the url of C that needs to be activated
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
