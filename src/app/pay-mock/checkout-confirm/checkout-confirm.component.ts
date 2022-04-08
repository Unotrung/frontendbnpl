import { Component, OnInit } from '@angular/core';
import {TenorService} from "../tenor.service";
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {LoadingService} from "../loading.service";
import {CheckoutService} from "../checkout.service";
import {MessageService} from "../message.service";
import {MessageReason} from "../message";
import {ItemService} from "../item.service";
import {TranslateService} from "@ngx-translate/core";

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
      private authService: AuthBnplService,
      private loadingService: LoadingService,
      private checkoutService: CheckoutService,
      private messageService: MessageService,
      public itemService: ItemService,
      private translate: TranslateService
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
        if (data['status']) {
          this.checkoutService.checkoutFinish$.next(true)
          this.router.navigate(['/pay-mock/checkout-finish']).then()
        }
        else {
          this.checkoutService.checkoutFinish$.next(false)
          this.messagePinNotExact()
        }
      },
      error: ({error}) => {
        console.log(error)
        this.loadingService.loading$.next(false)
        this.checkoutService.checkoutFinish$.next(false)
        this.messagePinNotExact()
        // this.router.navigate(['/pay-mock/checkout-finish']).then()
      },
      complete: () => {
      }
    })

    if (this.saveTenor) {
      this.authService.updateTenor().subscribe({
        next: data => {
          console.log(data)
        },
        error: err => {
          console.log(err)
        }
      })
    }

  }
  messagePinNotExact(){
    this.messageService.messageData$.next({
      reason: MessageReason.failOnLoginUsePinCode,
      messageTitle: this.translate.instant('message.announce'),
      message: this.translate.instant('pin.notExact'),
      closeMessage: this.translate.instant('button.back')
    })
    this.messageService.onOpenDialog()
  }

}
