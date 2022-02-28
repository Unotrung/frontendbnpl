import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import {ValidatorService} from "../validator.service";

@Component({
  selector: 'app-customer-pin-install',
  templateUrl: './customer-pin-install.component.html',
  styleUrls: ['./customer-pin-install.component.scss']
})
export class CustomerPinInstallComponent implements OnInit {

  pinCode = '';
  verifyPinCode = '';
  constructor(
      private validatorService: ValidatorService
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

  }
}
