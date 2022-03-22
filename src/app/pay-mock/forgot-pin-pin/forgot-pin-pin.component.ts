import { Component, OnInit } from '@angular/core';
import {ValidatorService} from "../validator.service";
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {LoadingService} from "../loading.service";
import {Step} from "../step";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-forgot-pin-pin',
  templateUrl: './forgot-pin-pin.component.html',
  styleUrls: ['./forgot-pin-pin.component.scss']
})
export class ForgotPinPinComponent implements OnInit {

  pinCode = '';
  verifyPinCode = '';
  constructor(
      private validatorService: ValidatorService,
      private router: Router,
      private authService: AuthBnplService,
      private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }

  // this called every time when user changed the code
  onPinCodeChanged(code: string) {
    this.pinCode = code;
  }

  // this called only if user entered full code
  onPinCodeCompleted(code: string) {

  }

  onVerifyPinCodeChange(code:string) {
    this.verifyPinCode = code;
  }

  onVerifyPinCodeComplete(code: string) {
    console.log(code)
  }

  onFinishPinInstall(){
    this.loadingService.loading$.next(true)
    this.authService.user$.next({...this.authService.user$.getValue(), pin: this.pinCode})
    this.authService.changePinCode().subscribe({
      next: data => {
        console.log(data)
        this.loadingService.loading$.next(false)
        if (data && data['status']) {
          this.router.navigate(['pay-mock/forgot-pin-success']).then()
        }
      },
      error: ({error}) => {
        this.loadingService.loading$.next(false)
        this.router.navigate(['pay-mock/forgot-pin-fail']).then()
        console.log(error)
      },
      complete: () => {
      }
    })

  }
}