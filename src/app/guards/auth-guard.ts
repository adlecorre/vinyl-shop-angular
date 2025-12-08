import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user')
  const router = inject(Router)
  if (user) {
    return true;
  }
  return router.createUrlTree(['/connexion'])
};
