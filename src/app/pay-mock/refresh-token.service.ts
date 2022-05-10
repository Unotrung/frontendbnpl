import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RefreshTokenService {

    private httpClient: HttpClient
    refreshToken$: BehaviorSubject<string>
    accessToken$: BehaviorSubject<string>

    constructor(
        httpBackend: HttpBackend
    ) {
        this.refreshToken$ = new BehaviorSubject<string>('')
        this.accessToken$ = new BehaviorSubject<string>('')
        this.httpClient = new HttpClient(httpBackend)
    }

    setAccessToken(token: string) {
        this.accessToken$.next(token)
    }

    setRefreshToken(token: string) {
        this.refreshToken$.next(token)
    }

    getRefreshToken(): Observable<any> {
        const uri = `${environment.localAPIServer}v1/bnpl/user/requestRefreshToken`
        const refreshToken = this.refreshToken$.getValue()
        return this.httpClient.put<any>(encodeURI(uri), {
            refreshToken
        }).pipe(
            tap(data => {
                const {accessToken, refreshToken} = data
                this.setRefreshToken(refreshToken)
                this.setAccessToken(accessToken)
            })
        )
    }
}
