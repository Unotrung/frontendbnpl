import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkoutFinish$ : BehaviorSubject<boolean>
  constructor() {
    this.checkoutFinish$ = new BehaviorSubject<boolean>(false)
  }
}
