import {Component, OnInit} from '@angular/core';
import {ValidatorService} from "../validator.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Step} from "../step";

@Component({
  selector: 'app-customer-pin-install',
  templateUrl: './customer-pin-install.component.html',
  styleUrls: ['./customer-pin-install.component.scss']
})
export class CustomerPinInstallComponent implements OnInit {

  pinCode = '';
  verifyPinCode = '';
  constructor(
      private validatorService: ValidatorService,
      private router: Router,
      private authService: AuthService
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
    // this.authService.user$.next({...this.authService.user$.getValue(), password: this.pinCode.toString()})
    this.authService.register(this.pinCode.toString()).subscribe(data => console.log(data))
    this.authService.registerStep$.next(Step.customerEsignConfirm)
    this.router.navigate(['pay-mock/customer-esign-confirm']).then();
  }
}
