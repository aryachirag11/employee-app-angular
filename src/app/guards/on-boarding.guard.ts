import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GlobalDataService } from '../global-data.service';
import { map, of, switchMap } from 'rxjs';

export const onBoardingGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const globalDataService = inject(GlobalDataService);
  const router = inject(Router);

  return authService.isLoggedIn.pipe(
    switchMap((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        alert('Please log in to continue');
        router.navigate(['/login']);
        return of(false);
      }
      return globalDataService.additionalInfo$.pipe(
        map((additionalInfo) => {
          if (!additionalInfo) {
            console.log('please add additional info');

            alert('Please finish your onboarding to continue');
            console.log('please add additional info');

            router.navigate(['/on-boarding']);
            return false;
          }
          return true;
        })
      );
    })
  );
};
