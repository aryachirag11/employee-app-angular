import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn.pipe(
    map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        alert('Please log in to continue');
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
