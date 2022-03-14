import { Component, OnInit } from '@angular/core';
import {TenorService} from "../tenor.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.scss']
})
export class CheckoutConfirmComponent implements OnInit {

  constructor(
      public tenorService: TenorService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCheckoutConfirm(){
    //todo: api call here for check

    this.router.navigate(['pay-mock/checkout-success']).then()
  }

}
