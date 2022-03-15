import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Tenor} from "../tenor";
import {TenorService} from "../tenor.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  tenors : Tenor[] = [
    {
      tenorId: '1',
      itemPrice: 5000000,
      convertFee: 1000000,
      paymentSchedule: 120
    },
    {
      tenorId: '2',
      itemPrice: 5000000,
      convertFee: 800000,
      paymentSchedule: 240
    },
    {
      tenorId: '3',
      itemPrice: 5000000,
      convertFee: 500000,
      paymentSchedule: 120
    }
  ]
  chosenTenor: Tenor | null
  constructor(
      private router: Router,
      private tenorService: TenorService,
      private authService: AuthService
  ) {
    this.chosenTenor = null
  }

  ngOnInit(): void {
  }
  onChoseTenor(tenorId: string) {
    this.chosenTenor = this.tenors.filter(tenor => tenor.tenorId === tenorId)[0]
  }

  onCheckOutContinue () {
    //todo : api call for check customer enough credit for checkout
    this.tenorService.selectedTenor$.next(this.chosenTenor)
    this.router.navigate(['/pay-mock/checkout-confirm']).then(() =>{
      this.authService.user$.next({...this.authService.user$.getValue(), pin: ''})
    })
  }

}
