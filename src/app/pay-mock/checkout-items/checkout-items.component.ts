import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Item} from "../item";
import {shouldBeautify} from "@angular-devkit/build-angular/src/utils/environment-options";

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styleUrls: ['./checkout-items.component.scss']
})
export class CheckoutItemsComponent implements OnInit {
  @Input() discount = false
  @Input() items: Item[] = []
  currencyCode = environment.currencyCode
  sumPriceItem = 0
  sumShipFee = 0
  sum = 0
  constructor() {

  }

  ngOnInit(): void {
    this.items.forEach(item => {
      console.log(item)
      this.sumPriceItem += item.price
      this.sumShipFee += item.shipFee
    })
    this.sum = this.sumPriceItem + this.sumShipFee
  }

}
