import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {environment} from "../../environments/environment";
import {Step} from "./step";
import {CustomerInformationService} from "./customer-information.service";

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
      private http: HttpClient,
      private customerInfoService: CustomerInformationService
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.registerStep$ = new BehaviorSubject<number>(Step.register);
    this.user$ = new BehaviorSubject<User>({
      name: 'Nguyen Van Thương',
      creditLimit: 40000000
    });
  }

  login(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/user/login`;
    return this.http.post<any>(encodeURI(uri), {
      phone: this.user$.getValue().phone,
      pin: this.user$.getValue().pin
    }).pipe(tap((data) => {
      console.log(data)
      if (data && data['status']) {
        this.user$.next({...this.user$.getValue(), accessToken: data['token'], id: data['data']['_id']})
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
        console.log(data)
        if (data && data['status']) {
          this.user$.next({...this.user$.getValue(), accessToken: data['token'], id: data['data']['_id'] })
          this.isLoggedIn$.next(true);
        }
      }))
  }

  checkPossiblePhone(phone: string) {
    const uri = `${environment.localAPIServer}v1/user/checkPhoneExists`
    return this.http.post<any>(encodeURI(uri), {phone});
  }

  logout() {
    this.user$.next({
      name: '',
      creditLimit: 0
    });
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

  updateCustomerInfo(): Observable<any>{
    const uri = `${environment.localAPIServer}v1/personal/register`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.user$.getValue().accessToken}`
    })
    return this.http.post<any>(encodeURI(uri), {...this.customerInfoService.customerInfo, user: this.user$.getValue().id }, {headers}).pipe(tap((data) =>{
      this.user$.next({...this.user$.getValue(), name: this.customerInfoService.customerInfo.name!})
    }))
  }
  getCustomerInfo(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/personal/${this.user$.getValue().id}`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.user$.getValue().accessToken}`
    })
    // @ts-ignore
    return this.http.get(encodeURI(uri), {headers}).pipe(tap(({data}) => {
      this.user$.next({...this.user$.getValue(), name: data['name']})
    }))
  }

  sendOTPRequestResetPin(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/user/sendOtpPin`
    return this.http.post<any>(encodeURI(uri), {
      "phone": this.user$.getValue().phone,
      "nid": this.user$.getValue().citizenId
    })
  }
  verifyOTPRequestPin(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/user/verifyOtpPin`
    return this.http.post<any>(encodeURI(uri), {
      "phone": this.user$.getValue().phone,
      "nid": this.user$.getValue().citizenId,
      "otp": this.user$.getValue().otp
    }).pipe(tap(data => {
      if (data && data['status']) {
        this.user$.next({...this.user$.getValue(), accessToken: data['token']})
      }
    }))
  }

  changePinCode():Observable<any> {
    const uri = `${environment.localAPIServer}v1/user/updatepin`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.user$.getValue().accessToken}`
    })
    return this.http.put<any>(encodeURI(uri), {
      "phone": this.user$.getValue().phone,
      "pin": this.user$.getValue().pin
    }, {headers}).pipe(tap(data => {

    }))
  }
}
