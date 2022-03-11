import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss']
})
export class VerifyPinComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
  }

  onForgotPin(){
    this.router.navigate(['pay-mock/forgot-pin-phone']).then();
  }

  onVerifyPinContinue() {
    //todo: check pin code is correct here and navigate to checkout

    this.router.navigate(['pay-mock/checkout']).then()
  }
}
