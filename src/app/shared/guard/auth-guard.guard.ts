import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // This makes the service available application-wide
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {

  private currentUserSubject: BehaviorSubject<any>;

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(null as any);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUserJsonString = localStorage.getItem('currentUser') ?? "";
    if (currentUserJsonString) {
      const any = JSON.parse(currentUserJsonString);
      var currentDateTime = new Date();
      if (any
        && any.applicationUser.userName
        && new Date(any.tokenInfo.expiresIn) > currentDateTime) {
        return true;
      }
    }

    // Optional: Uncomment if logout is desired on expired token
    // this.authenticationService.logout();
    return this.router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}