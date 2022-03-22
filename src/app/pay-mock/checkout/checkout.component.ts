import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Tenor} from "../tenor";
import {TenorService} from "../tenor.service";
import {AuthBnplService} from "../auth-bnpl.service";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  tenors : Tenor[]
  chosenTenor: Tenor | null
  constructor(
      private router: Router,
      private tenorService: TenorService,
      private authService: AuthBnplService,
      private itemService: ItemService
  ) {
    this.chosenTenor = null
    this.tenors = this.tenorService.tenors$.getValue()
  }

  ngOnInit(): void {
    if (this.itemService.total > this.authService.user$.getValue().creditLimit) {
      this.router.navigate(['pay-mock/checkout-not-enough-credit']).then()
    }
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
