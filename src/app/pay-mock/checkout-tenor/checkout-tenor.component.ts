import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tenor} from "../tenor";
import {environment} from "../../../environments/environment";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-checkout-tenor',
  templateUrl: './checkout-tenor.component.html',
  styleUrls: ['./checkout-tenor.component.scss']
})
export class CheckoutTenorComponent implements OnInit {

  @Input() tenor!: Tenor
  @Input() checked!: boolean
  @Input() index!: number
  @Output() chosenTenor = new EventEmitter<string>()
  currencyCode = environment.currencyCode
  priceTenor: number = 0
  convertFee: number = 0

  constructor(
      public itemService: ItemService
  ) {

  }

  ngOnInit(): void {
    console.log(this.tenor)
    this.convertFee = this.itemService.sumPriceItem*this.tenor.convertFee/100
    this.priceTenor = this.convertFee + this.itemService.sumPriceItem + this.itemService.sumShipFee;
  }
  onTenorClick() {

    if (!this.tenor.enable) return

    this.checked = true;
    this.chosenTenor.emit(this.tenor.tenorId)
  }
  // get priceTenor():number {
  //   return this.itemService.sumPriceItem*(+this.tenor.convertFee)
  // }

}
