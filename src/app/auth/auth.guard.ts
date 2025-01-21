import {Injectable} from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> => {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
