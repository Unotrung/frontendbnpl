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
      image: ''
    }
  ]


  constructor() { }
}
