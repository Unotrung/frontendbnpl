import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {RefreshTokenService} from "./refresh-token.service";

@Injectable()
export class RequestHandlerInterceptor implements HttpInterceptor {

    constructor(
        private refreshTokenService: RefreshTokenService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log(request)
        return next.handle(request)
            .pipe(
                catchError(error => {
                    console.log(request)
                    if (error instanceof HttpErrorResponse
                        && !request.url.includes('user/login')
                        && request.headers.has('authorization')
                        && error.status === 403) {
                        return this.handle403Error(request, next)
                    } else {
                        console.log('throw error')
                        return throwError(error)
                    }
                }))
    }

    private handle403Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.refreshTokenService.getRefreshToken().pipe(
            switchMap(data => {
                const {accessToken} = data
                const newRequest = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${accessToken}`,
                        appKey:  'WOLFCONSULTING113911',
                        appId:  '998877665544332211'
                    }
                })
                return next.handle(newRequest)
            })
        )
    }
}
