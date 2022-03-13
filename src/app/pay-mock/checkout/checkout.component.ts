import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCheckOutContinue () {
    this.router.navigate(['/pay-mock/checkout-detail-bill'])
  }

}
