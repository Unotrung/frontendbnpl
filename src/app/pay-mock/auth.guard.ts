import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanDeactivate,
    CanLoad, Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {max, Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url = state.url;
        console.log(url)
        let stepCheck = false;
        const maxStep = 7;
        for (let i = 0; i <= maxStep; i++) {
            if (url.indexOf(this.getUrlStep(i)) > -1) {
                stepCheck = true;
            }
        }
        console.log(stepCheck)

        return this.checkLogin(url, stepCheck);
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canLoad(route: Route): boolean | UrlTree {
        const url = `/${route.path}`;
        console.log(url);
        return this.checkLogin(url, false);
    }

    checkLogin(url: string, stepCheck: boolean): boolean | UrlTree {
        if (stepCheck) {
            if ((url.indexOf('picture-selfie') > -1) && (this.authService.registerStep$.getValue() >= 1)) {
                return true;
            } else if ((url.indexOf('citizen-card') > -1) && (this.authService.registerStep$.getValue() >= 2)) {
                return true;
            } else if ((url.indexOf('customer-information-register') > -1) && (this.authService.registerStep$.getValue() >= 3)) {
                return true;
            } else if ((url.indexOf('customer-confirm-info') > -1) && (this.authService.registerStep$.getValue() >= 4)) {
                return true;
            } else if ((url.indexOf('customer-pin-install') > -1) && (this.authService.registerStep$.getValue() >= 5)) {
                return true;
            } else if ((url.indexOf('customer-esign-confirm') > -1) && (this.authService.registerStep$.getValue() >= 6)) {
                return true;
            } else if ((url.indexOf('customer-information-process') > -1) && (this.authService.registerStep$.getValue() >= 7)) {
                return true;
            } else if ((url.indexOf('customer-information-finish') > -1) && (this.authService.registerStep$.getValue() >= 8)) {
                return true;
            } else {
                this.authService.redirectUrl = url;
                const urlRedirect = `/pay-mock/${this.getUrlStep(this.authService.registerStep$.getValue())}`
                return this.router.createUrlTree([urlRedirect]);
            }
        }

        if (this.authService.isLoggedIn$.getValue()) {
            return true;
        } else {
            this.authService.redirectUrl = url;
            return this.router.createUrlTree(['/pay-mock/register']);
        }
    }

    getUrlStep(step: number): string {
        let urlStep: string;
        switch (step) {
            case 0: {
                urlStep = 'register';
                break;
            }
            case 1: {
                urlStep = 'picture-selfie';
                break;
            }
            case 2: {
                urlStep = 'citizen-card';
                break;
            }
            case 3: {
                urlStep = 'customer-information-register';
                break;
            }
            case 4: {
                urlStep = 'customer-confirm-info';
                break;
            }
            case 5: {
                urlStep = 'customer-pin-install';
                break;
            }
            case 6: {
                urlStep = 'customer-esign-confirm';
                break;
            }
            case 7: {
                urlStep = 'customer-information-process';
                break;
            }
            case 8: {
                urlStep = 'customer-information-finish'
                break;
            }
            default : {
                urlStep = ''
                break;
            }
        }
        return urlStep;
    }

}
