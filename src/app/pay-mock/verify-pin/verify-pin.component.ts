import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {LoadingService} from "../loading.service";
import {MessageService} from "../message.service";
import {MessageReason} from "../message";
import {TranslateService} from "@ngx-translate/core";
import {VerifyPinChildComponent} from "../verify-pin-child/verify-pin-child.component";
import {StepRegisterRestore} from "../step-register-restore";
import {Step} from "../step";

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss']
})
export class VerifyPinComponent implements OnInit {

  @ViewChild(VerifyPinChildComponent) pinChild!: VerifyPinChildComponent

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
    if (!this.authService.user$.getValue().phone) {
      this.router.navigate(['pay-mock/register']).then()
    }
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
    if (this.pinFails >= 5) {
      this.router.navigate(['pay-mock/register']).then()
    }
    this.loadingService.loading$.next(true)
    this.authService.login().subscribe({
      next: data => {
        this.loadingService.loading$.next(false)
        if (!data['status']) {
          this.pinFails ++
          this.pinChild.resetCode()
          // this.openDialogFailPinCode()
        }
         // console.log(data['data']['step'])
        const step = data['data']['step']
        // if (data['data']['step'] === StepRegisterRestore.registerSuccess) {
        //   console.log('go to esign')
        //   this.authService.registerStep$.next(Step.customerEsignConfirm)
        //   this.router.navigate(['pay-mock/customer-esign-confirm']).then();
        // }
        // if (data['data']['step'] === StepRegisterRestore.kycComplete || data['data']['step'] === StepRegisterRestore.kycProcess) {
          this.loadingService.loading$.next(true)
          this.authService.getCustomerInfo().subscribe({
            next: data => {
              this.loadingService.loading$.next(false)
              // console.log(data)
              // console.log(step)
              if (data['status']) {
                if (step === StepRegisterRestore.kycComplete || step === StepRegisterRestore.kycProcess) {
                this.router.navigate(['pay-mock/checkout']).then()
                }
                if (step === StepRegisterRestore.registerSuccess) {
                  console.log('go to esign')
                  this.authService.registerStep$.next(Step.customerEsignConfirm)
                  this.router.navigate(['pay-mock/customer-esign-confirm']).then();
                }
              } else {
                // fail to get customerInfo -> go to register
                this.authService.registerStep$.next(Step.register)
                this.router.navigate(['pay-mock/register']).then()
              }
            },
            error: err => {
              this.loadingService.loading$.next(false)
            }
          })
        // }
      },
      error: ({error}) => {
        this.loadingService.loading$.next(false)
        console.log(error)
        this.pinFails ++
        this.pinChild.resetCode()
        // this.openDialogFailPinCode()
      },
      complete: () => {

        // if (this.authService.isLoggedIn$.getValue()) {
        //   this.loadingService.loading$.next(true)
        //   this.authService.getCustomerInfo().subscribe({
        //     next: data => {
        //       this.loadingService.loading$.next(false)
        //       console.log(data)
        //       if (data['status']) {
        //         // if (data['data']['step'] === StepRegisterRestore.kycComplete) {
        //             this.router.navigate(['pay-mock/checkout']).then()
        //         // }
        //
        //       } else {
        //         // fail to get customerInfo -> go to register
        //         this.authService.registerStep$.next(Step.register)
        //         this.router.navigate(['pay-mock/register']).then()
        //       }
        //     },
        //     error: err => {
        //       this.loadingService.loading$.next(false)
        //     }
        //   })
        // }
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
