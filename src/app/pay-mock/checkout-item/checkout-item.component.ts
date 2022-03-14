import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../item";

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss']
})
export class CheckoutItemComponent implements OnInit {
  @Input() item!: Item
  constructor() { }

  ngOnInit(): void {
  }

}
