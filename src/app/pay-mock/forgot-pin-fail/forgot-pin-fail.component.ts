import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-pin-fail',
  templateUrl: './forgot-pin-fail.component.html',
  styleUrls: ['./forgot-pin-fail.component.scss']
})
export class ForgotPinFailComponent implements OnInit {

  constructor(
      private router: Router
  ) { }

  ngOnInit(): void {
  }
  onPinIChangeFailContinue() {
    this.router.navigate(['/pay-mock/register']).then()
  }
}
