import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../item";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss']
})
export class CheckoutItemComponent implements OnInit {
  @Input() item!: Item
  currencyCode = environment.currencyCode
  constructor() { }

  ngOnInit(): void {
  }

}
