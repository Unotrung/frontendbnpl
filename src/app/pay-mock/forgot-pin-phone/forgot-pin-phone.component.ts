import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
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
      private authService: AuthService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.phoneForm = new FormControl(this.authService.user$.getValue().phone,
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
