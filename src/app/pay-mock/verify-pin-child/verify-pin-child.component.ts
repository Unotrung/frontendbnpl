import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-verify-pin-child',
  templateUrl: './verify-pin-child.component.html',
  styleUrls: ['./verify-pin-child.component.scss']
})
export class VerifyPinChildComponent implements OnInit {

  @Output() pinCode = new EventEmitter<string>()
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.pinCode.emit(code)
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
