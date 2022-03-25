import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from "../item.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styleUrls: ['./checkout-items.component.scss']
})
export class CheckoutItemsComponent implements OnInit {
  @Input() discount = false
  currencyCode = environment.currencyCode
  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
  }

}
