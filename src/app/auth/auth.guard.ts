import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
      if (this.auth.getToken()) {
        return true;
      }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
