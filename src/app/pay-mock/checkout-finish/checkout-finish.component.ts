import { Component, OnInit } from '@angular/core';
import {CheckoutService} from "../checkout.service";
import {Router} from "@angular/router";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-checkout-finish',
  templateUrl: './checkout-finish.component.html',
  styleUrls: ['./checkout-finish.component.scss']
})
export class CheckoutFinishComponent implements OnInit {

  timeOut: any
  constructor(
      public checkoutService: CheckoutService,
      private router: Router,
      public itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.timeOut = setTimeout(this.onCheckoutFinish.bind(this), 5000)
  }
  onCheckoutFinish() {
    this.router.navigate(['pay-mock/start-payment']).then(
        ()=> {
          clearTimeout(this.timeOut)
          //todo: set navigate result here
        }
    )
  }

}
