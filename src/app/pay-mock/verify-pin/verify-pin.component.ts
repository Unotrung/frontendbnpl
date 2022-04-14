import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {LoadingService} from "../loading.service";
import {MessageService} from "../message.service";
import {MessageReason} from "../message";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss']
})
export class VerifyPinComponent implements OnInit {

  pin: string = '';
  pinFails = 0

  constructor(
      private router: Router,
      private authService: AuthBnplService,
      private loadingService: LoadingService,
      private messageService: MessageService,
      private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.pin = code
  }

  // this called only if user entered full code
  // onCodeCompleted(code: string) {
  //   this.pin = code
  // }

  onVerifyPinContinue() {
    //todo: check pin code is correct here and navigate to checkout
    this.authService.user$.next({...this.authService.user$.getValue(), pin: this.pin})
    this.loadingService.loading$.next(true)
    this.authService.login().subscribe({
      next: data => {
        this.loadingService.loading$.next(false)
        if (!data['status']) {
          this.pinFails ++
          // this.openDialogFailPinCode()
        }
      },
      error: ({error}) => {
        this.loadingService.loading$.next(false)
        console.log(error)
        this.pinFails ++
        // this.openDialogFailPinCode()
      },
      complete: () => {

        if (this.authService.isLoggedIn$.getValue()) {
          this.loadingService.loading$.next(true)
          this.authService.getCustomerInfo().subscribe({
            next: data => {
              this.loadingService.loading$.next(false)
              console.log(data)
              if (data['status']) {
                this.router.navigate(['pay-mock/checkout']).then()
              } else {
              }
            },
            error: err => {
              this.loadingService.loading$.next(false)
            }
          })
        }
      }
    })

  }

  openDialogFailPinCode() {
    this.messageService.messageData$.next({
      reason: MessageReason.failOnLoginUsePinCode,
      messageTitle: this.translate.instant('message.announce'),
      message: this.translate.instant('pin.notExact'),
      closeMessage: this.translate.instant('button.back')
    })
    this.messageService.onOpenDialog()
  }
}
