import { Component, OnInit } from '@angular/core';
import {CheckoutService} from "../checkout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-finish',
  templateUrl: './checkout-finish.component.html',
  styleUrls: ['./checkout-finish.component.scss']
})
export class CheckoutFinishComponent implements OnInit {

  constructor(
      public checkoutService: CheckoutService,
      private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(this.onCheckoutFinish.bind(this), 15000)
  }
  onCheckoutFinish() {
    this.router.navigate(['pay-mock/start-payment']).then(
        ()=> {
          //todo: set navigate result here
        }
    )
  }

}