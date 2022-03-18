import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-forgot-pin-success',
  templateUrl: './forgot-pin-success.component.html',
  styleUrls: ['./forgot-pin-success.component.scss']
})
export class ForgotPinSuccessComponent implements OnInit {

  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onPinIChangeSuccessContinue() {
    this.authService.user$.next({...this.authService.user$.getValue(), pin: ''})
    this.router.navigate(['pay-mock/verify-pin']).then()
  }

}
