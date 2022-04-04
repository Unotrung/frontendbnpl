import { Component, OnInit } from '@angular/core';
import {AuthBnplService} from "../auth-bnpl.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-pin-phone',
  templateUrl: './forgot-pin-phone.component.html',
  styleUrls: ['./forgot-pin-phone.component.scss']
})
export class ForgotPinPhoneComponent implements OnInit {

  phoneForm!: FormControl

  constructor(
      private authService: AuthBnplService,
      private router: Router
      ) { }

  ngOnInit(): void {
      if (!this.authService.user$.getValue().phone) {
          this.router.navigate(['pay-mock/register']).then()
      }
    this.phoneForm = new FormControl({value: this.authService.user$.getValue().phone, disabled: true},
        [
            Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10), Validators.maxLength(10)
        ]
    )
  }

  onForgotPhoneContinue(){
    this.authService.user$.next({...this.authService.user$.getValue(), phone: this.phoneForm.value})
    this.router.navigate(['pay-mock/forgot-pin-card-id']).then()
  }

}
