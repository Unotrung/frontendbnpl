import { Component, OnInit } from '@angular/core';
import {TenorService} from "../tenor.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {LoadingService} from "../loading.service";
import {CheckoutService} from "../checkout.service";

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.scss']
})
export class CheckoutConfirmComponent implements OnInit {
  pinCode: string = ''
  saveTenor: Boolean = false
  constructor(
      public tenorService: TenorService,
      private router: Router,
      private authService: AuthService,
      private loadingService: LoadingService,
      private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
  }
  onPinCodeChange(event: string) {
    this.pinCode = event
  }

  onCheckoutConfirm(){
    this.loadingService.loading$.next(true)
    this.authService.user$.next({...this.authService.user$.getValue(), pin: this.pinCode})
    this.authService.login().subscribe({
      next: data => {
        console.log(data)
        //todo: api call for payment, also check save tenor of not
        this.loadingService.loading$.next(false)
        this.checkoutService.checkoutFinish$.next(true)
        this.router.navigate(['/pay-mock/checkout-finish']).then()
      },
      error: ({error}) => {
        console.log(error)
        this.loadingService.loading$.next(false)
        this.checkoutService.checkoutFinish$.next(false)
        this.router.navigate(['/pay-mock/checkout-finish']).then()
      }
    })
  }

}
