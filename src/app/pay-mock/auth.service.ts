import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "./user";
import {environment} from "../../environments/environment";
import {Step} from "./step";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User>;
  registerStep$: BehaviorSubject<Step>;

  isLoggedIn$: BehaviorSubject<boolean>;
  redirectUrl: string | null = null;
  httpError: HttpErrorResponse | undefined;
  constructor(
      private http: HttpClient
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.registerStep$ = new BehaviorSubject<number>(Step.register);
    this.user$ = new BehaviorSubject<User>({});
  }

  login(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/auth/login`;
    return this.http.post<any>(encodeURI(uri), this.user$.getValue()).pipe(tap(({phone, accessToken}) => {
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        this.user$.next({phone, accessToken})
        this.isLoggedIn$.next(true);
      }
    }))
  }
  register(password: string): Observable<any> {
    const uri = `${environment.localAPIServer}v1/auth/register`;
      const rawData = {
        username: 'abc1234',
        email: 'demo123@yahoo.com',
        phone: this.user$.getValue().phone,
        password
      }
      return this.http.post<any>(encodeURI(uri), rawData).pipe(tap(({phone, accessToken}) => {
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          this.user$.next({phone, accessToken})
          this.isLoggedIn$.next(true);
        }
      }))
  }

  checkPossiblePhone(phone: string) {
    const uri = `${environment.localAPIServer}`
    return this.http.post<any>(encodeURI(uri), phone);
  }

  logout() {
    this.user$.next({});
    this.isLoggedIn$.next(false);
    localStorage.removeItem('accessToken');
  }
}
