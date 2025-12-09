import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { environment } from '../environments/environment.development';

const AUTH_URL = `${environment.BACKEND_URL}/connexion`;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url === AUTH_URL) {
    return next(req);
  }

  const tokenString: string = localStorage.getItem('tokens') ?? '';

  // Pas de jeton dans localstorage => renvoie la requête dans l'état
  if (!tokenString) {
    return next(req);
  }
  
  let token: string = JSON.parse(tokenString).token

  // Jeton non expiré
  if (!authService.isExpired(token)) {
    const cloned = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    })
    console.log(cloned);
    
    return next(cloned)
  }
  return next(req);
};
