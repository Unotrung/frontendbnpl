import { Component, OnInit } from '@angular/core';
import {ItemService} from "../item.service";

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styleUrls: ['./checkout-items.component.scss']
})
export class CheckoutItemsComponent implements OnInit {

  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
  }

}
