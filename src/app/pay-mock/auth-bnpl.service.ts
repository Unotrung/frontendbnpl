import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {environment} from "../../environments/environment";
import {Step} from "./step";
import {CustomerInformationService} from "./customer-information.service";
import {ItemService} from "./item.service";
import {TenorService} from "./tenor.service";
import {Tenor} from "./tenor";
import {Apollo} from "apollo-angular";
import {subscriptionGraphql} from "../graphql/subscription.graphql";
import {RefreshTokenService} from "./refresh-token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthBnplService {
  user$: BehaviorSubject<User>;
  registerStep$: BehaviorSubject<Step>;

  isLoggedIn$: BehaviorSubject<boolean>;
  redirectUrl: string | null = null;
  httpError: HttpErrorResponse | undefined;
  constructor(
      private http: HttpClient,
      private customerInfoService: CustomerInformationService,
      public itemService: ItemService,
      private tenorService: TenorService,
      private refreshTokenService: RefreshTokenService,
      private apollo: Apollo
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.registerStep$ = new BehaviorSubject<number>(Step.register);
    this.user$ = new BehaviorSubject<User>({
      name: '',
      creditLimit: 0
    });
    apollo.subscribe({
      query: subscriptionGraphql.newUserEvent,
    }).subscribe({
      next : data => console.log(data)
    })
  }

  login(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/bnpl/user/login`;
    return this.http.post<any>(encodeURI(uri), {
      phone: this.user$.getValue().phone,
      pin: this.user$.getValue().pin
    }).pipe(tap((data) => {
      console.log(data)
      if (data && data['status']) {
        this.refreshTokenService.setAccessToken(data['token'])
        this.refreshTokenService.setRefreshToken(data['data']['refreshToken'])
        this.user$.next({...this.user$.getValue(), id: data['data']['_id']})
        this.isLoggedIn$.next(true);
      }
    }))
  }
  register(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/bnpl/personal/addInfoPersonal`;
    console.log({...this.customerInfoService.customerInfo$.getValue(), pin: this.user$.getValue().pin })
    return this.http.post<any>(encodeURI(uri), {...this.customerInfoService.customerInfo$.getValue(), pin: this.user$.getValue().pin }).pipe(tap((data) =>{
      console.log(data)
      if (data && data['status']) {
        this.isLoggedIn$.next(true)
        this.getInfoFromData(data)
      }
    }))
  }

  checkPossiblePhone(phone: string) {
    const uri = `${environment.localAPIServer}v1/bnpl/user/checkPhoneExists`
    return this.http.post<any>(encodeURI(uri), {phone});
  }

  checkNidPhoneMatch(nid: string){
    const uri = `${environment.localAPIServer}v1/bnpl/user/checkNidPhoneExists`
    return this.http.post<any>(encodeURI(uri), {
      phone: this.user$.getValue().phone,
      nid
    })
  }

  logout() {
    this.user$.next({
      name: '',
      creditLimit: 0
    });
    this.isLoggedIn$.next(false);
    // localStorage.removeItem('accessToken');
  }

  sendOTP(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/bnpl/user/sendOtp`
    return this.http.post<any>(encodeURI(uri), {
      phone: this.user$.getValue().phone
    })
  }
  verifyOTP(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/bnpl/user/verifyOtp`
    return this.http.post<any>(encodeURI(uri), {
      phone: this.user$.getValue().phone,
      otp: this.user$.getValue().otp
    })
  }

  updateCustomerInfo(): Observable<any>{
    const uri = `${environment.localAPIServer}v1/bnpl/personal/addInfoPersonal`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.refreshTokenService.accessToken$.getValue()}`
    })
    return this.http.post<any>(encodeURI(uri), {...this.customerInfoService.customerInfo$.getValue(), pin: this.user$.getValue().pin }, {headers}).pipe(tap((data) =>{
      console.log(data)
      // if(data['status']){
      //   this.itemService.items$.next(data['items'] as Item[])
      //
      //   console.log(this.itemService.items$.getValue())
      // }
      // this.user$.next({...this.user$.getValue(), name: this.customerInfoService.customerInfo$.getValue().name!})
      this.getInfoFromData(data)
    }))
  }
  getCustomerInfo(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/bnpl/personal/${this.user$.getValue().phone}`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.refreshTokenService.accessToken$.getValue()}`
    })
    // @ts-ignore
    return this.http.get<any>(encodeURI(uri), {headers}).pipe(tap((data) => {
      console.log(data)
      this.getInfoFromData(data)
      // this.user$.next({...this.user$.getValue(), name: data['name']})
    }))
  }

  sendOTPRequestResetPin(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/bnpl/user/sendOtpPin`
    return this.http.post<any>(encodeURI(uri), {
      "phone": this.user$.getValue().phone,
      "nid": this.user$.getValue().citizenId
    })
  }
  verifyOTPRequestPin(): Observable<any> {
    const uri = `${environment.localAPIServer}v1/bnpl/user/verifyOtpPin`
    return this.http.post<any>(encodeURI(uri), {
      "phone": this.user$.getValue().phone,
      "nid": this.user$.getValue().citizenId,
      "otp": this.user$.getValue().otp
    }).pipe(tap(data => {
      if (data && data['status']) {
        this.refreshTokenService.setAccessToken(data['token'])
        this.refreshTokenService.setRefreshToken(data['data']['refreshToken'])
      }
    }))
  }

  changePinCode():Observable<any> {
    const uri = `${environment.localAPIServer}v1/bnpl/user/resetPin`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.refreshTokenService.accessToken$.getValue()}`
    })
    return this.http.put<any>(encodeURI(uri), {
      "phone": this.user$.getValue().phone,
      "new_pin": this.user$.getValue().pin
    }, {headers}).pipe(tap(data => {

    }))
  }

  checkNidExist(nId: string) {
    const uri = `${environment.localAPIServer}v1/bnpl/user/checkNidExists`
    return this.http.post<any>(encodeURI(uri), {"nid": nId})
  }

  updateTenor() {
    const uri = `${environment.localAPIServer}v1/bnpl/personal/updateTenor`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.refreshTokenService.accessToken$.getValue()}`
    })
    return this.http.put<any>(encodeURI(uri), {
      "id": this.tenorService.selectedTenor$.getValue()?.tenorId,
      "phone": this.user$.getValue().phone
    }, {headers})
  }

  private getInfoFromData(data: any) {
    if (data['status']) {
      console.log('get info')
      this.user$.next({...this.user$.getValue(), name: data['data']['name'], creditLimit: +data['data']['credit_limit']})
      if (data['data']['tenor']) {
        const tenor: Tenor = {
          tenorId: data['data']['tenor']._id,
          convertFee: data['data']['tenor'].convertFee,
          paymentSchedule: data['data']['tenor'].paymentSchedule,
          enable: true
        }
        this.tenorService.selectedTenor$.next(tenor)
      }
      if (data['data']['items']) {
        let items : any = []
        data['data']['items'].forEach((item: any) => {
          if(item) {
            items.push({
              id: item._id,
              name: item.name,
              price: item.price,
              shipFee: item.shipFee,
              image: item.image,
              description: item.description
            })
          }
        })
        if (items.length >= 1) {
          this.itemService.updateItemList(items)
        }
      }
    }
  }
}
