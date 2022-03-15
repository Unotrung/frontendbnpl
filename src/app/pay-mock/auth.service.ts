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
    const uri = `${environment.localAPIServer}v1/user/login`;
    return this.http.post<any>(encodeURI(uri), {
      phone: this.user$.getValue().phone,
      pin: this.user$.getValue().pin
    }).pipe(tap((data) => {
      if (data && data['status']) {
        this.isLoggedIn$.next(true);
      }
    }))
  }
  register(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/user/register`;
      const rawData = {
        phone: this.user$.getValue().phone,
        pin: this.user$.getValue().pin
      }
      return this.http.post<any>(encodeURI(uri), rawData).pipe(tap((data) => {
        if (data && data['status']) {
          this.isLoggedIn$.next(true);
        }
      }))
  }

  checkPossiblePhone(phone: string) {
    const uri = `${environment.localAPIServer}v1/user/checkPhoneExists`
    return this.http.post<any>(encodeURI(uri), {phone});
  }

  logout() {
    this.user$.next({});
    this.isLoggedIn$.next(false);
    localStorage.removeItem('accessToken');
  }

  sendOTP(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/user/sendOtp`
    return this.http.post<any>(encodeURI(uri), {
      phone: this.user$.getValue().phone
    })
  }
  verifyOTP(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/user/verifyOtp`
    return this.http.post<any>(encodeURI(uri), {
      phone: this.user$.getValue().phone,
      otp: this.user$.getValue().otp
    })
  }
}
