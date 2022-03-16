import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-not-enough-credit',
  templateUrl: './checkout-not-enough-credit.component.html',
  styleUrls: ['./checkout-not-enough-credit.component.scss']
})
export class CheckoutNotEnoughCreditComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onNotEnoughCreditConfirm() {
    this.router.navigate(['pay-mock/start-payment']).then()
  }

}
