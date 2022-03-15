import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {LoadingService} from "../loading.service";

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss']
})
export class VerifyPinComponent implements OnInit {

  pin: string = '';

  constructor(
      private router: Router,
      private authService: AuthService,
      private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.pin = code
  }

  onForgotPin(){
    this.router.navigate(['pay-mock/forgot-pin-phone']).then();
  }

  onVerifyPinContinue() {
    //todo: check pin code is correct here and navigate to checkout
    this.authService.user$.next({...this.authService.user$.getValue(), pin: this.pin})
    this.loadingService.loading$.next(true)
    this.authService.login().subscribe({
      next: data => {
        console.log(data)
        this.loadingService.loading$.next(false)
        this.router.navigate(['pay-mock/checkout']).then()
      },
      error: ({error}) => {
        console.log(error)
        this.loadingService.loading$.next(false)
      }
    })

  }
}
