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
  enoughCredit = false

  constructor(
      private router: Router,
      private tenorService: TenorService,
      private authService: AuthBnplService,
      public itemService: ItemService
  ) {
    this.chosenTenor = this.tenorService.selectedTenor$.getValue()
    const { creditLimit } = this.authService.user$.getValue()
    this.tenors = this.tenorService.tenors$.getValue().map(tenor => {
      const tenorPrice = this.getTenorPrice(tenor)
      const enable = creditLimit >= tenorPrice
      if (enable) {
        this.enoughCredit = true
      }
      return {...tenor, enable}
    })
  }

  ngOnInit(): void {
    if (!this.enoughCredit){
      this.router.navigate(['pay-mock/checkout-not-enough-credit']).then()
    }
  }
  onChoseTenor(tenorId: string) {
    this.chosenTenor = this.tenors.filter(tenor => tenor.tenorId === tenorId)[0]
  }

  onCheckOutContinue () {
    //todo : api call for check customer enough credit for checkout
    if (!this.chosenTenor) return;
    this.tenorService.updateSelectedTenor(this.chosenTenor)
    this.router.navigate(['/pay-mock/checkout-confirm']).then(() =>{
      this.authService.user$.next({...this.authService.user$.getValue(), pin: ''})
    })
  }

  getTenorPrice(tenor: Tenor) {
    const { creditLimit } = this.authService.user$.getValue()
    const tenorPrice = this.itemService.sumPriceItem*(1 + tenor.convertFee/100) + this.itemService.sumShipFee
    // console.log('tenor', creditLimit >= tenorPrice ? true : false)
    return tenorPrice
  }

}
