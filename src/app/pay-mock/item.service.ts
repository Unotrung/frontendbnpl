import { Injectable } from '@angular/core';
import {Item} from "./item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // items: Item[] = [
  //   {
  //     id: '1',
  //     name: 'Begin Yoga Mat 5MM',
  //     description: 'Steel Grey/One Size',
  //     price: 5000000,
  //     image: 'assets/images/begin-yoga-mat-5mm.png',
  //     shipFee: 30000
  //   }
  // ]
  fakeItem: Array<Item> = [{
    id: '1',
    name: 'Begin Yoga Mat 5MM',
    description: 'Steel Grey/One Size',
    price: 5000000,
    image: 'assets/images/begin-yoga-mat-5mm.png',
    shipFee: 30000
  }]

  items$ : BehaviorSubject<Array<Item>>
  sumPriceItem = 0
  sumShipFee = 0

  constructor() {
    this.items$ = new BehaviorSubject<Item[]>([{
      id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      shipFee: 0
    }])
    this.items$.subscribe(items => {
      items.forEach(item => {
        this.sumPriceItem += item.price
        this.sumShipFee += item.shipFee
      })
    })
  }

  // get sumPriceItem(): number {
  //   let sum = 0
  //   // if (this.items$.getValue() !== null){
  //   //   this.items$.getValue()!.forEach(item => {
  //   //     sum+= +item.price
  //   //   })
  //   // }
  //   console.log('totalItemPrice', sum)
  //   return sum
  // }
  //
  // get sumShipFee(): number {
  //   let sum = 0
  //   // if (this.items$.getValue() !== null) {
  //   // this.items$.getValue()!.forEach(item => {
  //   //   sum += +item.shipFee
  //   // })}
  //   console.log('totalShipFee', sum)
  //   return sum
  // }

  // get total(): number {
  //   return this.sumPriceItem + this.sumShipFee
  // }

  updateItemList(items: Item[]) {
    console.log('items',items)
    this.items$.next(items)
  }

}
