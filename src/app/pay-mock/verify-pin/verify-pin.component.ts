import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {LoadingService} from "../loading.service";
import {MessageService} from "../message.service";
import {TranslateService} from "@ngx-translate/core";
import {VerifyPinChildComponent} from "../verify-pin-child/verify-pin-child.component";
import {StepRegisterRestore} from "../step-register-restore";
import {Step} from "../step";
import {firstValueFrom} from "rxjs";

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
    // if (!this.authService.user$.getValue().phone) {
    //   this.router.navigate(['pay-mock/register']).then()
    // }
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.pin = code
  }

  // this called only if user entered full code
  // onCodeCompleted(code: string) {
  //   this.pin = code
  // }

  async onVerifyPinContinue() {
    //todo: check pin code is correct here and navigate to checkout

    try {
      this.authService.user$.next({...this.authService.user$.getValue(), pin: this.pin})
      if (this.pinFails >= 5) {
        this.router.navigate(['pay-mock/register']).then()
      }
      this.loadingService.loading$.next(true)
      const loginResult = await firstValueFrom(this.authService.login())
      const step = loginResult.data?.step
      await firstValueFrom(this.authService.getCustomerInfo())
      this.loadingService.loading$.next(false)
      if (step === StepRegisterRestore.kycComplete || step === StepRegisterRestore.kycProcess) {
        this.router.navigate(['pay-mock/checkout']).then()
      }
      if (step === StepRegisterRestore.registerSuccess) {
        console.log('go to esign')
        this.authService.registerStep$.next(Step.customerEsignConfirm)
        this.router.navigate(['pay-mock/customer-esign-confirm']).then();
      }
    } catch (error: any) {
      console.log(error)
      this.loadingService.loading$.next(false)
      if (error.error?.countFail) {
        this.pinFails = error.error?.countFail
        this.pinChild.resetCode()
      }
    }
  }
}
