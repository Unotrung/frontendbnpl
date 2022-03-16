import { Injectable } from '@angular/core';
import {Item} from "./item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [
    {
      id: '1',
      name: 'Begin Yoga Mat 5MM',
      description: 'Steel Grey/One Size',
      price: 5000000,
      image: 'assets/images/begin-yoga-mat-5mm.png',
      shipFee: 30000
    }
  ]


  constructor() { }

  get sumPriceItem(): number {
    let sum = 0
    this.items.forEach(item => {
      sum+= item.price
    })
    return sum
  }

  get sumShipFee(): number {
    let sum = 0
    this.items.forEach(item => {
      sum += item.shipFee
    })
    return sum
  }

  get total(): number {
    return this.sumPriceItem + this.sumShipFee
  }

}
