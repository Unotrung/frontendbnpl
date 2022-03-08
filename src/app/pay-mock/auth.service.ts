import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<any>;
  registerStep$: BehaviorSubject<number>;

  isLoggedIn$: BehaviorSubject<boolean>;
  redirectUrl: string | null = null;
  httpError: HttpErrorResponse | undefined;
  constructor() {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.registerStep$ = new BehaviorSubject<number>(0);
    this.user$ = new BehaviorSubject<any>(null);
  }
}
